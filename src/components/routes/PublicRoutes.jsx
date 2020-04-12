import React from "react";

// Rutas
import Home from "../home/Home";
import About from "../about/About";
import Contact from "../contact/Contact";
import Login from "../login/Login";

const PublicRoutes = [
  { name: "/home", component: () => <Home /> },
  { name: "/about", component: () => <About /> },
  { name: "/contact", component: () => <Contact /> },
  { name: "/login", component: () => <Login /> },
  { name: "/*", component: () => <Home /> }
];

export default PublicRoutes;
