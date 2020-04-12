import { createStore } from "redux";

const stateDefault = {
  userid: "",
  isloged: false,
  usernickname: "",
  description: "",
  likes: 0,
  followers: 0,
  following: 0,
  profilepic:
    "https://firebasestorage.googleapis.com/v0/b/confesiones-44c40.appspot.com/o/images%2Favatar.jpg?alt=media&token=b2fa4e3c-cfbc-46c6-bffb-75f8a7959479"
};

// (previousState,action)=>newState
const reducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "LOG_STATUS":
      return {
        ...state,
        userid: action.payload,
        isloged: action.payload2
      };
    case "UPDATE_DATA":
      return {
        ...state,
        usernickname: action.payload,
        description: action.payload2,
        likes: action.payload3,
        followers: action.payload4,
        following: action.payload5,
        profilepic: action.payload6
      };
    default:
      return state;
  }
};

export default createStore(reducer);
