import z from 'zod';

const _id = z.string();
const content = z.string();
const createdBy = z.object({
  _id:z.string(),
  name:z.string(),
  email:z.string()
});
const task = z.string()

const noteSchema = z.object({
  _id,
  content,
  createdBy,
  task,
  createdAt:z.string()
});

export type NoteType = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<NoteType, 'content'>;
export type NotesType = NoteType[]