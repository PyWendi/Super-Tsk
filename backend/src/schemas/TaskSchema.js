import { object, string, date, number } from "zod"

export const TaskSchema = object({
    id: number(),
    name: string().max(150),
    description: string(),
    status: string(),
    owner: number,
    created_at: date(),
    updated_at: date(),
})
