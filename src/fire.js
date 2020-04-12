import firebase from "firebase";
const config = {
  // firebase01
  /*   apiKey: "AIzaSyDX9gpkGpPgusZU7HIchXg-nROI7AcepNw",
  authDomain: "fir-01-a9c0c.firebaseapp.com",
  databaseURL: "https://fir-01-a9c0c.firebaseio.com",
  projectId: "fir-01-a9c0c",
  storageBucket: "fir-01-a9c0c.appspot.com",
  messagingSenderId: "353487722813",
  appId: "1:353487722813:web:1b7f2bdf55bca98ecc4d54",
  measurementId: "G-4LVJRG5BS2" */
  //confesiones anonimas
  apiKey: "AIzaSyCL3jeXt5zTk0N0wpqnZftPkAB4qvVZ188",
  authDomain: "confesiones-44c40.firebaseapp.com",
  databaseURL: "https://confesiones-44c40.firebaseio.com",
  projectId: "confesiones-44c40",
  storageBucket: "confesiones-44c40.appspot.com",
  messagingSenderId: "992944850642",
  appId: "1:992944850642:web:84d0d7b3d5004c13ef0f0b",
  measurementId: "G-SM6RDF61BK"
};
const fire = firebase.initializeApp(config);
export default fire;
