import { useState, useEffect } from 'react'
import "../src/style/Details.css"
import 'bootstrap-icons/font/bootstrap-icons.css';
import SessionDetail from './SessionDetail';
import { useLocation } from 'react-router-dom';
import Create from './Create.js';

interface Session {
    id: number;
    date: string;
    time: string;
    title: string;
}

export default function Overview() {

    const location = useLocation();

    const create = location.pathname.endsWith("/create");

    const initialSession = location.state?.session || null;

    const [sessions, setSessions] = useState([])
    const [presentSession, setPresentSession] = useState(initialSession);

    function viewSession(session: Session) {
        setPresentSession(session);
    }

    useEffect(() => {
        fetch('http://localhost:3000/sessions')
        .then(res => res.json())
        .then(setSessions)
    }, [])

    function handleGoing(sessionId) {
        fetch(`http://localhost:3000/sessions/${sessionId}/go`, { method: 'POST' })
      .then(res => res.json())
      .then(updated => {
        setSessions(prev => prev.map(s => s.id === updated.id ? updated : s));
        if (presentSession?.id === updated.id) setPresentSession(updated);
      });
    }

    const sessionsByDate: Record<string, Session[]> = {};
    sessions.forEach(session => {
        const dateStr = new Date(session.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        if (!sessionsByDate[dateStr]) sessionsByDate[dateStr] = [];
        sessionsByDate[dateStr].push(session);
    });


    let rightContent;
    if (create) {
        rightContent = <Create/>;
    } else if (presentSession) {
        rightContent = (
            <>
                <SessionDetail {...presentSession} />
                <div className='go-button'>
                    <button onClick={() => handleGoing(presentSession.id)} className='go-button'>I'm going</button>
                </div>
            </>
        )
    } else {
        rightContent = null;
    }

  return (
    
    <div className='layout'>
        {/* Left column */}
        <div className='leftBar'>
            {Object.keys(sessionsByDate)
                .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
                .map(date => (
                    <div key={date} className='left'>
                        <h4>{date}</h4>
                        {sessionsByDate[date].map(session => (
                            <div key={session.id} className='leftColumn' onClick={() => viewSession(session)}>
                                <p>{session.time}</p>
                                <p>{session.title}</p>
                            </div>
                        ))}
                    </div>
                ))}
        </div>

        {/* Right column */}
        <div className='rightBar'>
            {rightContent}
        </div>
    </div>
    
  )
}
