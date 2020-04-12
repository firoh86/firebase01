import React from "react";
import LoginInputs from "../../hooks/LoginInputs";
import FirebaseAuth from "../../hooks/firebase/firebaseAuth";

const LoginForm = ({ create }) => {
  // loginInputs
  const [email, password, bindMail, bindPassword, reset] = LoginInputs("");
  // firebaseAuth
  const [login] = FirebaseAuth();
  // debuguear no llega el reset
  const loginHandle = e => {
    e.preventDefault();
    login(email, password);
    // async con redux
    reset();
  };
  return (
    <div className="form-container">
      <div className="form-card ">
        <form onSubmit={loginHandle}>
          <h3 className="form-tittle">log in</h3>
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

            <button className="form-button ">Acceder</button>
          </div>
        </form>
        <div className="form-block-vertical">
          <p className="form-subtittle">¿Aun no tienes cuenta?</p>
          <button className="form-button " onClick={() => create()}>
            Crear una
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
