import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import LoginFooter from "./components/LoginFooter";
import SignupFooter from "./components/SignupFooter";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";
import SearchUser from "./components/SearchUser";
import PublicUserProfile from "./components/PublicUserProfile";

function App() {
  return (
    <div>
      {/* Link to pages using React Router DOM */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                <Navbar /> <SignUp /> <SignupFooter />
              </>
            }
          ></Route>
          <Route
            path="/signin"
            element={
              <>
                <Navbar /> <SignIn /> <LoginFooter />
              </>
            }
          ></Route>
          <Route
            path="/UserProfile"
            element={
              <>
                <Navbar /> <UserProfile /> <LoginFooter />
              </>
            }
          ></Route>
          <Route
            path="/users/search"
            element={
              <>
                <Navbar /> <SearchUser /> <LoginFooter />
              </>
            }
          ></Route>
          <Route
            path="/users/search/:id"
            element={
              <>
                <Navbar /> <PublicUserProfile />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
