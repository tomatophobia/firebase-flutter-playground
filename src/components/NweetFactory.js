import React, {useState} from 'react'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { dbService, storageService } from 'fbase'
import { v4 as uuidv4 } from 'uuid'
import { addDoc, collection } from 'firebase/firestore'

const NweetFactory = ({userObj}) => {
  const [nweet, setNweet] = useState('')
  const [attachment, setAttachment] = useState(null)
  const onSubmit = async (event) => {
    event.preventDefault()
    let attachmentUrl = ''
    if (attachment !== null) {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`)
      await uploadString(attachmentRef, attachment, 'data_url')
      attachmentUrl = await getDownloadURL(attachmentRef)
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    }
    await addDoc(collection(dbService, 'nweets'), nweetObj)
    setNweet('')
    setAttachment(null)
  }
  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setNweet(value)
  }
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event
    const theFile = files[0]
    const reader = new FileReader()
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(theFile)
  }
  const onClearAttachmentClick = () => setAttachment(null)

  return (
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="nweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachmentClick}>Clear</button>
        </div>
      )}
    </form>
  )
}

export default NweetFactory
