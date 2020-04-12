import React from "react";
import Login from "../login/Login";
// Rutas

import Profile from "../profile/Profile";

const PrivateRoutes = [
  { name: "/login", component: () => <Login /> },
  { name: "/profile", component: () => <Profile /> }
];

export default PrivateRoutes;
