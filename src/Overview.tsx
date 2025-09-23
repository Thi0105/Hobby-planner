import React from 'react'
import "./Overview.css"
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Overview() {
  return (
    <div>
        <h1>Join our activities</h1>
        <button>Create</button>
        <div className='layout'>
            {/* Left column */}
            <div className='leftBar'>
                <h2>Title</h2>
                <div className='leftColumn'>
                    <p>5:30</p>
                    <p>Badminton</p>
                </div>
                <div className='leftColumn'>
                    <p>8:00</p>
                    <p>Swimming</p>
                </div>
                <div className='leftColumn'>
                    <p>16:20</p>
                    <p>Shopping</p>
                </div>
            </div>

            {/* Right column */}
            <div className='rightBar'>
                <h2>Badminton</h2>
                <div className='time'>
                    <h3>5:30</h3>
                    <div className='capacity'>
                        <i className='bi bi-person' />
                        <h3>4/6</h3>
                    </div>
                </div>
                <div className='details'>
                    <p>Owner:</p>
                    <p>Description:</p>
                    <p>Address:</p>
                </div>
                <button className='goingButton'>I'm going</button>
            </div>
        </div>
    </div>
  )
}
