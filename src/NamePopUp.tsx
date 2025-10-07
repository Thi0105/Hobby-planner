import { useState } from 'react'
import "../src/style/PopUp.css"
import CodePopUp from './CodePopUp'

interface NamePopUpProps {
    onGoing: (name: string) => void
    onClose?: () => void
}

export default function NamePopUp({onGoing, onClose}: NamePopUpProps) {

    const [name, setName] = useState('')
    const [code, setCode] = useState(null)
    const [loading, setLoading] = useState(false)

    async function handleOnGoing() {
        if (!name) {
            alert("Enter your name");
        }

        setLoading(true)
        try {
            const generatedCode = await onGoing(name)
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
            <div>
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleOnGoing}>I'm going</button>
            </div>
        </div>
      </div>
  )
}
