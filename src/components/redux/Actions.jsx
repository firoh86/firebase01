import { useDispatch } from "react-redux";

const Actions = () => {
  const dispatch = useDispatch();
  // actualiza el user ID y el log estatus
  const logStatus = (userID, logState) => {
    return dispatch({
      type: "LOG_STATUS",
      payload: userID,
      payload2: logState
    });
  };
  // Actualiza el state para completar la info de perfil con firestore
  const logData = newData => {
    return dispatch({
      type: "UPDATE_DATA",
      payload: newData.nickname,
      payload2: newData.description,
      payload3: newData.likes,
      payload4: newData.followers,
      payload5: newData.following,
      payload6: newData.profilepic
    });
  };
  return [logStatus, logData];
};

export default Actions;
