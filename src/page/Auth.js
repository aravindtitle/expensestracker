import React, { useState } from "react";
import Authentication from "../auth/Auth";
import { useDispatch } from "react-redux";
import { authActions } from "../store/AuthReduces";
import { redirect, useNavigate } from "react-router-dom";

const Auth = () => {
  const [token, setToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [mode, setMode] = useState("SignUp");
  const navigate = useNavigate();

  //here we wer using redux concenpt brother.

  const dispatch = useDispatch();

  // just cheking out value of total expense

  const ModeHandler = () => {
    console.log("mode handler");
    if (mode === "SignUp") {
      setMode("login");
    } else {
      setMode("SignUp");
    }
  };

  async function SignUp(AuthObj) {
    // event.preventDefault();
    console.log(AuthObj);
    let url;
    if (mode === "login") {
      console.log("login");
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvfI765RzQerwARKTJwziACEhKtAt03Cg";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvfI765RzQerwARKTJwziACEhKtAt03Cg";
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(AuthObj),
      });
      if (!response.ok) {
        throw new Error("need to create a password");
      }
      const data = await response.json();
      console.log(data.idToken);
      setToken(data.idToken);
      setIsLogin(true);
      localStorage.setItem("idToken", data.idToken);
      localStorage.setItem("isLogin", AuthObj.isLogin);
      dispatch(authActions.login(data.idToken));
      navigate("/");
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  }

  return (
    <>
      <Authentication
        isLogin={isLogin}
        mode={mode}
        SignUp={SignUp}
        ModeHandler={ModeHandler}
      />
    </>
  );
};

export default Auth;
