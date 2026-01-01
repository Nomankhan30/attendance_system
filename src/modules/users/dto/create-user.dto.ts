import {z} from "zod";

export const CreateUserSchema=z.object({
    name:z.string().nonempty(),
    email:z.email().nonempty(),
    password:z.string().min(5).nonempty(),
    role:z.enum(["teacher","student"])

})

export type CreateUserDto=z.infer<typeof CreateUserSchema>