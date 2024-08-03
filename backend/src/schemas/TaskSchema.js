import { object, string, number } from "zod"

export const TaskSchema = object({
    id: number(),
    name: string().max(150),
    description: string(),
    status: string(),
    owner: number,
})
// created_at: date(), not required because set inside a controller
// updated_at: date(), not required because set inside a controller
