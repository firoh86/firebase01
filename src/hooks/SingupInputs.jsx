import { useState } from "react";

const SingupInputs = initialValue => {
  // campos del formulario
  const [email, setEmail] = useState(initialValue);
  const [password, setPassword] = useState(initialValue);
  const [repassword, setRepassword] = useState(initialValue);
  const [nickname, setNickname] = useState(initialValue);

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
  const bindRepassword = {
    repassword,
    onChange: e => {
      setRepassword(e.target.value);
    }
  };
  const bindNickname = {
    nickname,
    onChange: e => {
      setNickname(e.target.value);
    }
  };
  const reset = () => {
    // console.log("se resetea");
    setEmail(initialValue);
    setPassword(initialValue);
    setRepassword(initialValue);
    setNickname(initialValue);
  };

  return [
    email,
    password,
    repassword,
    nickname,
    bindMail,
    bindPassword,
    bindRepassword,
    bindNickname,
    reset
  ];
};

export default SingupInputs;
