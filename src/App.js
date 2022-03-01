import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Signup from "./Component/SignUp/Signup";
import Signin from "./Component/SignIn/Signin";
import Tab1 from "./Component/Tab1/Tab1";
import AuthProvider from "./Provider/AuthProvider";
import Tab2 from "./Component/Tab2/Tab2";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/tab1"
              element={
                <PrivateRoute>
                  <Tab1 />
                </PrivateRoute>
              }
            />
            <Route
              path="/tab2"
              element={
                <PrivateRoute>
                  <Tab2 />
                </PrivateRoute>
              }
            />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
