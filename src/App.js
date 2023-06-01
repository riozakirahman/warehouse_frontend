import Login from "./pages/Login";
import Home from "./pages/Home";
import Company from "./component/Company";
import { UserContextProvider } from "./context/UserContext.js";
import { TitleContextProvider } from "./context/TitleContext";
import { CurrencyContextProvider } from "./context/currencyContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Currency from "./component/Currency";
function App() {
  return (
    <div className="App ">
      <UserContextProvider>
        <TitleContextProvider>
          <CurrencyContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/">
                  <Route index element={<Login />} />
                  <Route path="home" element={<Home />}>
                    <Route index element={<h1>Dashboard</h1>} />
                    <Route path="company" element={<Company />} />
                    <Route path="currency" element={<Currency />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </CurrencyContextProvider>
        </TitleContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
