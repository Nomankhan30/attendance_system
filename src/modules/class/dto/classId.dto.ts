import {z} from "zod"
export const classIdSchema=z.object({
    //property name should be same as defined in @Post().
    classId:z.string().min(1)
})

export type classIdDto=z.infer<typeof classIdSchema>