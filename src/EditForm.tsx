import { useState } from 'react'
import '../src/style/Create.css'
import type {Session} from './interface'

const API_URL = import.meta.env.VITE_API_URL

interface FormProps {
    session: Session
    onSubmit : (updatedSession: Session) => void
    onRemoveParticipant?: (name: string) => void 

}


export default function Create({session, onSubmit, onRemoveParticipant}: FormProps) {

    const [type, setType] = useState('Public')
    const [title, setTitle] = useState(session?.title || '');
    const [date, setDate] = useState(session?.date || '');
    const [time, setTime] = useState(session?.time || '');
    const [capacity, setCapacity] = useState(session?.capacity || '');
    const [address, setAddress] = useState(session?.address || '');
    const [description, setDescription] = useState(session?.description || '');
    const [participants, setParticipants] = useState<string[]>((session.name || '').split(', ').map(p => p.trim()).filter(Boolean));



    const handleRemove = async (person: string) => {

        try {
            if (onRemoveParticipant) await onRemoveParticipant(person);
            setParticipants(prev => prev.filter(p => p !== person));
        } catch (err: any) {
            alert(err.message);
        }
    };

    async function handleSubmit(e: any) {
        e.preventDefault()

        if (!session) {
        alert('No session selected.');
        return;
    }

        try {
      const res = await fetch(`${API_URL}/session/${session.id}/manage`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, title, date, time, capacity, address, description }),
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

                <div className='horizontal-group'>
                    <label htmlFor='sessionType'>Type of session:</label>
                    <select className='form-select' value={type} onChange={e => setType(e.target.value)}>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>

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
                    <input type='text' placeholder='' value={capacity} onChange={e => setCapacity(e.target.value)} required/>
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
                            <div className="participant-list">
                                {participants.length > 0 ? (
                                    participants.map(person => (
                                        <div 
                                            key={person} 
                                            className='participant-name' 
                                            onClick={() => {
                                                if (!confirm(`Remove ${person}?`)) return;
                                                handleRemove(person); 
                                            }}
                                        >
                                            {person}
                                        </div>
                                    ))
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                    )
                }

                <div className="form-actions">
                    <button type="submit">Save</button>
                </div>
            </div>

        </form>

    </div>
  )
}
