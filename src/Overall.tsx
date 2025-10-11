import { useState, useEffect } from 'react'
import '../src/style/Overall.css'
import SessionTable from './SessionTable.js'
import { useNavigate } from 'react-router-dom'

export default function Overall() {

    const [sessions, setSessions] = useState([])
    const navigate = useNavigate();

    function chosenSession(session) {
        navigate('/overview', {state: {session}})
    }

    useEffect(() => {
        fetch('http://localhost:3000/sessions')
            .then(res => res.json())
            .then(data => setSessions(data.sessions))
            .catch(err => console.error('Error fetching sessions: ', err))
    }, [])

  return (
    <div className='table'>
        <table className='row-header'>
            <thead>
                <tr className='row'>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Title</th>
                </tr>
            </thead>

            <tbody>
                {sessions.map((session) => (
                    <tr key={session.id}
                        onClick={() => chosenSession(session)}
                        className='row'>
                    <SessionTable date={session.date} time={session.time} title={session.title}/>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
