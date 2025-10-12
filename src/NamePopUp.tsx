import { useState } from 'react'
import "../src/style/PopUp.css"
import CodePopUp from './CodePopUp'

interface NamePopUpProps {
    onGoing: (name: string, email: string) => Promise<string>
    onClose?: () => void
}

export default function NamePopUp({onGoing, onClose}: NamePopUpProps) {

    const [name, setName] = useState('')
    const [code, setCode] = useState<string | null>(null)
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleOnGoing() {
        if (!name || !email) {
            alert("Enter your name and email");
            return
        }

        setLoading(true)
        try {
            const generatedCode = await onGoing(name, email)
            setCode(generatedCode)
        } catch (err) {
            alert(err)
        } finally {
            setLoading(false)
        }
    }

    if (code) {
        return <CodePopUp code={code} onClose={onClose}/>
    }
    
  return (
      <div className='popup-overlay'>
        <div className='popup-container'>
            <h3>Enter your name</h3>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            <h3>Enter your email</h3>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <div>
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleOnGoing} disabled={loading}>{loading ? "Joining..." : "I'm going"}</button>
            </div>
        </div>
      </div>
  )
}
