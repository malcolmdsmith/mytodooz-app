import { Priority } from "./Priority";

export interface TodoItem {
	item_id: number;
	project_id: string;
	todo_text: string;
	priority: Priority;
	due_date: Date | null;
	completed: Date | null;
	owner_id: number;
	createdAt: Date | null;
	updatedAt: Date | null;
	isOverDue: boolean;
}

// export interface TodoItem {
// 	item_id: number;
// 	project_id: number;
// 	todo_text: string;
// 	priority: number;
// 	due_date: string;
// 	completed: string;
// 	createdAt: string;
// 	updatedAt: string;
// 	isOverDue: boolean;
// }

export const priorityColors = {
	1: "bg-red-600",
	2: "bg-orange-400",
	3: "bg-lime-600",
};

export const overDueColors = {
	true: "bg-red-200",
	false: "bg-stone-200",
};
