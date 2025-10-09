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
  people: string;
}

export default function ManageSession() {

    const [session, setSession] = useState<Session | null>(null)
    const [error, setError] = useState('')

    const {id} = useParams()
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')

    const navigate = useNavigate()

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

    async function handleDeleteSession() {
      try {
        const res = await fetch(`http://localhost:3000/session/${id}/manage?code=${code}`, {
          method: 'DELETE',
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Failed to delete session")
        alert(data.message)
        navigate('/')

      } catch (err) {
        alert(err.message)
      }
    }

  return (
    <div className='manage-center'>
      <div className='manage'>
        <h2>Manage Session: {session.title}</h2>
        <div className="manage-session">
          <p><strong>Date:</strong> {session.date}</p>
          <p><strong>Time:</strong> {session.time}</p>
          <p><strong>Capacity:</strong> {session.capacity}</p>
          <p><strong>Address:</strong> {session.address}</p>
          <p><strong>Description:</strong> {session.description}</p>
          <p><strong>Participants:</strong></p>
          <div className='participant-list'>
            {
                session.people.split(', ').map((name, index) => (
                    <div className='participant' key={index}>
                        {name}
                    </div>
                ))
            }
          </div>
        </div>
        <button onClick={handleDeleteSession}>Delete session</button>
      </div>

    </div>

  )
}
