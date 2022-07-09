import React, { useEffect, useState } from 'react'
import AppRouter from 'components/Router'
import { onAuthStateChanged } from 'firebase/auth'
import { authService } from 'fbase'

function App() {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState(null)
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj(user)
      }
      setInit(true)
    })
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}/> : 'Initializing'}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  )
}

export default App
