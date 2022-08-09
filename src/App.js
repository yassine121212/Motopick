import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Drivers from "./pages/drivers/drivers";
import Orders from "./pages/Orders/Orders";
import Single from "./pages/single/Single";
import Block from "./pages/block/block";
import Config from "./pages/Conffig/config";
import SingleDriver from "./pages/singledriver/SingleDriver";
import SingleOrder from "./pages/singleorder/SingleOrder";
import New from "./pages/new/New";
import Update from "./pages/Update/Update";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs, UpdateInputs} from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Admin from "./pages/Admin/Admin";
import { MotoContext } from "./context/MotoContext";
import Morders from "./pages/Maps/TrackOrders"
function App() {
  const { darkMode } = useContext(DarkModeContext);

  const {currentUser} = useContext(AuthContext)
  const {userf} = useContext(MotoContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="/maps_orders" element={<Morders />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            {userf?.musers && (
              <Route path="users">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <List />
                    </RequireAuth>
                  }
                />
                <Route
                  path=":userId"
                  element={
                    <RequireAuth>
                      <Single />
                    </RequireAuth>
                  }
                />
              </Route>
            )}

            {userf?.morders && (
              <Route path="orders">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <Orders />
                    </RequireAuth>
                  }
                />
                <Route
                  path=":Orderid"
                  element={
                    <RequireAuth>
                      <SingleOrder />
                    </RequireAuth>
                  }
                />
              </Route>
            )}
            {userf?.mblock && (
              <Route path="block">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <Block />
                    </RequireAuth>
                  }
                />
              </Route>
            )}
            <Route path="Config">
              <Route
                index
                element={
                  <RequireAuth>
                    <Config />
                  </RequireAuth>
                }
              />{" "}
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Update inputs={UpdateInputs} title="Update " />
                  </RequireAuth>
                }
              />
            </Route>
            {userf?.mdrivers && (
              <Route path="drivers">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <Drivers />
                    </RequireAuth>
                  }
                />
                <Route
                  path=":DriverId"
                  element={
                    <RequireAuth>
                      <SingleDriver />
                    </RequireAuth>
                  }
                />
              </Route>
            )}
            {userf?.madmin && (
              <Route path="Admin">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <Admin />
                    </RequireAuth>
                  }
                />
                <Route
                  path="new"
                  element={
                    <RequireAuth>
                      <New inputs={userInputs} title="Ajouter un nouveau administrateur" />
                    </RequireAuth>
                  }
                />
              </Route>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;