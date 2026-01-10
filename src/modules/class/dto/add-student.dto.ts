import {z} from "zod"
export const addStudentSchema=z.object({
    
    studentId: z.string().nonempty()
})

export type addStudentDto=z.infer<typeof addStudentSchema>