import React from 'react'
import '../src/style/Overall.css'
import sessions from './sessions.js'
import SessionTable from './SessionTable.js'
import { useNavigate } from 'react-router-dom'

export default function Overall() {

    const navigate = useNavigate();

    function chosenSession(session) {
        navigate('/overview', {state: {session}})
    }

  return (
    <div className='table'>
        <div className='row-header'>
            <h2>Date</h2>
            <h2>Time</h2>
            <h2>Title</h2>
        </div>

        {sessions.map((session) => (
            <div key={session.id}
                onClick={() => chosenSession(session)}>
            <SessionTable date={session.date} time={session.time} title={session.title}/>
            </div>
        ))}
    </div>
  )
}
