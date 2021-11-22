import React from "react";
import { Redirect } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { useSelector } from "react-redux";

export default function Auth({ authRoute }) {
  const auth = useSelector((state) => state.auth);

  if (auth?.authLoading) return <Loading />;
  if (auth?.isAuthenticated) return <Redirect to="/" />;
  return (
    <>
      {authRoute === "login" && <Login />}
      {authRoute === "register" && <Register />}
    </>
  );
}
