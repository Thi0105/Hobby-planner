import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import '../src/style/ManageSession.css'

interface ManageSessionProps {
  id: string;
  code: string | null;
}

interface Session {
  title: string;
  date: string;
  time: string;
  capacity: number;
  address: string;
  description: string;
  people: string;
}

export default function ManageSession() {

    const [session, setSession] = useState<Session | null>(null)
    const [error, setError] = useState('')

    const {id} = useParams()
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')

    useEffect(() => {
        if (!id || !code) {
            setError("Missing session ID or code")
            return
        }

        fetch(`http://localhost:3000/sessions/${id}/manage?code=${code}`)
            .then(res => {
                if (!res.ok) throw new Error ("Invalid  Url or session not found!")
                return res.json()
            })
            .then(data => setSession(data))
            .catch(err => setError(err.message))
    },[id, code])

    if (error) return <p>{error}</p>
    if (!session) return <p>Finding session...</p>



  return (
    <div style={{ padding: "2rem" }}>
      <h2>Manage Session: {session.title}</h2>
      <p><strong>Date:</strong> {session.date}</p>
      <p><strong>Time:</strong> {session.time}</p>
      <p><strong>Capacity:</strong> {session.capacity}</p>
      <p><strong>Address:</strong> {session.address}</p>
      <p><strong>Description:</strong> {session.description}</p>
      <p><strong>Participants:</strong></p>
      <div className='participant-list'>
        {
            session.people.split(', ').map((name, index) => (
                <div className='participants' key={index}>
                    {name}
                </div>
            ))
        }
      </div>

      <button>Delete session</button>
    </div>

  )
}
