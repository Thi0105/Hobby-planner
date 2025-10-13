
export interface Attendee {
    id?: number
    name: string; 
    email: string
}

export interface Session {
    type: string;
    name: string;
    description: string;
    address: string;
    id: number
    date: string
    time: string
    title: string
    attendees?: Attendee[]
    attendance?: number
    capacity?: number
    code?: string
}

export interface LocationState {
  session?: Session;
}

export interface NamePopUpProps {
  onGoing: (name: string, email: string) => void;
  onClose: () => void;
}

export interface SessionDetailProps extends Session {
  attendees: Attendee[];
}