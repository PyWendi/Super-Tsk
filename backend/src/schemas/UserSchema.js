import { object, boolean, string } from "zod"

export const UserSchema = object({
    name: string().max(150),
    lastname: string().max(100),
    email: string().email(),
    password: string().min(6),
    isAdmin: boolean().default(false)
})


export const AdminSchema = object({
    name: string().max(150),
    lastname: string().max(100),
    email: string().email(),
    password: string().min(6),
    isAdmin: boolean().default(true)
})