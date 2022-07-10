import React, { useState } from 'react'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import {deleteObject, ref} from "firebase/storage";
import {dbService, storageService} from 'fbase'

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  const [newNweet, setNewNweet] = useState(nweetObj.text)

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?')
    if (ok) {
      await deleteDoc(doc(dbService, 'nweets', nweetObj.id))
      if (nweetObj.attachmentUrl !== "") {
        await deleteObject(ref(storageService, nweetObj.attachmentUrl))
      }
    }
  }

  const toggleEditing = () => setEditing((prev) => !prev)
  const onChange = (event) => {
    event.preventDefault()
    const {
      target: { value },
    } = event
    setNewNweet(value)
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    await updateDoc(doc(dbService, 'nweets', nweetObj.id), {
      text: newNweet,
    })
    setEditing(false)
  }

  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input value={newNweet} onChange={onChange} required />
                <input type="submit" value="Update Nweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Nweet
