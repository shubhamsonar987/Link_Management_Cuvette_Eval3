import React from "react";
import { Routes, Route } from "react-router-dom";
import UserProtectedWrapper from "./pages/UserProtectedWrapper"; // Corrected path
import Dashboard from "./pages/Dashboard/Dashborad";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import UserPreference from "./pages/UserPrefence/UserPreference";
import Links from "./pages/Layout/Links";
import Settings from "./pages/Settings/Settings";
import Analytixs from "./pages/Analytixs/Analytixs";
import Appearence from "./pages/Appearance/Appearence";
import Frame from "./components/frame/Frame";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/userpreference"
          element={
            <UserProtectedWrapper>
              <UserPreference />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/links"
          element={
            <UserProtectedWrapper>
              <Links />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/appearance"
          element={
            <UserProtectedWrapper>
              <Appearence />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/analytics"
          element={
            <UserProtectedWrapper>
              <Analytixs />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/settings"
          element={
            <UserProtectedWrapper>
              <Settings />
            </UserProtectedWrapper>
          }
        />
        <Route path="/frame/:userId" element={<Frame />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
