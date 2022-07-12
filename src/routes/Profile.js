import React, { useEffect, useState } from 'react'
import { authService, dbService } from 'fbase'
import { useHistory } from 'react-router-dom'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory()
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  const onLogOutClick = async () => {
    await authService.signOut()
    history.push('/')
  }
  const getMyNweets = async () => {
    const nweetsRef = collection(dbService, 'nweets')
    const q = query(
      nweetsRef,
      where('creatorId', '==', userObj.uid),
      orderBy('createdAt', 'desc'),
    )
    const nweets = await getDocs(q)
    nweets.forEach((doc) => {
      console.log(doc.data())
    })
  }
  useEffect(() => {
    getMyNweets()
  }, [])

  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setNewDisplayName(value)
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
      })
      refreshUser()
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}

export default Profile
