import React, {useEffect, useState} from "react";
import AppRouter from "components/Router";
import {onAuthStateChanged} from "firebase/auth";
import {authService} from "fbase";

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
      <>
        {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing"}
        <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
      </>
  );
}

export default App;
