import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import '../src/style/ManageSession.css'

interface Session {
  title: string;
  date: string;
  time: string;
  capacity: number;
  address: string;
  description: string;
  name: string;
}

export default function ManageSession() {

    const [session, setSession] = useState<Session | null>(null)
    const [error, setError] = useState('')

    const {id} = useParams()
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')

    const navigate = useNavigate()

    useEffect(() => {
        if (!code) {
            setError("Missing session ID or code")
            return
        }

        fetch(`http://localhost:3000/session/manage?code=${code}`)
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

    

  return (
    <div className='manage-center'>
      <div className='manage'>
        <h2>Private session: {session.title}</h2>
        <div className="manage-session">
          <p><strong>Date:</strong> {session.date}</p>
          <p><strong>Time:</strong> {session.time}</p>
          <p><strong>Capacity:</strong> {session.capacity}</p>
          <p><strong>Address:</strong> {session.address}</p>
          <p><strong>Description:</strong> {session.description}</p>
          <p><strong>Participants:</strong>{session.name}</p>
        </div>
        <button onClick={handleGoing}>I'm going</button>
      </div>

    </div>

  )
}
