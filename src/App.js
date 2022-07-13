import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Drivers from "./pages/drivers/drivers";
import Orders from "./pages/Orders/Orders";
import Single from "./pages/single/Single";
import SingleDriver from "./pages/singledriver/SingleDriver";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Admin from "./pages/Admin/Admin";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div
      className={darkMode ? "app dark" : "app"}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              path="login"
              element={<Login />}
            />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
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
            <Route path="orders">
              <Route
                index
                element={
                  <RequireAuth>
                    <Orders />
                  </RequireAuth>
                }
              />
            </Route>
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
                    <SingleDriver/>
                  </RequireAuth>
                }
              />
               
            </Route>
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
                    <New
                      inputs={userInputs}
                      title="Add New admin"
                    />
                  </RequireAuth>
                }
              />
          </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;