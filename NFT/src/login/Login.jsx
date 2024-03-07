import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { LoginCreate } from "./LoginCreate";
import styles from "./Login.module.css";

export const Login = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="criar" element={<LoginCreate />} />
      </Routes>
    </div>
  );
};
