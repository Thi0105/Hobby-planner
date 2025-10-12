import { useState } from 'react'
import "../src/style/PopUp.css"

interface ManageCodePopUpProps {
    manageCode: string
    manageUrl: string
    onClose?: () => void
}

export default function ManageCodePopUp({manageCode, manageUrl, onClose}: ManageCodePopUpProps) {
  return (
      <div className='popup-overlay'>
        <div className='popup-container'>
            <h3>Session created!</h3>
            <p>This is your secret code:</p>
            <p><strong>{manageCode}</strong></p>
            <p>Send this link to invite your friends: </p>
            <a>{manageUrl}</a>
            <div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
      </div>
  )
}
