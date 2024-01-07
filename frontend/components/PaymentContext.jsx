"use client";

import React, { createContext, useState } from "react";

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [paymentId, setPaymentId] = useState(null);
  const [textualCodes, setTextualCodes] = useState(null);
  const [instructions, setInstructions] = useState(null);
  const [payableAmount, setPayableAmount] = useState(null);

  return (
    <PaymentContext.Provider
      value={{
        paymentId,
        setPaymentId,
        textualCodes,
        setTextualCodes,
        instructions,
        setInstructions,
        payableAmount,
        setPayableAmount,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
