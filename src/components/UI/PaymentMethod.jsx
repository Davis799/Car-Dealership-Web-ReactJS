import React from "react";

import masterCard from "../../assets/all-images/master-card.jpg";
import paypal from "../../assets/all-images/paypal.jpg";
import "../../styles/payment-method.css";

const PaymentMethod = () => {
  return (
    <div className=" items-start text-center font-sans ">
      {/* <div className=" text-xl m-2 ">
        Check us on Whatsapp <br/>
      </div> */}
      {/* <div className=" text-xl m-2 ">
        <i class="ri-whatsapp-line text-green-600 text-2xl" ></i>
        {" "}+255 689 558 338 
      </div> */}
      <div className="payment text-center m-4">
        <button className=" text-l">Buy Now</button>
      </div>
    </div>
  );
};

export default PaymentMethod;
