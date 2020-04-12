import { useState } from "react";

const LoginInputs = initialValue => {
  // campos del formulario
  const [email, setEmail] = useState(initialValue);
  const [password, setPassword] = useState(initialValue);

  // actualizacion de los campos
  const bindMail = {
    email,
    onChange: e => {
      setEmail(e.target.value);
    }
  };
  const bindPassword = {
    password,
    onChange: e => {
      setPassword(e.target.value);
    }
  };
  const reset = () => {
    setEmail(initialValue);
    setPassword(initialValue);
  };

  return [email, password, bindMail, bindPassword, reset];
};

export default LoginInputs;
