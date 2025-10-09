import React from 'react'
import { useState } from 'react'
import '../src/style/Create.css'
import ManageCodePopUp from './ManageCodePopUp';

interface FormProps {
    session: SessionType
    onSubmit : (updatedSession: SessionType) => void
}


export default function Create({session, onSubmit}: FormProps) {

    const [title, setTitle] = useState(session?.title || '');
    const [date, setDate] = useState(session?.date || '');
    const [time, setTime] = useState(session?.time || '');
    const [capacity, setCapacity] = useState(session?.capacity || '');
    const [address, setAddress] = useState(session?.address || '');
    const [description, setDescription] = useState(session?.description || '');

    async function handleSubmit(e) {
        e.preventDefault()

        try {
      const res = await fetch(`http://localhost:3000/session/${session.id}/manage`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date, time, capacity, address, description }),
      })

      if (!res.ok) {
        throw new Error('Failed to update session')
      }

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

                <div className="form-actions">
                    <button type="submit">Save</button>
                </div>
            </div>

        </form>

    </div>
  )
}
