import React, { useContext, useState, useEffect } from "react";
import { TitleContext } from "../context/TitleContext";
import { CurrencyContext } from "../context/currencyContext";
import { Alert } from "flowbite-react";
import Select from "react-select";

const Company = () => {
  const { currency } = useContext(CurrencyContext);
  const { setTitle } = useContext(TitleContext);
  const [resetSelect, setResetSelect] = useState();
  const [currencyCode, setCurrencyCode] = useState();
  const [currencyName, setCurrencyName] = useState();
  const [country, setCountry] = useState();
  const [companyName, setCompanyName] = useState();
  const [companyAddress, setCompanyAddress] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [alert, setAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const options = currency
    ? currency.map((c) => ({
        value: c.currency_name,
        label: c.currency_code,
      }))
    : "";
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
    }),
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newCompany = {
      company_name: companyName,
      company_address: companyAddress,
      phone_no: phoneNo,
      country: country,
      currency_code: currencyCode,
    };
    const response = fetch("http://localhost:4000/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newCompany,
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
          // setCurrency([...currency, newCurrency]);
        } else {
          setAlertColor("failure");
          setAlertMsg(result);
        }
        setCountry("");
        setPhoneNo("");
        setCompanyName("");
        setCompanyAddress("");
        setCurrencyCode("");
        setCurrencyName("");
        setResetSelect("");
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setTitle("Master Data");
  }, []);
  return (
    <div className="px-4 md:h-[650px] md:overflow-y-scroll">
      <div className="py-4 text-center text-[#2C4856] font-extrabold text-2xl">
        Company
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
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Company Name
            </label>
            <input
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: Indofood"
              required
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="address"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Company Address
            </label>
            <textarea
              type="text"
              id="address"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: Jl Petojo Melintang No 6"
              required
              value={companyAddress}
              onChange={(e) => {
                setCompanyAddress(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="phone"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone No
            </label>
            <input
              type="text"
              id="phone"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: 02184997151"
              required
              value={phoneNo}
              onChange={(e) => {
                setPhoneNo(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="currency-code"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Currency Code
            </label>
            <Select
              options={options}
              styles={style}
              value={resetSelect}
              classNamePrefix="select2-selection"
              onChange={(e) => {
                setCurrencyCode(e.label);
                setCurrencyName(e.value);
              }}
              className="focus:ring-black focus:border-black"
            ></Select>
          </div>
          <div>
            <label
              for="country"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: Australia"
              required
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
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
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              disabled
              value={currencyName}
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-white block ml-auto   bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Company;
