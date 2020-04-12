import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SingUpForm from "./SingUpForm";

// para redux
import { useSelector } from "react-redux";

const Login = () => {
  // para saber si el usuario esta logeado
  const state = useSelector(state => state);
  // console.log(state.isloged);

  const [create, setCreate] = useState(false);

  const isCreating = () => {
    setCreate(create => !create);
  };

  return (
    <div>
      {!state.isloged && (
        <div>
          {create ? (
            <SingUpForm create={isCreating}></SingUpForm>
          ) : (
            <LoginForm create={isCreating} />
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
