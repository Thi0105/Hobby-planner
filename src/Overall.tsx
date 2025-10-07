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
            .then(data => setSessions(data))
            .catch(err => console.error('Error fetching sessions: ', err))
    }, [])

  return (
    <div className='table'>
        <table className='row-header'>
            <head>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Title</th>
                </tr>
            </head>
            
            <body>
                {sessions.map((session) => (
                    <div key={session.id}
                        onClick={() => chosenSession(session)}>
                    <SessionTable date={session.date} time={session.time} title={session.title}/>
                    </div>
                ))}
            </body>
        </table>

    </div>
  )
}
