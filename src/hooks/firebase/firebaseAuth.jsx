// import { useState } from "react";
import "firebase/auth";
import { useFirebaseApp } from "reactfire";
// para redux actions
import Actions from "../../components/redux/Actions";
// para la redireccion forzada al home
import { useHistory } from "react-router-dom";
// para crear usuario nuevo en firestore
import FirestoreActions from "./firestoreActions";

const FirebaseAuth = () => {
  const history = useHistory();
  // actions de redux
  const [logStatus] = Actions();
  // actions de firestore
  const [SetNewUser, LoginUpdateData] = FirestoreActions();

  // user id unica desde firebase.auth().currentUser.uid;
  let userID;
  // hook de firebase
  const firebase = useFirebaseApp();

  // login auth firebase
  const login = async (email, password) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        userID = firebase.auth().currentUser.uid;
        // is loged para permitir navegar a vistas privadas
        logStatus(userID, true);
        // console.log(data);

        // actualiza el state desde info de firestore al logear
        LoginUpdateData(userID);

        alert("Se ha logeado con exito");
        history.push("/home");
      })
      .catch(err => {
        // Handle Errors here.
        let errorCode = err.code;
        let errorMessage = err.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
          // fallo con el correo, parece que se reinicia el campo
        }
      });
  };
  // nickname para firestore
  const singup = async (email, password, repassword, nickname) => {
    if (password === repassword) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(data => {
          userID = firebase.auth().currentUser.uid;
          logStatus(userID, true);
          // console.log(userID);
          SetNewUser(userID, nickname);
          alert("Te has registrado con exito");
          history.push("/home");
        })
        .catch(err => {
          // Handle Errors here.
          let errorCode = err.code;
          let errorMessage = err.message;
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password.");
          } else {
            alert(errorMessage);
          }
        });
    } else {
      alert("the passwords must be the same");
    }
  };
  const logout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(data => {
        userID = null;
        logStatus("", false);
        alert("Se ha deslogeado con exito");
        history.push("/home");
      })
      .catch(err => {
        alert(err);
      });
  };

  // return de los metodos de login, sing up y log out
  return [login, singup, logout];
};

export default FirebaseAuth;
