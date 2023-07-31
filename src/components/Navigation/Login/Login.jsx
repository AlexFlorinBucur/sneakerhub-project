import React from "react";
import classes from "./Login.module.css";
import Modal from "../../UI/Modal";
import Drawer from "../../UI/Drawer";
import Input from "../../UI/Input";

const Login = ({ onCloseModal, show }) => {
  return (
    <Modal onClose={onCloseModal} show={show}>
      <Drawer
        cssClass={classes.right}
        onCloseModal={onCloseModal}
        show={show}
        animationClassEnter={classes.ModalOpenRight}
        animationClassExit={classes.ModalClosedRight}
      >
        <form className={classes.form}>
          <Input
            input={{
              type: "email",
              placeholder: "Email",
              required: "required",
            }}
          />
          <Input
            input={{
              type: "password",
              placeholder: "Password",
              required: "required",
            }}
          />
          <div className={classes.actions}>
            <button>Login</button>
            <button className={classes.toggle}>Create new account</button>
          </div>
        </form>
      </Drawer>
    </Modal>
  );
};

export default Login;
