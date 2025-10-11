import { useState, useEffect } from 'react'
import "../src/style/Details.css"
import 'bootstrap-icons/font/bootstrap-icons.css';
import SessionDetail from './SessionDetail';
import { useLocation } from 'react-router-dom';
import Create from './Create.js';
import NamePopUp from './NamePopUp.js';

interface Session {
    id: number;
    date: string;
    time: string;
    title: string;
}

export default function Overview() {

    const location = useLocation();

    const create = location.pathname.endsWith("/create");

    const [showPopUp, setShowPopUp] = useState(false);

    const initialSession = location.state?.session || null;

    const [sessions, setSessions] = useState([])
    const [presentSession, setPresentSession] = useState(initialSession);

    let popupComponent = null;
    if (showPopUp) {
        popupComponent = (<NamePopUp onGoing={(name: string) => handleGoing(presentSession.id, name)} onClose={() => setShowPopUp(false)} code={presentSession?.code}/>)
    }

    function viewSession(session: Session) {
        setPresentSession(session);
    }

    useEffect(() => {
        fetch('http://localhost:3000/sessions')
        .then(res => res.json())
        .then(data => setSessions(data.sessions))
    }, [])

    function handleGoing(sessionId: number, name: string): Promise<string> {
        return fetch(`http://localhost:3000/sessions/${sessionId}/go`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        })
        .then(res => res.json())
        .then(updated => {
            setSessions(prev => 
                prev.map(s => s.id === updated.id ? {...s, ...updated}: s));
            if (presentSession?.id === updated.id) setPresentSession(prev => ({...prev, ...updated}));
            console.log("Generated code: ", updated.code)
            return updated.code
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
                <SessionDetail {...presentSession} attendees={presentSession.attendees} />
                <div className='go-button'>
                    <button onClick={() => setShowPopUp(true)} className='go-button'>Register</button>
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
            {popupComponent}
        </div>
    </div>
    
  )
}
