import { Images } from "@/constant";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";

export default function RazorPage({
  onCancel,
  toDiAfPr,
}: {
  onCancel: () => void;
  toDiAfPr: number;
}) {
  const router = useRouter();
  const [Razorpay, isLoaded] = useRazorpay();
  const RAZORPAY_KEY = "rzp_test_WG0saZcap7ShMM";
  const [orderId, setOrderId] = useState("");
  const [isPaymentModalOpened, setIsPaymentModalOpened] = useState(false);

  const handlePaymentSuccess = (orderId: string) => {
    router.replace({
      pathname: "/successful-Payment",
      query: {
        orderId,
        toDiAfPr,
      },
    });
  };

  const resetPaymentModal = () => {
    setIsPaymentModalOpened(false);
  };

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
            userId: "IK0000002",
            productId: "P0000001",
            quantity: 1,
            totalPrice: toDiAfPr,
            status: "pending",
            power: 200,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const ordersData = await response.json();
      const fetchedOrderId = ordersData?.order?.orderId;
      setOrderId(fetchedOrderId);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handlePayment = useCallback(async () => {
    if (!orderId || isPaymentModalOpened) {
      return;
    }

    setIsPaymentModalOpened(true);

    try {
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY,
        amount: "50000",
        currency: "INR",
        name: "Iksana Opticals",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
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
            onCancel();
          },
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    } catch (error) {
      console.log("err", error);
    }
  }, [orderId, isPaymentModalOpened, Razorpay]);

  const startPaymentProcess = () => {
    resetPaymentModal(); // Reset the isPaymentModalOpened state
    createOrder(); // Create a new order
    handlePayment(); // Trigger the payment process
  };

  useEffect(() => {
    createOrder();
  }, []);

  useEffect(() => {
    handlePayment();
  }, [isLoaded, orderId]);

  return (
    <>
      <button onClick={onCancel}></button>
      <button onClick={startPaymentProcess}></button>
    </>
  );
}
