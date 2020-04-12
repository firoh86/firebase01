import { useState } from "react";

const ProfileInputs = () => {
  // campos del formulario
  const [nickname, setNickname] = useState();
  const [description, setDescription] = useState();

  // actualizacion de los campos
  const bindNickname = {
    nickname,
    onChange: e => {
      setNickname(e.target.value);
    }
  };
  const bindDescription = {
    description,
    onChange: e => {
      setDescription(e.target.value);
    }
  };
  const reset = () => {
    setNickname("");
    setDescription("");
  };

  return [nickname, description, bindNickname, bindDescription, reset];
};

export default ProfileInputs;
