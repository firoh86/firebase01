import React from "react";
import SingupInputs from "../../hooks/SingupInputs";
import FirebaseAuth from "../../hooks/firebase/firebaseAuth";

const SingUpForm = ({ create }) => {
  // SingUpInputs
  const [
    email,
    password,
    repassword,
    nickname,
    bindMail,
    bindPassword,
    bindRepassword,
    bindNickname,
    reset
  ] = SingupInputs("");
  // firebaseAuth
  const [, singup] = FirebaseAuth();
  // falta pasar el nickname al firestore
  // debuguear no llega el reset
  const singupHandle = e => {
    e.preventDefault();
    singup(email, password, repassword, nickname);
    reset();
  };
  return (
    <div className="form-container ">
      <div className="form-card ">
        <form onSubmit={singupHandle}>
          <h3 className="form-tittle">Sign in</h3>
          <div className="form-block-vertical">
            <input
              type="email"
              {...bindMail}
              placeholder="correo"
              className="form-element"
            ></input>

            <input
              type="password"
              {...bindPassword}
              placeholder="contraseña"
              className="form-element"
            ></input>

            <input
              type="password"
              {...bindRepassword}
              placeholder="repite contraseña"
              className="form-element"
            ></input>

            <input
              type="text"
              {...bindNickname}
              placeholder="nombre de usuario"
              className="form-element"
            ></input>

            <button className="form-button ">Crear cuenta</button>
          </div>
        </form>
        <div className="form-block-vertical">
          <p className="form-subtittle">¿Ya tienes una cuenta?</p>
          <button className="form-button " onClick={() => create()}>
            Acceder
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingUpForm;
