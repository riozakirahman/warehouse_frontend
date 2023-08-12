import React, { useState, useContext, useEffect } from "react";
import { WarehouseContext } from "../context/WarehouseContext.js";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { RiAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { TitleContext } from "../context/TitleContext.js";
import WarehousePopup from "./WarehousePopup.js";

const WarehouseView = () => {
  useEffect(() => {
    setTitle("Warehouse");
  });
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const { setTitle } = useContext(TitleContext);
  const { warehouse } = useContext(WarehouseContext);
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  return (
    <div className="px-4 py-4">
      {open && (
        <WarehousePopup
          data={selected}
          setSelected={setSelected}
          setOpen={setOpen}
          open={open}
        />
      )}
      <div className="flex justify-between ">
        <InputText
          onInput={(e) => {
            setFilter({
              ...filter,
              global: {
                value: e.target.value,
                matchMode: FilterMatchMode.CONTAINS,
              },
            });
          }}
          placeholder="Search.."
        />
        <Link to="/home/addwarehouse">
          <button
            type="button"
            className="text-[#2C4856] bg-[#ffff] hover:bg-[#d7d6d6] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <RiAddFill className="h-6 w-6" />
          </button>
        </Link>
      </div>

      <DataTable
        value={warehouse}
        filters={filter}
        className="mt-5"
        sortMode="multiple"
        paginator
        rows={5}
        totalRecords={warehouse.length}
        removableSort
        selectionMode="single"
        dataKey="idwarehouse"
        selection={selected}
        onSelectionChange={(e) => {
          setSelected(e.value);
        }}
        onDoubleClick={() => setOpen(!open)}
        style={{ maxWidth: 1000 }}
      >
        <Column
          field="document_number"
          header="Warehouse Number"
          sortable
        ></Column>
        <Column field="warehouse_name" header="Warehouse" sortable></Column>
        <Column field="address" header="Address" sortable></Column>
        <Column
          field="contact_person"
          header="Contact Person"
          sortable
        ></Column>
        <Column
          field="contact_number"
          header="Contact Number"
          sortable
        ></Column>
        <Column field="status" header="Status" sortable></Column>
        <Column field="created_at" header="Created At" sortable></Column>
        <Column field="created_by" header="Created By" sortable></Column>
        <Column field="modified_at" header="Modified At" sortable></Column>
        <Column field="modified_by" header="Modified By" sortable></Column>
      </DataTable>
    </div>
  );
};

export default WarehouseView;
