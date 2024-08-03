import { object, string, number } from "zod"

export const TaskSchema = object({
    id: number(),
    name: string().max(150),
    description: string(),
    status: string(),
    owner: number,
})