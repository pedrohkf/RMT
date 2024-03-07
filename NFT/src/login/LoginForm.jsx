import React from "react";
import { Link } from "react-router-dom";
import { Input } from "./Input";
import { useForm } from "../Hooks/useForm";

export const LoginForm = () => {
  const username = useForm("email");
  const password = useForm("password");

  function handleSubmit(e) {
    e.preventDefault();

    if(username.validate() && password.validate()){
      console.log('Logado');
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />

        <Input label="Senha" type="password" name="password" {...password} />

        <button>Entrar</button>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};
