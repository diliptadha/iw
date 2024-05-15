import axios from "axios";

const getCartQuantity = async (userId: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}product/getCartData?userId=${userId}`
    );
    const cartQuantity = response.data.cartData;
    const tQty = cartQuantity.reduce(
      (total: any, ele: { quantity: any }) => total + ele.quantity,
      0
    );
    return tQty;
  } catch (error) {
    console.log(error);
  }
};

export default getCartQuantity;
