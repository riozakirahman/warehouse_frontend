import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { TitleContext } from "../context/TitleContext";
import Sidebar from "../component/Sidebar";
import Menu from "../component/Menu";
import { CompanyContextProvider } from "../context/CompanyContext";
import { CurrencyContextProvider } from "../context/currencyContext";
import { CountryContextProvider } from "../context/CountryContext";
import { CityContextProvider } from "../context/CityContext";
import { ProvinceContextProvider } from "../context/ProvinceContext";

const Home = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const { setTitle } = useContext(TitleContext);
  const username = userInfo?.username;
  const nav = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/users/profile", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
      });
  }, []);

  useEffect(() => {
    setTitle("Inventory Detail");
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleSidebarToggle() {
    setIsSidebarOpen(!isSidebarOpen);
    console.log("hello");
  }

  if (!username) {
    nav("/");
  }

  return (
    <>
      <CompanyContextProvider>
        <CurrencyContextProvider>
          <CountryContextProvider>
            <ProvinceContextProvider>
              <CityContextProvider>
                <div className="md:flex relative">
                  <div className="h-screen w-72 overflow-y-scroll bg-black">
                    <Sidebar
                      isOpen={isSidebarOpen}
                      setIsOpen={handleSidebarToggle}
                    ></Sidebar>
                  </div>
                  <div className="w-full drop-shadow bg-gray-300">
                    <Menu handleClick={handleSidebarToggle}></Menu>
                    <Outlet></Outlet>
                  </div>
                </div>
              </CityContextProvider>
            </ProvinceContextProvider>
          </CountryContextProvider>
        </CurrencyContextProvider>
      </CompanyContextProvider>
    </>
  );
};

export default Home;
