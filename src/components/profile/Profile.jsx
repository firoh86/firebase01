import React, { useState } from "react";
// para state de redux
import { useSelector } from "react-redux";
import ProfileInputs from "../../hooks/ProfileInputs";

import FirestoreActions from "../../hooks/firebase/firestoreActions";
import FireStorage from "../../hooks/firebase/FireStorage";

const Profile = () => {
  const state = useSelector(state => state);
  const [
    nickname,
    description,
    bindNickname,
    bindDescription,
    reset
  ] = ProfileInputs("");

  const [, , , , UpdateProfileData] = FirestoreActions();
  const [editmode, setEditmode] = useState(false);

  const HandleEditmode = () => {
    setEditmode(editmode => !editmode);
    reset();
  };

  const HandleProfileEdit = () => {
    console.log("Se esta editando el perfil");
    const newdata = {
      description: description,
      likes: state.likes,
      followers: state.followers,
      following: state.following,
      nickname: nickname,
      profilepic: state.profilepic
    };
    UpdateProfileData(state.userid, newdata);
    // console.log(state.userid, newdata);
    HandleEditmode();
  };

  return (
    <div className="profile__container">
      <h3 className="form-tittle header-top">Perfil</h3>
      <div className="card-profile">
        <div className="card-profile__header">
          <div className="form-block-vertical ">
            {!editmode ? (
              <>
                <div className="card-profile__image">
                  <img
                    src={state.profilepic}
                    alt={`profilepic ${state.usernickname}`}
                  />
                </div>
                <h3 className="card-profile__nickname form-tittle">
                  {state.usernickname}
                </h3>
                <p className="card-profile__description">{state.description}</p>
              </>
            ) : (
              <>
                <FireStorage state={state} />
                <input
                  className="form-element"
                  {...bindNickname}
                  type="text"
                  maxLength="12"
                  placeholder={state.usernickname}
                ></input>

                <input
                  className="form-element"
                  {...bindDescription}
                  type="text"
                  maxLength="120"
                  placeholder={state.description}
                ></input>
              </>
            )}
          </div>
        </div>
        <div className="card-profile__body">
          {!editmode && (
            <>
              <div className="card-profile__column">
                <h2 className="card-profile__count">{state.likes}</h2>
                <h4 className="card-profile__subtitle">Likes</h4>
              </div>
              <div className="card-profile__column">
                <h2 className="card-profile__count">{state.followers}</h2>
                <h4 className="card-profile__subtitle">Followers</h4>
              </div>
              <div className="card-profile__column">
                <h2 className="card-profile__count">{state.following}</h2>
                <h4 className="card-profile__subtitle">Following</h4>
              </div>
            </>
          )}
        </div>

        {!editmode ? (
          <button className="form-button" onClick={() => HandleEditmode()}>
            Editar Perfil
          </button>
        ) : (
          <div className="form-block-vertical ">
            <button className="form-button" onClick={() => HandleEditmode()}>
              Volver
            </button>
            <button className="form-button" onClick={() => HandleProfileEdit()}>
              Aceptar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
