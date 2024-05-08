import NotesContainer from '@/components/Card/notes/NotesContainer'
import AddNoteForm from '@/components/form/note/AddNoteForm'
import { Note } from '@/schema/TaskSchema'

interface NotePanelProps {
  notes:Note[]
}
export default function NotePanel({notes}:NotePanelProps) {
  return (
    <>
      <AddNoteForm/>
      <NotesContainer notes={notes}/>
    </>
  )
}
