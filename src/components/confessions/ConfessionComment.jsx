import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// para state de redux
import { useSelector } from "react-redux";
import FirestoreActions from "../../hooks/firebase/firestoreActions";

// para la redireccion forzada al home
import { useHistory } from "react-router-dom";

const ConfessionComment = props => {
  const history = useHistory();
  const [, , , , , , DeleteComment] = FirestoreActions();
  const state = useSelector(state => state);

  const handleCommentDelete = () => {
    DeleteComment(props.data.commentID);
    // todos los push history deben ir a una funcion externalizada
    history.push("/");
  };

  return (
    <div className="form-block-vertical">
      <div className=" form-block-horizontal ">
        <div className="post-comments">
          <p>
            <span className="post-nickname">{props.data.nickname}</span>
            {props.data.comment}
          </p>
        </div>
        {props.data.uid === state.userid && (
          <div className="post-buttons-container">
            <button className=" post-button ">
              <FontAwesomeIcon
                icon={faTrash}
                size="1x"
                className="post__icon"
                onClick={() => handleCommentDelete()}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfessionComment;
