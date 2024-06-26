import { useCallback, useEffect, useRef, useState } from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";

import { Images } from "@/constant";
import axios from "axios";
import { useRouter } from "next/router";

interface CardData {
  cartProduct: any;
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
  const isOrderCreated = useRef(false);

  const handlePaymentSuccess = async (orderId: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}payment/update?id=${orderId}`,
        { status: "success" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Payment update response:", response.data);

      router.replace({
        pathname: "/successful-Payment",
        query: {
          orderId,
          toDiAfPr,
        },
      });
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
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
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const cartProduct = cardDetails.map((item) => {
    return {
      productId: item.cartProduct.productId,
      subProductId: item.cartProduct.subProductId,
      quantity: item.cartProduct.quantity,
      totalPrice: toDiAfPr / cardDetails.length,

      power: 200,
    };
  });

  const createOrder = async (userId: any) => {
    const token = localStorage.getItem("accessToken");
    if (isOrderCreated.current) return;
    isOrderCreated.current = true;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}payment/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
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
        amount: (toDiAfPr * 100).toString(),
        currency: "INR",
        name: "Iksana Opticals",
        description: "Test Transaction",
        image: Images.Iksana_Eye_Logo,
        order_id: orderId,
        handler: function (response) {
          handlePaymentSuccess(orderId);
        },
        prefill: {
          name: "Iksana Opticals",
          email: "support@iksanaopticals.in",
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

      let data1 = "";

      let config1 = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}payment/emptyUserCart?userId=${userId}`,
        headers: {},
        data: data1,
      };

      axios
        .request(config1)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      rzpay.on("payment.success", function (response: any) {
        alert(response.success.code);
        alert(response.success.description);
        alert(response.success.source);
        alert(response.success.step);
        alert(response.success.reason);
        alert(response.success.metadata.order_id);
        alert(response.success.metadata.payment_id);
      });
      rzpay.on("payment.failed", function (response: any) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzpay.open();
      console.log("www", rzpay);
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
