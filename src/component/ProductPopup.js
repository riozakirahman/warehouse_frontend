import React, { useState, useEffect, useRef, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Button } from "primereact/button";
import { UserContext } from "../context/UserContext";

const ProductPopup = ({ data, setOpen, open, setSelected }) => {
  const { product, setProduct } = useContext(ProductContext);
  const [code, setCode] = useState(data.code);
  const [Name, setName] = useState(data.name);
  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;
  const current_date = new Date();
  const year = current_date.getFullYear();
  const month = (current_date.getMonth() + 1).toString().padStart(2, "0");
  const day = current_date.getDate().toString().padStart(2, "0");
  const hours = current_date.getHours().toString().padStart(2, "0");
  const minutes = current_date.getMinutes().toString().padStart(2, "0");
  const seconds = current_date.getSeconds().toString().padStart(2, "0");
  const sqlDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const popup = useRef();

  const payload = {
    code,
    name: Name,
    modified_by: username,
  };

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:4000/api/product/${data.idproduct}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const newProduct = product.filter((p) => p.idproduct !== data.idproduct);
      setProduct(newProduct);
      setOpen(!open);
    }
  };
  const handleUpdate = async () => {
    const response = await fetch(
      `http://localhost:4000/api/product/${data.idproduct}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
        }),
      }
    );

    if (response.ok) {
      const newProduct = product.map((u) => {
        if (u.idproduct === data.idproduct) {
          return {
            idproduct: data.idproduct,
            document_number: data.document_number,
            code,
            name: Name,
            modified_at: sqlDatetime,
            modified_by: username,
            created_at: data.created_at,
            created_by: data.created_by,
            document_number: data.document_number,
          }; // update matching customer object
        }
        return u; // keep other customer objects unchanged
      });
      setProduct(newProduct);
      console.log(newProduct);
      setOpen(!open);
      setSelected("");
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
        <h1 className="text-center text-lg font-bold mb-9">Product Detail</h1>
        <div>
          <label
            for="code"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Code
          </label>
          <input
            type="text"
            id="code"
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={Name}
            onChange={(e) => {
              setName(e.target.value);
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
            disabled={!payload && true}
            onClick={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
