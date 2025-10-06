import React from 'react'
import '../src/style/Overall.css'

export default function SessionTable({ title, date, time }: {title: string, date: string, time: string}) {
  return (
    <div className='row'>
        <div>{date}</div>
        <div>{time}</div>
        <div>{title}</div>
    </div>
  )
}
