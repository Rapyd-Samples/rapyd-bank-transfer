"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PaymentContext } from "./PaymentContext";

const PaymentMethods = ({ productId }) => {
  const Router = useRouter();

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [country, setCountry] = useState("sg");
  const [currencies, setCurrencies] = useState(null);
  const [type, setType] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const { setPaymentId, setTextualCodes, setInstructions, setPayableAmount } =
    useContext(PaymentContext);

  useEffect(() => {
    setLoading(true);
    (async () => {
      if (country !== null || undefined) {
        const res = await fetch(`http://localhost:3333/country/${country}`);

        const data = await res.json();

        setData(data.body.data);
      }
    })();
    setLoading(false);
  }, [country]);

  const handleClick = async (currency, type) => {
    const res = await fetch(
      `http://localhost:3333/payment/${productId}/${currency}/${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName }),
      }
    );

    const data = await res.json();

    if (data.body.status.status === "SUCCESS") {
      setPaymentId(data.body.data.id);
      setTextualCodes(data.body.data.textual_codes);
      setInstructions(data.body.data.instructions);
      setPayableAmount(data.body.data.original_amount);

      Router.push(`/${productId}/instructions`);
    } else {
      Router.push("/Error");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Loading Payment Methods ...</p>;
  return (
    <>
      <h4 className="text-base tracking-tight mb-4 mt-6 text-slate-700">
        Available Payment Methods
      </h4>
      <form
        className="mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleClick(currencies[0], type);
        }}
      >
        <select
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm"
          onChange={(e) => {
            const selectedItem = data.find(
              (item) => item.type === e.target.value
            );
            setCurrencies(selectedItem.currencies);
            setType(selectedItem.type);
          }}
        >
          <option value="" disabled selected hidden>
            Please Choose...
          </option>

          {data
            .filter((item) => item.category === "bank_transfer")
            .map((filteredItem) => (
              <option key={filteredItem.type} value={filteredItem.type}>
                {filteredItem.name}
              </option>
            ))}
        </select>

        {currencies && type && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm mt-4"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        )}
        <button
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          disabled={currencies === null && type === null}
          type="submit"
        >
          Get Instructions
        </button>
      </form>
    </>
  );
};

export default PaymentMethods;
