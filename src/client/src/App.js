import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import LoginFooter from "./components/LoginFooter";
import SignupFooter from "./components/SignupFooter";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";
import JobApplication from "./components/JobApplication";
import JobListing from "./components/JobListing";
import SearchUser from "./components/SearchUser";
import PublicUserProfile from "./components/PublicUserProfile";
import EditUserProfile from "./components/EditUserProfile";

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
          <Route
            path="/editUserProfile"
            element={
              <>
                <Navbar /> <EditUserProfile /> <LoginFooter />
              </>
            }
          ></Route>
          <Route>
            path="/jobs"
            element={
              <>
                <Navbar /> <JobListing /> <LoginFooter />
              </>
            }
          </Route>
          <Route
            path="/jobs/:id"
            element={
              <>
                <Navbar /> <JobApplication /> <LoginFooter />
              </>
            }
          ></Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
