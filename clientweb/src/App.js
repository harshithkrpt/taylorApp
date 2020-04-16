import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { setAccessToken } from "./context/accessToken";
import { useAuthValue } from "./context/AuthContext";
const App = () => {
  const [loading, setLoading] = useState(false);
  const { setIsLogin } = useAuthValue();
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/refresh_token", {
      method: "POST",
      credentials: "include",
    })
      .then((x) => x.json())
      .then((y) => {
        setLoading(false);
        // For My UI
        if (y.ok) {
          setIsLogin(true);
        }

        // For Apollo
        setAccessToken(y.accessToken.token);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [setIsLogin]);

  if (loading) {
    return <div>loading...</div>;
  }

  return <Routes />;
};

export default App;
