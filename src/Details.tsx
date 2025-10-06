import React from 'react'
import "../src/style/Details.css"
import sessions from './sessions.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import SessionDetail from './SessionDetail';
import { useLocation } from 'react-router-dom';
import Create from './Create.js';

export default function Overview() {

    const location = useLocation();

    const create = location.pathname.endsWith("/create");

    const initialSession = location.state?.session || null;

    const [presentSession, setPresentSession] = React.useState(initialSession);

    function viewSession(session) {
        setPresentSession(session);
    }

    let rightContent;
    if (create) {
        rightContent = <Create/>;
    } else if (presentSession) {
        rightContent = (
            <>
                <SessionDetail {...presentSession} />
                <div className='go-button'>
                    <button className='go-button'>I'm going</button>
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
            <h3>Date</h3>

            {sessions.map((session =>
                <div key={session.id}
                     className='leftColumn' 
                     onClick={() => viewSession(session)}>
                    <p>{session.time}</p>
                    <p>{session.title}</p>
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
