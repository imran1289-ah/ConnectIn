import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import LoginFooter from "./components/LoginFooter";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";
import JobApplication from "./components/JobApplication";

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
                <Navbar /> <SignUp /> <LoginFooter />
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
            path="/jobs/:jobId"
            element={
              <>
                <Navbar /> <JobApplication/> <LoginFooter />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
