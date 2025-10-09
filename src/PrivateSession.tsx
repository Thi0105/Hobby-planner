import { useState } from 'react'
import '../src/style/PrivateSession.css'
import PrivateCodeCheck from './PrivateCodeCheck'
import Form from './Form';

interface Session {
  title: string;
  date: string;
  time: string;
  capacity: number;
  address: string;
  description: string;
  people: string;
}

export default function PrivateSession() {

    const [session, setSession] = useState<Session | null>(null)
    const [secretCode, setSecretCode] = useState('')
    const [error, setError] = useState('')
    const [role, setRole] = useState<string | null>(null)
    const [editMode, setEditMode] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const res = await fetch('http://localhost:3000/session/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: secretCode }),
            })

            if (!res.ok) {
                throw new Error('Invalid code or session not found')
            }

            const data = await res.json()
            setSession(data)
            setRole(data.role)
            } catch (err: any) {
            setError(err.message)
            setSession(null)
        }
    }

    async function handleRemove(e) {
        e.preventDefault()

        if (!session) return;

        try {
            const res = await fetch(`http://localhost:3000/session/go`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: secretCode }),
            })

            if (!res.ok) {
                throw new Error('Failed to remove attendee')
            }

            const data = await res.json()
            alert(data.message)
            setSession(null);
            setSecretCode('')
        } catch (err) {
            setError(err.message)
        }
    }
 
  return (
    <div>
        <PrivateCodeCheck secretCode={secretCode} setSecretCode={setSecretCode} handleSubmit={handleSubmit}/>
        {session && (
            editMode ? (
                <Form session={session} onSubmit={(updatedSession) => {setEditMode(false); setSession(updatedSession)}}/>
            ) : (
                <div className='private-center'>
                    <div className='private'>
                        <h2>{session.title}</h2>
                        <div className="private-session">
                            <p><strong>Date:</strong> {session.date}</p>
                            <p><strong>Time:</strong> {session.time}</p>
                            <p><strong>Capacity:</strong> {session.capacity}</p>
                            <p><strong>Address:</strong> {session.address}</p>
                            <p><strong>Description:</strong> {session.description}</p>
                            <p><strong>People going:</strong> {session.people}</p>
                        </div>
                    </div>
    
                    {role === 'creator' && (
                        <div>
                            <button onClick={() => setEditMode(true)}>Edit</button>
                            <button onClick={handleRemove}>Remove</button>
                        </div>
                    )}
    
                    {role === 'attendee' && (
                        <button onClick={handleRemove}>Remove</button>
                    )}
                </div>
            )

        )}
    </div>
  )
}
