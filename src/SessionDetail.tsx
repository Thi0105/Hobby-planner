import React from 'react'
import '../src/style/Details.css'

export default function SessionDetail({title, date, time, capacity, address, description, attendance, people }: {title: string, date: string, time: string, capacity: number, address: string, description: string, attendance: number, people: string}) {
  return (
    <div>
      <h2>{title}</h2>
      <div className='time'>
        <h3>{time}</h3>
        <div className='capacity'>
          <i className='bi bi-person' />
          <h3>{attendance}/{capacity}</h3>
        </div>
      </div>  

      <div className='details'>
        <p>Date: {date}</p>
        <p>Description: {description}</p>
        <p>Address: {address}</p>
        <p>People going: {people}</p>
      </div>      
    </div>
  )
}
