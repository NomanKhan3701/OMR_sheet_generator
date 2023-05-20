"use client";

import React, {
  useCallback,
  useState,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Layout.module.scss";
import * as actions from "@/store/actions/index";
// import Footer from "@/components/Footer/Footer";
// import Navbar from "@/components/Navbar/Navbar";


const Layout = (props) => {
  const dispatch = useDispatch();

  const onTryAutoSignup = useCallback(
    () => dispatch(actions.authCheckState()),
    [dispatch]
  );

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  return (
    <React.Fragment>
      {/* <Navbar /> */}

      <main className={classes.Layout}>
        {props.children}
        {/* <Footer /> */}
      </main>

    </React.Fragment>
  );
};

export default Layout;
