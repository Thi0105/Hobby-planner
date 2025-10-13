import { useState } from 'react'
import '../src/style/Create.css'
import ManageCodePopUp from './ManageCodePopUp';

const API_URL = import.meta.env.VITE_API_URL

export default function Create() {

    const [type, setType] = useState('Public')
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [capacity, setCapacity] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [manageLink, setManageLink] = useState(null)
    const [manageCode, setManageCode] = useState('')

    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e: any) {
        e.preventDefault();

        if (submitting) return; 
        setSubmitting(true);

        const newSession = { email, type, title, date, time, capacity, description, address };

        try {
            const res = await fetch(`${API_URL}/sessions/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSession)
            })

            const data = await res.json()
            
            setManageLink(data.manageUrl)
            setManageCode(data.manageCode)

            setTitle('');
            setDate('');
            setTime('');
            setCapacity('');
            setAddress('');
            setDescription('');
            setEmail('');
        

        } catch(err) {
            console.error('Error creating session:', err);
        } finally {
            setSubmitting(false)
        }
    }

    if (manageLink) {
        return <ManageCodePopUp manageCode={manageCode} manageUrl={manageLink} onClose={() => setManageLink(null)}/>
    }


  return (
    <div>
        <h2>Create my activity</h2>
        <form className='layout-create'>
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
            </div>

            <div className='description'>
                <div className='form-group'>
                    <label>Capacity</label>
                    <input type='text' placeholder='' value={capacity} onChange={e => setCapacity(e.target.value)} required/>
                </div>

                <div className='form-group'>
                    <label>Address</label>
                    <input type='text' placeholder='' value={address} onChange={e => setAddress(e.target.value)} required/>
                </div>

                <div className='form-group'>
                    <label>Description</label>
                    <textarea placeholder='' value={description} onChange={e => setDescription(e.target.value)} required rows={4}/>
                </div>

                <div className='form-group'>
                    <label >Email</label>
                    <input type='email' placeholder='' value={email} onChange={e => setEmail(e.target.value)} required/>
                </div>

                <div className="submit-button">
                    <button onClick={handleSubmit} className='go-button' disabled={submitting}>{submitting ? 'Creating...' : 'Create'}</button>
                </div>
            </div>
        </form>

    </div>
  )
}
