import { useState } from "react";
const ContactHook = initialValue => {
  // campos del formulario
  const [asunto, setAsunto] = useState(initialValue);
  const [mensaje, setMensaje] = useState(initialValue);

  // actualizacion de los campos
  const bindAsunto = {
    asunto,
    onChange: e => {
      setAsunto(e.target.value);
    }
  };
  const bindMensaje = {
    mensaje,
    onChange: e => {
      setMensaje(e.target.value);
    }
  };
  const reset = () => {
    setAsunto(initialValue);
    setMensaje(initialValue);
  };

  return [asunto, mensaje, bindAsunto, bindMensaje, reset];
};

export default ContactHook;
