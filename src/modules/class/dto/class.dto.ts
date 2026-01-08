import {z} from "zod"
export const classSchema=z.object({
    className:z.string()
}) 

export type classDto=z.infer<typeof classSchema>