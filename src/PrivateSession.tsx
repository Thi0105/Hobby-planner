import { useState } from 'react'
import '../src/style/PrivateSession.css'
import PrivateCodeCheck from './PrivateCodeCheck'
import EditForm from './EditForm';

interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  capacity: number;
  address: string;
  description: string;
  name: string;
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
            console.log(data)
            setSession(data)
            setRole(data.role)
            } catch (err: any) {
            setError(err.message)
            setSession(null)
        }
    }

    async function handleRemoveGoing(e) {
        e.preventDefault()

        if (!session) return;

        try {
            const res = await fetch(`http://localhost:3000/session/go`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: secretCode }),
            })

            if (!res.ok) {
                const text = await res.text();
                throw new Error('Failed to remove attendee: ' + text)
            }

            let data
            try {
                data = await res.json();
            } catch {
                throw new Error("Server did not return valid JSON.");
            }
            alert(data.message)
            setSession(null);
            setSecretCode('')
        } catch (err) {
            setError(err.message)
        }
    }

    async function handleDeleteSession(e) {
        e.preventDefault()

        if (!session) return;

        try {
            const res = await fetch(`http://localhost:3000/session/${session.id}/manage`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })

            if (!res.ok) {
                const text = await res.text();
                throw new Error('Failed to delete session: ' + text)
            }

            const data = await res.json()
            alert(data.message)
            setSession(null);
            setSecretCode('')
        } catch (err) {
            setError(err.message)
        }
    }

    async function handleRemoveParticipant(name: string) {
        if (!session) return;

        try {
            const res = await fetch(`http://localhost:3000/session/${session.id}/manage/participant`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }), 
            });

            if (!res.ok) throw new Error('Failed to remove participant');

            const updatedSession = await res.json();
            setSession(updatedSession)

        } catch (err: any) {
            alert(err.message);
        }
    }
 
  return (
    <div>
        <PrivateCodeCheck secretCode={secretCode} setSecretCode={setSecretCode} handleSubmit={handleSubmit}/>
        
        {session && (
            editMode ? (
                <EditForm session={session} onSubmit={(updatedSession) => {setEditMode(false); setSession(updatedSession)}} onRemoveParticipant={role === 'creator' ? handleRemoveParticipant : undefined}/>
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
                            <p><strong>People going:</strong> {session.name}</p>
                        </div>
                    </div>
    
                    {role === 'creator' && (
                        <div className='creator-buttons'>
                            <button onClick={() => setEditMode(true)}>Edit</button>
                            <button onClick={handleDeleteSession}>Delete</button>
                        </div>
                    )}
    
                    {role === 'attendee' && (
                        <button onClick={handleRemoveGoing}>Remove</button>
                    )}
                </div>
            )

        )}
    </div>
  )
}
