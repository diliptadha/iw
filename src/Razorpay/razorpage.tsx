import { Images } from "@/constant";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";

export default function RazorPage({ onCancel }: { onCancel: () => void }) {
  const router = useRouter();
  const { toDiAfPr } = router.query;
  const [Razorpay, isLoaded] = useRazorpay();
  const RAZORPAY_KEY = "rzp_test_WG0saZcap7ShMM";
  const [orderId, setOrderId] = useState("");

  const handlePaymentSuccess = (orderId: string ) => {
    router.push({
      pathname: "/successful-Payment",
      query: {
        orderId,
        toDiAfPr,
      },
    });
  };
  let amt: number | undefined;

  if (typeof toDiAfPr === "string") {
    amt = parseInt(toDiAfPr);
  } else if (Array.isArray(toDiAfPr) && toDiAfPr.length > 0) {
    amt = parseInt(toDiAfPr[0]);
  }

  const createOrder = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}payment/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer dsLCHSAfKF6s371z8QJFKSGj",
          },
          body: JSON.stringify({
            userId: "IK0000001",
            productId: "P0000001",
            quantity: 1,
            totalPrice: amt,
            status: "pending",
            power: 200,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const ordersData = await response.json();
      const fetchedOrderId = ordersData?.order?.orderId; // Assuming orderId is nested correctly
      setOrderId(fetchedOrderId);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handlePayment = useCallback(async () => {
    try {
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY,
        amount: "50000",
        currency: "INR",
        name: "Iksana Opticals",
        description: "Test Transaction",
        image:"https://example.com/your_logo",
        order_id: orderId,
        handler: function (response) {
          handlePaymentSuccess(orderId);
        },
        prefill: {
          name: "Piyush Garg",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            console.log("Checkout form closed");
            onCancel();
          },
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    } catch (error) {
      console.log("err", error);
    }
  }, [orderId, Razorpay]);

  useEffect(() => {
    if (orderId) {
      handlePayment();
    }
  }, [isLoaded, orderId, handlePayment]);

  useEffect(() => {
    createOrder();
  }, []);

  return (
    <>
      <button onClick={onCancel}></button>
    </>
  );
}

export const loadScript = (src: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};
