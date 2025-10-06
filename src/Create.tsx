import React from 'react'
import { useState } from 'react'
import '../src/style/Create.css'

export default function Create() {

    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [capacity, setCapacity] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');

  return (
    <div>
        <h2>Create my activity</h2>
        <div className='layout-create'>
            <div className='info'>
                <div className='form-group'>
                    <label >Title</label>
                    <input type='text' placeholder='' value={title}/>
                </div>

                <div className='form-group'>
                    <label>Time</label>
                    <input type='text' placeholder='' value={time}/>
                </div>

                <div className='form-group'>
                    <label>Capacity</label>
                    <input type='text' placeholder='' value={capacity}/>
                </div>

                <div className='form-group'>
                    <label>Address</label>
                    <input type='text' placeholder='' value={address}/>
                </div>
            </div>

            <div className='description'>
                <div className='form-group'>
                    <label>Description</label>
                    <input type='text' placeholder='' value={description}/>
                </div>
            </div>
        </div>
        
        <div className="submit-button">
            <button className='go-button'>Create</button>
        </div>
    </div>
  )
}
