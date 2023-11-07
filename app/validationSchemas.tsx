import { z } from "zod";

export const todoItemSchema = z.object({
	todo_text: z.string().min(1, "A description for the todo is required."),
	priority: z.number(),
	project_id: z.string(),
	due_date: z.date().nullable(),
	completed: z.date().nullable(),
});

export const projectSchema = z.object({
	project_name: z.string().min(1, "A name is required for the list."),
});
