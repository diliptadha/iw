import React from "react";
import Loader from "./Loader";

interface OrderCancelPopupProps {
  onClickCancel: () => void;
  loading: boolean;
  onCloseModal: () => void;
}

const OrderCancelPopup: React.FC<OrderCancelPopupProps> = ({
  loading,
  onClickCancel,
  onCloseModal,
}) => {
  return (
    <div className="fixed left-0 top-0 z-index flex h-full w-full items-start  justify-center  bg-gray-500 bg-opacity-[20%] backdrop-blur-sm ">
      <div className=" mt-10 items-center- justify-center- flex- rounded-md bg-white p-5 xs:h-[270px]- xs:w-[310px] md:h-[270px]- md:w-[460px] ">
        <div>
          <div className="flex justify-center">
            <h1 className="text-base font-medium text-black text-center">
              Are you sure!
            </h1>
          </div>
          <p className="my-4"></p>
          <h1 className="text-base font-normal text-black text-center">
            Do you want to cancel this order?
          </h1>
          <p className="border border-gray-300 my-2"></p>

          <div className="flex justify-between gap-x-10">
            <button
              onClick={onCloseModal}
              disabled={loading}
              className="mt-5 flex items-center justify-center w-full rounded-md bg-black h-8 text-white text-base font-normal"
            >
              Back
            </button>
            <button
              onClick={onClickCancel}
              disabled={loading}
              className="mt-5 flex items-center justify-center w-full rounded-md bg-transparent text-black border border-red-600 hover:bg-red-600 h-8 hover:text-white text-base font-normal"
            >
              {loading ? <Loader /> : "Cancel Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCancelPopup;
