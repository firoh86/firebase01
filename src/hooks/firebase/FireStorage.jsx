import React, { useState } from "react";
import firebase from "firebase";
// para redux actions
import Actions from "../../components/redux/Actions";

const FireStorage = props => {
  // actions de redux
  const [, logData] = Actions();

  const storage = firebase.storage();
  const storageRef = storage.ref();
  const [progress, setProgress] = useState(0);

  const HandleUpload = e => {
    const id = props.state.userid;
    const file = e.target.files[0];
    const url = `images/profile__${id}`;
    let newData = {};

    const url2 = storageRef.child(url).getDownloadURL();

    const uploadTask = storageRef.child(url).put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
      let progressbar = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      console.log("Upload is " + progressbar + "% done");
      setProgress(progressbar);

      newData = {
        description: props.state.description,
        followers: props.state.followers,
        following: props.state.following,
        likes: props.state.likes,
        nickname: props.state.nickname,
        profilepic: url2.i
      };
      if (progressbar === 100) {
        logData(newData);
      }
    });
  };

  return (
    <div className="form-block-vertical">
      <div className="card-profile__image">
        <img src={props.state.profilepic} alt=""></img>
      </div>
      <p className="smalltext ">Cambia tu avatar</p>
      <input
        className="form-element"
        type="file"
        accept=".jpeg, .png"
        onChange={e => HandleUpload(e)}
      />
      {progress !== 0 && progress !== 100 && (
        <progress className="progressbar" value={progress} max="100"></progress>
      )}
    </div>
  );
};

export default FireStorage;
