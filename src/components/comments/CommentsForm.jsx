import React from "react";
// para la redireccion forzada al home
import { useHistory } from "react-router-dom";
// para redux
import { useSelector } from "react-redux";
// para crud de firebase
import FirestoreActions from "../../hooks/firebase/firestoreActions";
// falta importar firebase actions para el post de comentario
import CommentInput from "../../hooks/CommentInput";
const CommentsForm = props => {
  const history = useHistory();
  const [, , , , , PostComment] = FirestoreActions();

  const [menssage, bindMenssage] = CommentInput();

  const state = useSelector(state => state);

  const HandleSend = () => {
    const data = {
      comment: menssage,
      nickname: state.usernickname,
      uid: state.userid
    };

    if (data.comment.length < 30) {
      alert("El comentario debe tener al menos 30 carácteres.");
    } else {
      PostComment(props.id, data);
      alert("Se ha publicado su comentario");
      history.push("/");
    }
    // al postear un comentario se debe reiniciar el componente, la tarjeta para que no se dupliquen
  };

  return (
    <>
      <div className="form-block-horizontal">
        <textarea
          rows="4"
          cols="16"
          maxLength="200"
          className="form-element"
          placeholder="Escribe un comentario"
          {...bindMenssage}
        ></textarea>
      </div>

      <div className="form-block-horizontal">
        <div className="form-block-horizontal"></div>

        <button className=" button-show-comments" onClick={() => HandleSend()}>
          Enviar
        </button>
      </div>
    </>
  );
};

export default CommentsForm;
