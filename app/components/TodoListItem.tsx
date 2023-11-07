import React from "react";
import { TodoItem, priorityColors } from "../Types/TodoItem";
import { getDateString } from "../utility/dateFunctions";
import { useRouter } from "next/navigation";

interface Props {
	item: TodoItem;
	index: number;
}

const TodoListItem = ({ item, index }: Props) => {
	const router = useRouter();
	const color = priorityColors[item.priority as keyof typeof priorityColors];

	return (
		<div
			onClick={() => router.push("/edit/" + item.item_id)}
			className={
				item.isOverDue ? `flex mb-2 bg-red-200` : `flex mb-2 bg-stone-200`
			}
		>
			<div
				className={`flex h-16 w-12 flex-shrink-0 text-white ${color} justify-center items-center`}
			>
				{index}
			</div>
			<div className="flex flex-col pl-2 justify-center">
				<div>{item.todo_text}</div>
				<div className="text-xs">{getDateString(item.due_date)}</div>
			</div>
		</div>
	);
};

export default TodoListItem;
