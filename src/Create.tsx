import React from 'react'
import { useState } from 'react'
import '../src/style/Create.css'
import ManageCodePopUp from './ManageCodePopUp';

export default function Create() {

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [capacity, setCapacity] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [manageLink, setManageLink] = useState(null)
    const [manageCode, setManageCode] = useState('')

    function handleSubmit(e) {
        e.preventDefault();

        const newSession = { title, date, time, capacity, description, address };

        fetch('http://localhost:3000/sessions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSession)
        })
        .then(res => res.json())
        .then(data => {
            console.log('Created session:', data);
            setManageLink(data.manage_url)
            setManageCode(data.manage_code)
            // Reset form
            setTitle('');
            setDate('');
            setTime('');
            setCapacity('');
            setAddress('');
            setDescription('');
        })
        .catch(err => console.error('Error creating session:', err));
    }

    if(manageLink) {
        return <ManageCodePopUp manageCode={manageCode} manageUrl={manageLink} onClose={() => setManageLink(null)}/>
    }


  return (
    <div>
        <h2>Create my activity</h2>
        <form className='layout-create'>
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

                <div className="submit-button">
                    <button onClick={handleSubmit} className='go-button'>Create</button>
                </div>
            </div>
        </form>

    </div>
  )
}
