import React, { useState, useEffect, useRef, useContext } from "react";
import { Button } from "primereact/button";
import { UserContext } from "../context/UserContext";
import { CountryContext } from "../context/CountryContext";
const CountryPopup = ({
  data,
  setOpen,
  open,
  setSelected,
  setAlert,
  setAlertMsg,
  setAlertColor,
}) => {
  const { country, setCountry } = useContext(CountryContext);
  const [countryName, setCountryName] = useState(data.countryName);
  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;
  const popup = useRef();

  const handleDelete = () => {
    const response = fetch(
      `http://localhost:4000/api/country/${data.idcountry}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        if (res.protocol41) {
          setAlertColor("success");
          setAlertMsg("Country data successfully deleted !");
          setAlert(true);
          const newCountry = country.filter(
            (item) => item.idcountry !== data.idcountry
          );
          setCountry(newCountry);
          setOpen(!open);
          setTimeout(() => {
            setAlert(false);
          }, 3000);
        } else {
          setAlert(true);
          setAlertColor("failure");
          setAlertMsg(res);
          setOpen(!open);
          setTimeout(() => {
            setAlert(false);
          }, 3000);
        }
      });
  };
  const handleUpdate = async () => {
    const response = await fetch(
      `http://localhost:4000/api/country/${data.idcountry}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          countryName,
          modified_by: username,
        }),
      }
    );

    const res = await response.json();
    if (response.ok) {
      const newCountry = country.map((u) => {
        if (u.idcountry === data.idcountry) {
          return {
            idcountry: data.idcountry,
            document_number: data.document_number,
            countryName,
            created_at: data.created_at,
            created_by: data.created_by,
            modified_at: data.modified_at,
            modified_by: username,
          };
        }
        return u;
      });
      setCountry(newCountry);
      setSelected("");
      setOpen(!open);
      setAlertColor("success");
      setAlertMsg("Country data successfully updated !");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      setOpen(!open);
      setAlert(true);
      setAlertColor("failure");
      setAlertMsg(res);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };
  useEffect(() => {
    const handleClick = (e) => {
      if (popup.current) {
        setOpen(!open);
      }
    };

    document.addEventListener("click", (e) => {
      handleClick(e);
    });

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [open]);

  const handleChildClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-20 flex items-center justify-center bg-gray-800 bg-opacity-75"
      ref={popup}
    >
      <div
        className="bg-white p-8 w-80  rounded-lg"
        onClick={(e) => handleChildClick(e)}
      >
        <h1 className="text-center text-lg font-bold mb-9">Country Detail</h1>
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Country Number
          </label>
          <input
            type="text"
            id="name"
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={data.document_number}
            disabled
          />
        </div>
        <div>
          <label
            for="warehouse"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Country
          </label>
          <input
            type="text"
            id="name"
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={countryName}
            onChange={(e) => {
              setCountryName(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-start gap-4 mt-3">
          <Button
            label="Delete"
            severity="danger"
            size="small"
            onClick={handleDelete}
          />
          <Button
            label="Update"
            severity="success"
            size="small"
            disabled={!countryName && true}
            onClick={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default CountryPopup;
