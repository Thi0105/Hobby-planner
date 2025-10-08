import { useState } from 'react'
import '../src/style/PrivateSession.css'

interface PrivateCodeCheckProps {
  secretCode: string;
  setSecretCode: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function PrivateSession({secretCode, setSecretCode, handleSubmit}: PrivateCodeCheckProps) {

  return (
    <div>
        <form className='layout-private' onSubmit={handleSubmit}>
            <div className='data'>
                <div className='form'>
                        <label>Secret code</label>
                        <input type='text' placeholder='' value={secretCode} onChange={e => setSecretCode(e.target.value)} required/>
                </div>
            <button type="submit">Send</button>
            </div>
        </form>
    </div>
  )
}
