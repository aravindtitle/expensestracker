import React, { useRef, useState } from "react";

const Authentication = ({ isLogin, mode, SignUp, ModeHandler }) => {
  const [forgetpass, setForgetpass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const Email = useRef();
  const Password = useRef();
  const ConfirmPassword = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const AuthObj = {
      email: Email.current.value,
      password: Password.current.value,
      returnSecureToken: true,
    };

    const modifiedEmail = Email.current.value.replace(/[@.]/g, "");
    localStorage.setItem("UID", modifiedEmail);
    if (mode === SignUp) {
      if (Password.current.value !== ConfirmPassword.current.value) {
        window.confirm("password and confirm password are not same");
        return;
      }
    }
    console.log(AuthObj);
    SignUp(AuthObj);
    Email.current.value = "";
    Password.current.value = "";
  }

  ///here forget password function is working here brother

  function forgetPasshandler() {
    console.log(forgetpass);
    setForgetpass((value) => !value);
    async function forgetPasswordHandler() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBvfI765RzQerwARKTJwziACEhKtAt03Cg",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email: Email.current.value,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("error occured on the resetting");
        }
        setIsLoading(false);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }
    console.log(forgetpass);
    if (forgetpass) {
      forgetPasswordHandler();
    }
  }

  return (
    <div className="d-flex flex-column  justify-content-center border border-2 border-black align-items-center">
      {isLogin && <div>welcome to the the expense tracker</div>}
      <h1 className="mb-4">{mode === "login" ? "Login" : "SignUp"}</h1>
      <form
        onSubmit={submitHandler}
        className="row g-3 border border-black border-4  w-25 rounded-3"
      >
        {isLoading && <h1>password is resseting</h1>}
        <div className="form-group">
          <label htmlFor="staticEmail2">Email</label>
          <input
            ref={Email}
            type="text"
            className="form-control"
            id="staticEmail2"
            required
          />
        </div>
        {!forgetpass && (
          <div>
            <label htmlFor="inputPassword2">Password</label>
            <input
              ref={Password}
              type="password"
              className="form-control"
              id="inputPassword2"
              required
            />
          </div>
        )}
        {mode === "SignUp" && (
          <div>
            <label htmlFor="confirmPassword">ConfirmPassword</label>
            <input
              ref={ConfirmPassword}
              type="password"
              className="form-control"
              id="confirmPassword"
              required
            />
          </div>
        )}
        <div className=" d-flex  flex-column justify-content-center">
          <button
            type="button"
            className="btn btn-primary m-1 "
            onClick={forgetPasshandler}
          >
            {!forgetpass ? "Forget Password" : "sendLink"}
          </button>
          {forgetpass && (
            <button
              type="button"
              className="btn btn-primary "
              onClick={forgetPasshandler}
            >
              already a user? login
            </button>
          )}
        </div>
        <div className="d-flex justify-content-center ">
          {!forgetpass && (
            <button type="submit" className="btn btn-primary mb-3 hover active">
              {mode === "login" ? "Login" : "SignUp"}
            </button>
          )}
          {!forgetpass && (
            <button
              onClick={ModeHandler}
              type="button"
              className="btn btn-primary mb-3 hover active mx-1"
            >
              change mode{" "}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Authentication;
