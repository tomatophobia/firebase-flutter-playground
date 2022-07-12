import React from 'react'
import {
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { authService } from 'fbase'
import AuthForm from "components/AuthForm";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event

    let provider
    if (name === 'google') {
      provider = new GoogleAuthProvider()
    }

    const data = await signInWithPopup(authService, provider)
    console.log(data)
  }

  return (
    <div>
      <AuthForm/>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
      </div>
    </div>
  )
}
export default Auth
