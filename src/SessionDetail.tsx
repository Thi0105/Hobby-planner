import React from 'react'
import '../src/style/Details.css'

export default function SessionDetail({ id, title, date, time, capacity, address, description }: {id: number, title: string, date: string, time: string, capacity: number, address: string, description: string}) {
  return (
    <div>
      <h2>{title}</h2>
      <div className='time'>
        <h3>{time}</h3>
        <div className='capacity'>
          <i className='bi bi-person' />
          <h3>{capacity}</h3>
        </div>
      </div>  

      <div className='details'>
        <p>Date: {date}</p>
        <p>Description: {description}</p>
        <p>Address: {address}</p>
      </div>      
    </div>
  )
}
