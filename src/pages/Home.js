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
import { UomContext, UomContextProvider } from "../context/UomContext";
import { AttributeContextProvider } from "../context/AttributeContext";
import { AttrValueContextProvider } from "../context/AttrValueContext";
import { ProductContextProvider } from "../context/ProductContext";
import {
  ProductAttributeContext,
  ProductAttributeContextProvider,
} from "../context/ProductAttributeContext";
import { ProductUnitContextProvider } from "../context/ProductUnitContext";
import { WarehouseContextProvider } from "../context/WarehouseContext";
import { StockContextProvider } from "../context/StockContext";
import { AdjustmentContextProvider } from "../context/AdjustmentContext";
import { VendorContextProvider } from "../context/VendorContext";
import { POContextProvider } from "../context/PoContext";
import { TransferContextProvider } from "../context/TransferContext";

const Home = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const { setTitle } = useContext(TitleContext);
  const username = userInfo?.username;
  const nav = useNavigate();

  useEffect(() => {
    try {
      fetch("http://localhost:4000/api/users/profile", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data);
        });
    } catch (error) {}
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
                <ProductUnitContextProvider>
                  <ProductContextProvider>
                    <ProductAttributeContextProvider>
                      <UomContextProvider>
                        <AttributeContextProvider>
                          <AttrValueContextProvider>
                            <WarehouseContextProvider>
                              <StockContextProvider>
                                <AdjustmentContextProvider>
                                  <VendorContextProvider>
                                    <POContextProvider>
                                      <TransferContextProvider>
                                        <div className="md:flex relative">
                                          <div className="w-72 overflow-y-scroll h-screen  bg-black">
                                            <Sidebar
                                              isOpen={isSidebarOpen}
                                              setIsOpen={handleSidebarToggle}
                                            ></Sidebar>
                                          </div>
                                          <div className="w-full drop-shadow bg-gray-300">
                                            <Menu
                                              handleClick={handleSidebarToggle}
                                            ></Menu>
                                            <Outlet></Outlet>
                                          </div>
                                        </div>
                                      </TransferContextProvider>
                                    </POContextProvider>
                                  </VendorContextProvider>
                                </AdjustmentContextProvider>
                              </StockContextProvider>
                            </WarehouseContextProvider>
                          </AttrValueContextProvider>
                        </AttributeContextProvider>
                      </UomContextProvider>
                    </ProductAttributeContextProvider>
                  </ProductContextProvider>
                </ProductUnitContextProvider>
              </CityContextProvider>
            </ProvinceContextProvider>
          </CountryContextProvider>
        </CurrencyContextProvider>
      </CompanyContextProvider>
    </>
  );
};

export default Home;
