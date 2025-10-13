import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import '../src/style/ManageSession.css'
import NamePopUp from './NamePopUp'
import type { Session } from './interface'

const API_URL = import.meta.env.VITE_API_URL


export default function ManageSession() {

    const [session, setSession] = useState<Session | null>(null)
    const [error, setError] = useState('')
    const [showPopUp, setShowPopUp] = useState(false);

    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')

    const navigate = useNavigate()

    useEffect(() => {
        if (!code) {
            setError("Missing session ID or code")
            return
        }

        fetch(`${API_URL}/session/manage?code=${code}`)
            .then(res => {
                if (!res.ok) throw new Error ("Invalid  Url or session not found!")
                return res.json()
            })
            .then(data => {
              if (!data) {
                setError("Session not found")
                return
              }
              setSession(data.session)
            })
            .catch(err => setError(err.message))
        }, [code])

    if (error) return <p>{error}</p>
    if (!session) return <p>Finding session...</p>

    let popupComponent = null;
        if (showPopUp) {
            popupComponent = (<NamePopUp onGoing={(name: string, email: string) => handleGoing(session.id, name, email)} onClose={() => {setShowPopUp(false); navigate('/')}}/>)
        }
    
    async function handleGoing(sessionId: number, name: string, email: string) {
      try {
        const res = await fetch(`${API_URL}/sessions/${sessionId}/go`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Failed to join session")
        console.log("Generated code: ", data.code)
        return data.code
      } catch (err: any) {
          alert(err.message)
      }
    }

  return (
    <div className='manage-center'>
      <div className='manage'>
        <h2>{session.title}</h2>
        <div className="manage-session">
          <p><strong>Type: {session.type}</strong></p>
          <p><strong>Date:</strong> {session.date}</p>
          <p><strong>Time:</strong> {session.time}</p>
          <p><strong>Capacity:</strong> {session.capacity}</p>
          <p><strong>Address:</strong> {session.address}</p>
          <p><strong>Description:</strong> {session.description}</p>
          <p><strong>Participants:</strong>{session.name}</p>
        </div>
        <button onClick={() => setShowPopUp(true)}>I'm going</button>
        {showPopUp && (
          <NamePopUp onGoing={(name: string, email: string) => handleGoing(session.id, name, email)} onClose={() => {setShowPopUp(false); navigate('/')}}/>
      )}
      </div>

    </div>

  )
}
