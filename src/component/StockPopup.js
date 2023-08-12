import React, { useState, useEffect, useRef, useContext } from "react";
import { StockContext } from "../context/StockContext";
import { WarehouseContext } from "../context/WarehouseContext";
import { Button } from "primereact/button";
import Select from "react-select";
import { UserContext } from "../context/UserContext";

const StockPopup = ({
  data,
  setOpen,
  open,
  setAlert,
  setAlertMsg,
  setAlertColor,
}) => {
  const { stock, setStock } = useContext(StockContext);
  const { warehouse } = useContext(WarehouseContext);
  const [idwarehouse, setIdWarehouse] = useState(data.idwarehouse);
  const [warehouseName, setWarehouseName] = useState(data.warehouse_name);
  const [qty, setQty] = useState(data.qty);
  const popup = useRef();
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

  const options_warehouse = warehouse
    ? warehouse.map((c) => ({
        value: c.idwarehouse,
        label: c.warehouse_name,
      }))
    : "";

  const handleDelete = () => {
    const response = fetch(`http://localhost:4000/api/stock/${data.idstock}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        if (res.protocol41) {
          setAlertColor("success");
          setAlertMsg("Stock data successfully deleted !");
          setAlert(true);
          const newStock = stock.filter(
            (item) => item.idstock !== data.idstock
          );
          setStock(newStock);
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
      `http://localhost:4000/api/stock/${data.idstock}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idwarehouse: idwarehouse,
          idproductUnitConversion: data.idproductUnitConversion,
          qty: parseInt(qty),
          modified_by: username,
        }),
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
          setAlertMsg("Stock data successfully updated !");
          setAlert(true);
          const newStock = stock.map((u) => {
            if (u.idstock === data.idstock) {
              return {
                idstock: data.idstock,
                idwarehouse: idwarehouse,
                warehouse_name: warehouseName,
                idproductUnitConversion: data.idproductUnitConversion,
                iduom: data.iduom,
                uom: data.uom,
                idproduct: data.idproduct,
                code: data.code,
                product: data.product,
                qty: qty,
                created_at: data.created_at,
                created_by: data.created_by,
                modified_by: username,
                modified_at: sqlDatetime,
                document_number: data.document_number,
              };
            }
            return u;
          });
          setStock(newStock);
          setOpen(!open);
          setTimeout(() => {
            setAlert(false);
          }, 3000);
        } else {
          setAlertColor("failure");
          setAlertMsg(res);
        }
      });
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
        <h1 className="text-center text-lg font-bold mb-9">Stock Detail</h1>
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            ID Stock
          </label>
          <input
            type="text"
            id="name"
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={data.idstock}
            disabled
          />
        </div>
        <div>
          <label
            for="warehouse"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Warehouse
          </label>
          <Select
            id="warehouse"
            options={options_warehouse}
            classNamePrefix="select2-selection"
            onChange={(e) => {
              setWarehouseName(e.label);
              setIdWarehouse(e.value);
            }}
            required
            defaultValue={options_warehouse.find(
              (option) => option.value == data.idwarehouse
            )}
            className="focus:ring-black focus:border-black"
          ></Select>
        </div>
        <div>
          <label
            for="product"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product
          </label>
          <input
            type="text"
            id="product"
            disabled
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={data.product}
          />
        </div>
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
            disabled
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={data.code}
          />
        </div>
        <div>
          <label
            for="uom"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            UOM
          </label>
          <input
            type="text"
            id="uom"
            disabled
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={data.uom}
          />
        </div>
        <div>
          <label
            for="qty"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Qty
          </label>
          <input
            type="text"
            id="qty"
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={qty}
            onChange={(e) => {
              setQty(e.target.value);
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
            disabled={!qty && true}
            onClick={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default StockPopup;
