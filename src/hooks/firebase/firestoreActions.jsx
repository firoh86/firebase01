import { firestore } from "firebase";
// para redux actions
import Actions from "../../components/redux/Actions";

const FirestoreActions = () => {
  // actions de redux
  const [, logData] = Actions();

  const SetNewUser = (uid, nickname) => {
    // console.log(`${uid} -- ${nickname}`);
    const newData = {
      uid: uid,
      nickname: nickname,
      description: "Escribe aqui una breve descripción de ti",
      followers: 0,
      following: 0,
      likes: 0,
      profilepic: "images/avatar.jpg"
    };
    firestore()
      .collection("users")
      // si no le pasas parametro a .doc google genera Id unico
      .doc(newData.uid)
      .set(newData)
      .catch(error => console.log(error));
  };

  // actualizar state de redux con la info de firestore al logearse
  const LoginUpdateData = uid => {
    firestore()
      .collection("users")
      .get()
      .then(snapshot => {
        const newProfileData = snapshot.docs
          .filter(data => data.id === uid)[0]
          .data();
        const newData = {
          description: newProfileData.description,
          likes: newProfileData.likes,
          followers: newProfileData.followers,
          following: newProfileData.following,
          nickname: newProfileData.nickname,
          profilepic: newProfileData.profilepic
        };
        logData(newData);
      })
      .catch(error => console.log(error));
  };

  // Set data si existe se actualiza, si no existe lo crea y devuelve el doc ID
  const SetPost = (nickname, uid, post, date, profilepic) => {
    // si no le pasas parametro a .doc google genera Id unico
    const postID = firestore()
      .collection("confesiones")
      .doc();
    const newData = {
      nickname: nickname,
      uid: uid,
      post: post,
      date: date,
      profilepic: profilepic,
      postID: postID.id
    };

    postID.set(newData).catch(error => console.log(error));
    return postID;
  };

  const DeletePost = (uid, post) => {
    // Busca el post que conicide
    let deletepost = "";
    firestore()
      .collection("confesiones")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          // console.log(doc.data());
          const data = doc.data();
          // console.log(`${uid} ${data.uid}`);
          if (data.post === post && data.uid === uid) {
            console.log("coincide post y uid");
            deletepost = doc.id;
            // console.log(deletepost);
            DeleteData(deletepost);
            DeleteAllComments(deletepost);
          }
        });
      })
      .catch(error => console.log(error));

    // si coincide guarda el doc id y lo muestra para luego borrarlo
  };
  // borra el post que coincide
  const DeleteData = id => {
    firestore()
      .collection("confesiones")
      // siempre va a necesitar un id
      .doc(id)
      .delete()
      .catch(error => console.log(error));
  };
  // borra todos los comentarios de ese post
  const DeleteAllComments = postid => {
    console.log(postid);
    firestore()
      .collection("comentarios")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          // console.log(doc.data());
          const data = doc.data();
          if (data.postID === postid) {
            // console.log(data);
            DeleteComment(data.commentID);
          }
        });
      })
      .catch(error => console.log(error));
  };
  // actualizar informacion del perfil,nickname y descripcion
  const UpdateProfileData = (uid, data) => {
    firestore()
      .collection("users")
      .doc(uid)
      .set(data)
      .catch(error => console.log(error));
    LoginUpdateData(uid);
    UpdatenicknameGlobal(uid, data.nickname);

    // cambiar el nickname en todos los post y comentarios por el nuevo
  };

  // cambiar el nickname en todos los post y comentarios por el nuevo
  const UpdatenicknameGlobal = (uid, newnickname) => {
    firestore()
      .collection("confesiones")
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data();
          const actualdoc = doc.ref.id;
          if (data.uid === uid) {
            firestore()
              .collection("confesiones")
              .doc(actualdoc)
              .set({
                ...data,
                nickname: newnickname
              })
              .catch(error => console.log(error));
          }
        });
      });

    firestore()
      .collection("comentarios")
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data();
          const actualdoc = doc.ref.id;
          if (data.uid === uid) {
            firestore()
              .collection("comentarios")
              .doc(actualdoc)
              .set({
                ...data,
                nickname: newnickname
              })
              .catch(error => console.log(error));
          }
        });
      });
  };
  // envia comentario en un post
  // comment = comentario
  // Nickname = user nicknamenpm
  // post ID = id del post al que pertenece
  // comment ID = su propio ID
  // uid = ID de usuario que lo postea
  const PostComment = (uid, data) => {
    const commentID = firestore()
      .collection("comentarios")
      .doc();
    const newData = {
      comment: data.comment,
      nickname: data.nickname,
      postID: uid,
      commentID: commentID.id,
      uid: data.uid
    };
    commentID.set(newData).catch(error => console.log(error));
  };
  const DeleteComment = id => {
    firestore()
      .collection("comentarios")
      // siempre va a necesitar un id
      .doc(id)
      .delete()
      .catch(error => console.log(error));
  };

  return [
    SetNewUser,
    LoginUpdateData,
    SetPost,
    DeletePost,
    UpdateProfileData,
    PostComment,
    DeleteComment
  ];
};

export default FirestoreActions;
