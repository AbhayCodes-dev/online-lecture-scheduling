import React, { useState, useEffect } from "react";
import Admin from "./pages/Admin";
import Instructor from "./pages/Instructor";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  if (!user) {
    return (
      <Login
        onLogin={(u) => {
          localStorage.setItem("user", JSON.stringify(u));
          setUser(u);
        }}
      />
    );
  }

  if (user.role === "admin")
    return (
      <Admin
        user={user}
        onLogout={() => {
          localStorage.removeItem("user");
          setUser(null);
        }}
      />
    );

  return (
    <Instructor
      user={user}
      onLogout={() => {
        localStorage.removeItem("user");
        setUser(null);
      }}
    />
  );
}

export default App;
