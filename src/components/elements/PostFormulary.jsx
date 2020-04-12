import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
// para post en firestore
import firestoreActions from "../../hooks/firebase/firestoreActions";
// para actualizar tras post
import { useHistory } from "react-router-dom";
// para redux
import { useSelector } from "react-redux";
const PostFormulary = () => {
  // hook de history, solo funciona con hooks
  let history = useHistory();

  // para saber si el usuario esta logeado y extraer uid y nickname
  const state = useSelector(state => state);
  // hook de firestoreactions
  const [, , SetPost] = firestoreActions();
  const [postForm, setPostForm] = useState(false);
  const [confesion, setConfesion] = useState("");

  const textAreaMaxLenght = 400;

  const handletogglePost = action => {
    switch (action) {
      case "reset":
        setConfesion("");
        console.log("se resetea el form");
        break;
      case "send":
        console.log("se envia la data");
        if (confesion.length > 30) {
          var dt = new Date();
          var utcDate = dt.toUTCString();
          SetPost(
            state.usernickname,
            state.userid,
            confesion,
            utcDate,
            state.profilepic
          );

          // history push para actualizar la pagina
          history.push("/");
        } else {
          alert("El post es demasiado corto, escribe algo más");
        }
        break;
      default:
        break;
    }

    setPostForm(postForm => !postForm);
  };

  return (
    <div className="home-post">
      {state.isloged &&
        // button post
        (!postForm ? (
          <div className="post-button-container">
            <button className="button-small" onClick={() => handletogglePost()}>
              <FontAwesomeIcon icon={faEdit} size="1x" className="post__icon" />
            </button>
          </div>
        ) : (
          // form post

          <div className="form-container">
            <div className="form-card">
              <h3 className="form-tittle">Confesionario</h3>
              <div className="form-block-horizontal">
                <div>
                  <textarea
                    rows="8"
                    cols="15"
                    maxLength={textAreaMaxLenght}
                    className="form-element"
                    placeholder="Escribe una confesión anónima"
                    onChange={e => setConfesion(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="form-block-horizontal">
                <p className="form-subtittle smalltext">{`quedan ${textAreaMaxLenght -
                  confesion.length} carácteres`}</p>
              </div>
              <div className="form-block-horizontal">
                <button
                  className="form-button"
                  onClick={() => {
                    handletogglePost("reset");
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    size="1x"
                    className="post__icon"
                  />
                </button>
                {/* guardar en firebase el post y el nickname del usuario que lo crea */}
                <button
                  className="form-button"
                  onClick={() => handletogglePost("send")}
                >
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    size="1x"
                    className="post__icon"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostFormulary;
