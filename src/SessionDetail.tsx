import '../src/style/Details.css'
import type { Attendee } from './interface';

interface SessionDetailProps {
  title: string;
  date: string;
  time: string;
  capacity: number;
  address: string;
  description: string;
  attendance: number;
  attendees: Attendee[]; 
}

export default function SessionDetail({title, date, time, capacity, address, description, attendance, attendees }: SessionDetailProps) {
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
        <p><strong>Date: </strong>{date}</p>
        <p><strong>Description: </strong>{description}</p>
        <p><strong>Address: </strong>{address}</p>
        <p><strong>People going: </strong>{attendees ? attendees.map(a => a.name).join(', '): 'No one yet'}</p>
      </div>      
    </div>
  )
}
