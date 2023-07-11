import React, { useState, useEffect, useRef, useContext } from "react";
import { AdjustmentContext } from "../context/AdjustmentContext";
import { StockContext } from "../context/StockContext";
import { Button } from "primereact/button";
import Select from "react-select";

const AdjustmentPopup = ({ data, setOpen, open, setSelected }) => {
  const { adjustment, setAdjustment } = useContext(AdjustmentContext);
  const { stock, setStock } = useContext(StockContext);
  const [qtyAdj, setQtyAdj] = useState(data.qtyAdj);

  const popup = useRef();

  const handleDelete = () => {
    const response = fetch(
      `http://localhost:4000/api/adjustment/${data.idadjustment}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      return res.json();
    });

    const newAdj = adjustment.filter(
      (item) => item.idadjustment !== data.idadjustment
    );
    setAdjustment(newAdj);
    const newStock = stock.map((s) => {
      if (s.idstock == data.idstock) {
        return {
          idstock: data.idstock,
          idwarehouse: data.idwarehouse,
          warehouse_name: data.warehouse_name,
          idproductUnitConversion: data.idproductUnitConversion,
          iduom: data.iduom,
          uom: data.uom,
          idproduct: data.idproduct,
          code: data.code,
          product: data.product,
          qty: data.qtyInStock,
        };
      }
      return s;
    });
    setStock(newStock);
    setOpen(!open);
  };
  const handleUpdate = async () => {
    const response = await fetch(
      `http://localhost:4000/api/adjustment/${data.idadjustment}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idstock: data.idstock,
          qtyAdj: parseInt(qtyAdj),
        }),
      }
    );

    if (response.ok) {
      const res = await response.json();
      const newAdj = adjustment.map((u) => {
        if (u.idadjustment === data.idadjustment) {
          return {
            idadjustment: data.idadjustment,
            idstock: data.idstock,
            qtyAdj,
            qtyStock: res.qty,
            qtyInStock: data.qtyInStock,
            warehouse_name: data.warehouse_name,
            code: data.code,
            product: data.product,
            uom: data.uom,
          };
        }
        return u;
      });
      setAdjustment(newAdj);
      setSelected("");
      setOpen(!open);
      const newStock = stock.map((s) => {
        if (s.idstock == data.idstock) {
          return {
            idstock: data.idstock,
            idwarehouse: data.idwarehouse,
            warehouse_name: data.warehouse_name,
            idproductUnitConversion: data.idproductUnitConversion,
            iduom: data.iduom,
            uom: data.uom,
            idproduct: data.idproduct,
            code: data.code,
            product: data.product,
            qty: res.qty,
          };
        }
        return s;
      });
      setStock(newStock);
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
        <h1 className="text-center text-lg font-bold mb-9">Stock Detail</h1>
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            ID Adjustment
          </label>
          <input
            type="text"
            id="name"
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={data.idadjustment}
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
          <input
            type="text"
            id="name"
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={data.warehouse_name}
            disabled
          />
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
            Qty Adjustment
          </label>
          <input
            type="number"
            id="qty"
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={qtyAdj}
            onChange={(e) => {
              setQtyAdj(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            for="qty"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Qty Stock
          </label>
          <input
            type="text"
            id="qty"
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={data.qtyStock}
            disabled
          />
        </div>
        <div>
          <label
            for="qty"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Qty In Stock
          </label>
          <input
            type="text"
            id="qty"
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={data.qtyInStock}
            disabled
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
            disabled={!qtyAdj && true}
            onClick={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default AdjustmentPopup;
