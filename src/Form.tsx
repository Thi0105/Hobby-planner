import React from 'react'
import { useState } from 'react'
import '../src/style/Create.css'

interface FormProps {
    session: SessionType
    onSubmit : (updatedSession: SessionType) => void
    onRemoveParticipant?: (name: string) => void 

}


export default function Create({session, onSubmit, onRemoveParticipant}: FormProps) {

    const [title, setTitle] = useState(session?.title || '');
    const [date, setDate] = useState(session?.date || '');
    const [time, setTime] = useState(session?.time || '');
    const [capacity, setCapacity] = useState(session?.capacity || '');
    const [address, setAddress] = useState(session?.address || '');
    const [description, setDescription] = useState(session?.description || '');

    const name = session?.name || '';
    
    async function handleSubmit(e) {
        e.preventDefault()

        if (!session) {
        alert('No session selected.');
        return;
    }

        try {
      const res = await fetch(`http://localhost:3000/session/${session.id}/manage`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date, time, capacity, address, description }),
      })

        if (!res.ok) throw new Error('Failed to update session')

        const updatedSession = await res.json()
        onSubmit(updatedSession) 

            } catch (err: any) {
            alert(err.message)
        }
    }
    
  return (
    <div>
        <h2>Edit the session</h2>
        <form className='layout-create' onSubmit={handleSubmit}>
            <div className='info'>
                <div className='form-group'>
                    <label >Title</label>
                    <input type='text' placeholder='' value={title} onChange={e => setTitle(e.target.value)} required/>
                </div>

                <div className='form-group'>
                    <label>Date</label>
                    <input type='date' placeholder='' value={date} onChange={e => setDate(e.target.value)} required/>
                </div>
                
                <div className='form-group'>
                    <label>Time</label>
                    <input type='time' placeholder='' value={time} onChange={e => setTime(e.target.value)} required/>
                </div>

                <div className='form-group'>
                    <label>Capacity</label>
                    <input type='number' placeholder='' value={capacity} onChange={e => setCapacity(e.target.value)} required/>
                </div>

                <div className='form-group'>
                    <label>Address</label>
                    <input type='text' placeholder='' value={address} onChange={e => setAddress(e.target.value)} required/>
                </div>
            </div>

            <div className='description'>
                <div className='form-group'>
                    <label>Description</label>
                    <textarea placeholder='' value={description} onChange={e => setDescription(e.target.value)} required rows={4}/>
                </div>

                {onRemoveParticipant && (
                        <div className="manage-participants">
                            <h3>Manage Participants</h3>
                            <ul>
                                {name.split(',').map((person) => (
                                    <li key={person}>
                                        {person} 
                                        <button type="button" onClick={() => onRemoveParticipant(person)}>Remove</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                <div className="form-actions">
                    <button type="submit">Save</button>
                </div>
            </div>

        </form>

    </div>
  )
}
