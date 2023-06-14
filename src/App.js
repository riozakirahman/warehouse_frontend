import Login from "./pages/Login";
import Home from "./pages/Home";
import Company from "./component/Company";
import { UserContextProvider } from "./context/UserContext.js";
import { TitleContextProvider } from "./context/TitleContext";
import { CurrencyContextProvider } from "./context/currencyContext";
import { CountryContextProvider } from "./context/CountryContext";
import { ProvinceContextProvider } from "./context/ProvinceContext";
import { CityContextProvider } from "./context/CityContext";
import { CompanyContextProvider } from "./context/CompanyContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Currency from "./component/Currency";
import Country from "./component/Country";
import Province from "./component/Province";
import City from "./component/City";
import CompanyView from "./component/CompanyView";
import CurrencyView from "./component/CurrencyView";
import CountryView from "./component/CountryView";
import CityView from "./component/CityView";
import ProvinceView from "./component/ProvinceView";
function App() {
  return (
    <div className="App ">
      <UserContextProvider>
        <TitleContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={<Login />} />
                <Route path="home" element={<Home />}>
                  <Route index element={<h1>Dashboard</h1>} />
                  <Route path="company" element={<CompanyView />} />
                  <Route path="currency" element={<CurrencyView />} />
                  <Route path="country" element={<CountryView />} />
                  <Route path="province" element={<ProvinceView />} />
                  <Route path="city" element={<CityView />} />
                  <Route path="addcompany" element={<Company />} />
                  <Route path="addcurrency" element={<Currency />} />
                  <Route path="addcountry" element={<Country />} />
                  <Route path="addcity" element={<City />} />
                  <Route path="addprovince" element={<Province />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </TitleContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
