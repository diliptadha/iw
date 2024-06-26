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
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

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

      let data1 = "";
      let config1 = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}payment/emptyUserCart?userId=${userId}`,
        headers: {},
        data: data1,
      };
      await axios.request(config1);

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

  const handleCreateOrderId = async (cartProduct: any, status: string) => {
    try {
      const crateOrder = await axios.request({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}payment/create`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        data: {
          userId: userId,
          status,
          products: cartProduct,
        },
      });

      return crateOrder.data?.order?.orderId;
    } catch (error) {
      throw error;
    }
  };

  const handlePayment = useCallback(async () => {
    try {
      /** Get cart data*/
      const gtCardData = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}product/getCartData?userId=${userId}`
      );
      const cardDetails: CardData[] = gtCardData?.data?.cartData;

      const cartProduct = cardDetails.map((item) => {
        return {
          productId: item.cartProduct.productId,
          subProductId: item.cartProduct.subProductId,
          quantity: item.cartProduct.quantity,
          totalPrice: toDiAfPr / cardDetails?.length,
          power: 200,
        };
      });

      /**
       * Create order
       * @param {Array} cartProduct
       * @param {string} status
       * @returns {string} orderId
       */
      const orderId = await handleCreateOrderId(cartProduct, "pending");

      if (!orderId) {
        return;
      }

      /********
       * Razorpay options
       * @param {string} key
       * @returns {void}
       *****/
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
      rzpay.on("payment.failed", async function (response: any) {
        console.log("FAILED", response);
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}payment/update?id=${orderId}`,
          { status: "failed" },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
      });
      rzpay.open();
      console.log("www", rzpay);
    } catch (error) {
      console.log("err", error);
    }
  }, [toDiAfPr, Razorpay]);

  useEffect(() => {
    if (isLoaded) {
      handlePayment();
    }
  }, [isLoaded]);

  return (
    <>
      <button onClick={onCancel}></button>
      <button onClick={handlePayment}></button>
    </>
  );
}
