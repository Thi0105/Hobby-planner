import { useState } from 'react'
import "../src/style/PopUp.css"

interface CodePopUpProps {
    code: string
    onClose?: () => void
}

export default function CodePopUp({code, onClose}: CodePopUpProps) {
  return (
      <div className='popup-overlay'>
        <div className='popup-container'>
            <h3>Thank you for joining!</h3>
            <p>Your attendance code is: </p>
            <code>{code}</code>
            <div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
      </div>
  )
}
