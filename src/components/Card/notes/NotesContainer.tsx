import { Note } from '@/schema/TaskSchema'
import NotesCard from './NotesCard'

interface NotesContainerProps {
  notes:Note[]
}
export default function NotesContainer({notes}:NotesContainerProps) {
  return (
    <div className='divide-y divide-gray-100 mt-10 '>
      {notes.length ? (
        <>
          <p className='font-bold text-xl text-slate-600 dark:text-slate-300 my-5'>Notes:</p>
          {notes.map((note)=>(<NotesCard note={note} key={note._id}/>))}
        </>
      ) : (<p className='text-gray-500 text-center pt-3'>No notes</p>)}
    </div>
  )
}
