import React, { useState, useContext } from "react";
import { Alert } from "flowbite-react";
import { CurrencyContext } from "../context/currencyContext";
const Currency = () => {
  const { currency, setCurrency } = useContext(CurrencyContext);
  const [currencyCode, setCurrencyCode] = useState("");
  const [currencyName, setCurrencyName] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const newCurrency = {
      currency_code: currencyCode,
      currency_name: currencyName,
    };
    const response = fetch("http://localhost:4000/api/currency", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newCurrency,
      }),
    });
    response
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setAlert(true);
        if (result.protocol41) {
          setAlertColor("success");
          setAlertMsg("Company data successfully submitted !");
          setCurrency([...currency, newCurrency]);
        } else {
          setAlertColor("failure");
          setAlertMsg(result);
        }

        setCurrencyCode("");
        setCurrencyName("");
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="px-4 md:h-[650px] md:overflow-y-scroll">
        <div className="py-4 text-center text-[#2C4856] font-extrabold text-2xl">
          Currency
        </div>
        {alert ? (
          <Alert color={`${alertColor}`} className="mb-3">
            <span>
              <p>{alertMsg} !</p>
            </span>
          </Alert>
        ) : (
          ""
        )}

        <form onSubmit={handleSubmit}>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="currency-code"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Currency Code
              </label>
              <input
                type="text"
                id="currency-code"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ex: RP"
                required
                value={currencyCode}
                onChange={(e) => setCurrencyCode(e.target.value)}
              />
            </div>
            <div>
              <label
                for="currency-name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Currency Name
              </label>
              <input
                type="text"
                id="currency-name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                placeholder="Ex: Rupiah"
                required
                value={currencyName}
                onChange={(e) => setCurrencyName(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-white  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Currency;
