import '../src/style/Overall.css'

export default function SessionTable({ title, date, time }: {title: string, date: string, time: string}) {
  return (
    <>
        <td>{date}</td>
        <td>{time}</td>
        <td>{title}</td>
    </>
  )
}
