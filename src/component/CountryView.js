import React, { useState, useContext, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { CountryContext } from "../context/CountryContext";
import { RiAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { TitleContext } from "../context/TitleContext";

const CountryView = () => {
  const { setTitle } = useContext(TitleContext);
  const { country } = useContext(CountryContext);
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  useEffect(() => {
    setTitle("Master Data");
  });
  return (
    <div className="px-4 py-4">
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
        />
        <Link to="/home/addcountry">
          <button
            type="button"
            className="text-[#2C4856] bg-[#ffff] hover:bg-[#d7d6d6] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <RiAddFill className="h-6 w-6" />
          </button>
        </Link>
      </div>

      <DataTable
        value={country}
        filters={filter}
        className="mt-5"
        sortMode="multiple"
        paginator
        rows={5}
        totalRecords={country.length}
      >
        <Column field="idcountry" header="ID" sortable></Column>
        <Column field="countryName" header="Country" sortable></Column>
      </DataTable>
    </div>
  );
};

export default CountryView;
