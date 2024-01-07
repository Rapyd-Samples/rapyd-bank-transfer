"use client";

import { PaymentContext } from "../components/PaymentContext";
import { useContext, useEffect, useState } from "react";

const InstructionsComponent = () => {
  const {
    paymentId: payment_id,
    textualCodes: textual_codes,
    instructions,
    payableAmount,
  } = useContext(PaymentContext);

  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(null);

  const completePayment = async (payment_id) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3333/completePayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId: payment_id,
          code: textual_codes.code ? textual_codes.code : null,
          price: payableAmount,
        }),
      });

      const data = await res.json();

      if (data.body.data.status === "CLO") {
        setPaymentSuccess(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paymentSuccess) {
      setTimeout(() => {
        setPaymentSuccess(false);
      }, 3000);

      setTimeout(() => {
        window.location.href = "http://localhost:3000";
      }, 3000);
    }
  }, [paymentSuccess]);

  return (
    <div className="flex flex-wrap my-12 md:gap-x-3">
      <div className="md:w-8/12 w-full bg-gray-100 rounded-sm px-4 py-2">
        <h4 className="text-base tracking-tight mb-4 mt-6 text-slate-700">
          Thank you for your order!
        </h4>
        <p className="text-sm text-gray-700 mb-4">
          Please note that your payment is processed <strong>BUT</strong> it is{" "}
          <strong className="uppercase">not yet complete</strong>.
          <br />
          Please follow the instructions below to complete the payment.
        </p>
        <div>
          <h6 className="text-sm text-gray-700 mb-2 font-bold">Payment ID</h6>
          <div className="border-1 border-slate-300 border px-4 py-2 rounded-sm bg-white">
            {payment_id ? payment_id : "No payment id"}
          </div>
          <div className="text-md md:text-lg text-black font-semibold mt-8">
            <h6 className="text-sm text-gray-700 mb-2 font-bold">
              Textual Codes
            </h6>
            <div className="ml-2">
              {textual_codes && (
                <p className="mb-4 text-sm">
                  {Object.keys(textual_codes)}:{" "}
                  <span className="text-slate-600 text-sm">
                    {Object.values(textual_codes)}
                  </span>
                </p>
              )}
            </div>
            <h6 className="text-sm text-gray-700 mb-2 font-bold">
              Instructions
            </h6>
            {instructions && (
              <ul className="list-disc list-inside">
                {instructions[0].steps.map((step, index) => (
                  <li key={index} className="text-sm font-normal ml-2 block">
                    <span className="text-slate-600 text-sm uppercase font-bold">
                      {Object.keys(step)}
                    </span>
                    : {Object.values(step)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {paymentSuccess && (
          <div className="bg-green-500 mt-4 px-4 py-4 w-full text-bold text-white rounded-sm my-2">
            Payment Successful! Redirecting to home page...
          </div>
        )}

        {error && (
          <div className="bg-red-500 mt-4 px-4 py-4 w-full text-bold text-white rounded-sm my-2">
            Payment Successful!
          </div>
        )}
      </div>
      <div className="md:w-3/12 w-full bg-gray-100 rounded-sm px-4 py-2">
        <h4 className="text-base tracking-tight mb-4 mt-6 text-slate-700">
          Payable Amount
        </h4>
        <hr />
        <div className="text-lg text-black font-semibold bg-white px-4 py-2 rounded-md flex justify-between">
          <h6 className="text-sm text-gray-700 mb-2 font-bold">Amount</h6>
          <h6 className="text-sm text-gray-700 mb-2 font-bold">
            SGD {payableAmount ? payableAmount : 0}
          </h6>
        </div>
        <button
          disabled={!payment_id || loading}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm text-white transition duration-300 mt-6 w-full disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => completePayment(payment_id)}
        >
          Complete the Transaction
        </button>
      </div>
    </div>
  );
};

export default InstructionsComponent;
