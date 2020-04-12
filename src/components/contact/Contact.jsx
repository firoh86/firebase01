import React, { useState } from "react";
import ContactHook from "../../hooks/ContactHook";
// para redux
import { useSelector } from "react-redux";
// para emailJS
import emailjs from "emailjs-com";
const Contact = () => {
  const state = useSelector(state => state);

  const [asunto, mensaje, bindAsunto, bindMensaje, reset] = ContactHook();

  const [mensajeStatus, setMensajeStatus] = useState(false);

  const templateParams = {
    reply_to: "reply_to_value",
    from_name: `${state.usernickname}`,
    message_html: `asunto: ${asunto} mensaje:${mensaje}`
  };

  const Handlesubmit = () => {
    // console.log(`${asunto} ${mensaje}`);
    if (asunto !== undefined && mensaje !== undefined) {
      emailjs
        .send(
          "alejandro",
          "template_4A8S6Kwt",
          templateParams,
          "user_RnamSqwAe2kBa1aQb9N6h"
        )
        .then(
          response => {
            console.log("SUCCESS!", response.status, response.text);
            setMensajeStatus(mensajeStatus => !mensajeStatus);
          },
          err => {
            console.log("FAILED...", err);
          }
        );
    } else {
      alert("rellena los campos del formulario antes de enviar un mensaje");
    }

    reset();
  };

  return (
    <div>
      <div className="form-container">
        <div className="form-card">
          {!mensajeStatus ? (
            <>
              <h3 className="form-tittle">Contacto</h3>
              <div className="form-block-vertical">
                <p className="smalltext">
                  ¿Tienes problemas con algún usuario?
                </p>
                <p className="smalltext">¿Has encontrado un bug?</p>
                <input
                  type="text"
                  placeholder="asunto del mensaje"
                  maxLength="50"
                  className="form-element"
                  {...bindAsunto}
                ></input>
                <textarea
                  rows="8"
                  cols="15"
                  maxLength="200"
                  className="form-element"
                  placeholder="Escribe aqui el mensaje"
                  {...bindMensaje}
                ></textarea>
                <button className="form-button" onClick={() => Handlesubmit()}>
                  enviar
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="form-block-vertical">
                <div className="form-subtittle">
                  {" "}
                  El mensaje ha sido enviado{" "}
                </div>
                <button
                  className="form-button"
                  onClick={() =>
                    setMensajeStatus(mensajeStatus => !mensajeStatus)
                  }
                >
                  volver
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
