import { useState } from "react";

const CommentInput = () => {
  // campos del formulario
  const [menssage, setMenssage] = useState();

  // actualizacion de los campos
  const bindMenssage = {
    menssage,
    onChange: e => {
      setMenssage(e.target.value);
    }
  };

  return [menssage, bindMenssage];
};

export default CommentInput;
