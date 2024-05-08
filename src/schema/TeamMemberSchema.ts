import z from 'zod'


[
	{
		"_id": "661a01d2ca0af5a0f2f77ee9",
		"name": "test",
		"email": "test1@gmail.com"
	}
]
export const teamMemberSchema = z.object({
  _id:z.string(),
  name:z.string(),
  email:z.string()
})

export type TeamMemberType = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMemberType, 'email'>