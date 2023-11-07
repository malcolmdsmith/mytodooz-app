import React from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosConfig } from "../api/AuthHeader";
import axios from "axios";
import { TodoItem } from "../Types/TodoItem";
import TodoListItem from "./TodoListItem";
import { sortTodoItem, sortTodoItemByText } from "../utility/sort";
import { isDatePassed } from "../utility/dateFunctions";
import delay from "delay";
import Spinner from "./Spinner";
import { BASE_API_URL } from "../settings";

interface Props {
	params: string;
}

const TodoItems = async ({ params }: Props) => {
	const url = BASE_API_URL + `/todooz/user/all?` + params;
	// console.info("const url...", url);
	const {
		data: items,
		error,
		isLoading,
	} = useQuery<TodoItem[]>({
		queryKey: ["todoItems", url],
		queryFn: () => axios.get(url, axiosConfig).then((res) => res.data),
		// 	staleTime: 60 * 1000,
		retry: 3,
	});

	//await delay(1000);

	// console.info("TodoItems..." + JSON.stringify(items?.length && items[0]));

	//if (isLoading) return <LoadingListPage />;

	if (error) console.info(error.message);

	const sortedItems = () => {
		let sorted: TodoItem[];

		if (0) sorted = items?.sort(sortTodoItemByText) || [];
		else sorted = items?.sort(sortTodoItem) || [];

		for (let i = 0; i < sorted.length; i++) {
			if (sorted[i].due_date === null) {
				sorted[i].isOverDue = false;
			} else {
				sorted[i].isOverDue = isDatePassed(sorted[i].due_date);
			}
		}
		return sorted;
	};
	// console.info(items);

	if (isLoading) return <Spinner />;

	return (
		<div className="flex flex-col w-full">
			<div className="m-auto mt-5 w-2/3">
				{sortedItems().map((item, index) => (
					<TodoListItem key={item.item_id} index={index + 1} item={item} />
				))}
			</div>
		</div>
	);
};

export default TodoItems;
