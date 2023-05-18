import React from "react";
import classes from "./Login.module.css";
import { MdClose } from "react-icons/md";

const Login = () => {
  return (
    <>
      <div className={classes.backdrop}></div>
      <div className={classes.drawer}>
        <div className={classes["logo-exit"]}>
          <MdClose className={classes["exit-icon"]} />
        </div>
        {/*  */}
        <form className={classes.form}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <div className={classes.actions}>
            <button>Login</button>
            <button className={classes.toggle}>Create new account</button>
          </div>
        </form>
        {/*  */}
      </div>
    </>
  );
};

export default Login;
