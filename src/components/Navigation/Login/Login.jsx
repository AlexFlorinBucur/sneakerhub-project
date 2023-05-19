import React from "react";
import classes from "./Login.module.css";
import { MdClose } from "react-icons/md";
import Drawer from "../../UI/Drawer";
import Modal from "../../UI/Modal";

const Login = () => {
  return (
    <>
      <Modal>
        {/* <div className={classes.backdrop}></div> */}
        <Drawer cssClass={classes.right}>
          <form className={classes.form}>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <div className={classes.actions}>
              <button>Login</button>
              <button className={classes.toggle}>Create new account</button>
            </div>
          </form>
        </Drawer>
      </Modal>
    </>
  );
};

export default Login;
