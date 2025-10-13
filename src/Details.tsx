import { useState, useEffect } from 'react'
import "../src/style/Details.css"
import 'bootstrap-icons/font/bootstrap-icons.css';
import SessionDetail from './SessionDetail';
import { useLocation } from 'react-router-dom';
import Create from './Create.js';
import NamePopUp from './NamePopUp.js';
import type { Session } from './interface.js';

const API_URL = import.meta.env.VITE_API_URL

export default function Overview() {

    const location = useLocation();
    const [showPopUp, setShowPopUp] = useState(false);
    const create = location.pathname.endsWith("/create");

    const initialSession = location.state as Session || null;

    const [sessions, setSessions] = useState<Session[]>([])
    const [presentSession, setPresentSession] = useState<Session | null>(initialSession);

    let popupComponent = null;
    if (showPopUp) {
        popupComponent = (
            <NamePopUp
                onGoing={(name: string, email: string) => presentSession ? handleGoing(presentSession.id, name, email) : Promise.resolve("")}
                onClose={() => setShowPopUp(false)}
            />
        )
    }

    function viewSession(session: Session) {
        setPresentSession(session);
    }



    useEffect(() => {
        fetch(`${API_URL}/sessions`)
        .then(res => res.json())
        .then(data => {
            setSessions(data.sessions);
            if (!presentSession) {
                if (initialSession) {
                    setPresentSession(initialSession);
                } else if (data.sessions.length > 0) {
                    setPresentSession(data.sessions[0]);
                }
            }
        });
    }, []);


    function handleGoing(sessionId: number, name: string, email: string): Promise<string> {
        return fetch(`${API_URL}/sessions/${sessionId}/go`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
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
                <SessionDetail
                    {...presentSession}
                    capacity={presentSession.capacity ?? 0}
                    attendance={presentSession.attendance ?? 0}
                    attendees={presentSession.attendees ?? []}
                />
                {((presentSession.attendance ?? 0) < (presentSession.capacity ?? 0)) && (
                    <div className='go-button'>
                        <button onClick={() => setShowPopUp(true)} className='go-button'>Register</button>
                    </div>
                )}
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
