import React from "react";
import classes from "./Login.module.css";
import Drawer from "../../UI/Drawer";
import Modal from "../../UI/Modal";

const Login = ({ onCloseModal }) => {
  return (
    <>
      <Modal onClose={onCloseModal}>
        <Drawer cssClass={classes.right} onCloseModal={onCloseModal}>
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
