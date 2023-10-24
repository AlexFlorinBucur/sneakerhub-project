import React, { useEffect } from "react";
import classes from "./Login.module.css";
import Modal from "../../UI/Modal";
import Drawer from "../../UI/Drawer";
import { useSelector } from "react-redux";
import { useLogin } from "../../../hooks/userActions";
import LoginForm from "./LoginForm";
import UserAuthenticated from "./AuthenticatedUser";

const Login = ({ onCloseModal, show }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { userAction, switchAction, loadingAction } = useLogin();

  return (
    <Modal onClose={onCloseModal} show={show}>
      <Drawer
        cssClass={classes.right}
        onCloseModal={onCloseModal}
        show={show}
        animationClassEnter={classes.ModalOpenRight}
        animationClassExit={classes.ModalClosedRight}
      >
        {!isLoggedIn && (
          <LoginForm
            show={show}
            userAction={userAction}
            switchAction={switchAction}
            loadingAction={loadingAction}
            showingOptions={true}
          />
        )}
        {isLoggedIn && (
          <UserAuthenticated
            onCloseModal={onCloseModal}
            switchAction={switchAction}
          />
        )}
      </Drawer>
    </Modal>
  );
};

export default Login;
