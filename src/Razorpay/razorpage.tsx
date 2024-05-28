import { useCallback, useEffect, useState } from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";

import { Images } from "@/constant";
import axios from "axios";
import { useRouter } from "next/router";

interface CardData {
  id: any;
  title: any;
  productId: any;
  originalPrice: number;
  salePrice: number;
  productImage: any;
  quantity: number;
  subProductId: any;
}

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
  const [userId, setUserId] = useState<string | null>();
  const [cardDetails, setCardDetails] = useState<CardData[]>([]);

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

  const gettingData = async (userId: any) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}product/getCartData?userId=${userId}`
      );
      const cartData = response?.data?.cartData;
      setCardDetails(cartData);
      console.log("cartDetails", cartData);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const cartProduct = cardDetails.map((item) => ({
    productId: item.productId,
    subProductId: item.subProductId,
    quantity: item.quantity,
    totalPrice: item.salePrice, // Assuming salePrice is the total price for simplicity
    power: 200, // This seems to be a static value in your example
  }));

  const createOrder = async (userId: any) => {
    try {
      console.log("prod", cartProduct);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}payment/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer dsLCHSAfKF6s371z8QJFKSGj",
          },
          body: JSON.stringify({
            userId: userId,
            status: "pending",
            products: cartProduct,
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
        image: Images.Iksana_Eye_Logo,
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

  const startPaymentProcess = async () => {
    resetPaymentModal(); // Reset the isPaymentModalOpened state
    await gettingData(userId);
    await createOrder(userId); // Create a new order
    handlePayment(); // Trigger the payment process
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    if (userId) {
      gettingData(userId);
    }
  }, []);

  useEffect(() => {
    if (cardDetails.length > 0 && userId) {
      createOrder(userId);
    }
  }, [cardDetails]);

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
