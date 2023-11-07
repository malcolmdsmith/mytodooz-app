"use client";

import React from "react";
import TodoItemForm from "@/app/components/TodoItemForm";
import axios from "axios";
import { axiosConfig } from "@/app/api/AuthHeader";
import { BASE_API_URL } from "@/app/settings";
import { useQuery } from "@tanstack/react-query";
import { TodoItem } from "@/app/Types/TodoItem";

interface Props {
	params: { id: string };
}

const EditTodoItemPage = ({ params }: Props) => {
	const url = BASE_API_URL + `/todooz/` + params.id;
	//console.info("const url...", url);

	const {
		data: item,
		error,
		isLoading,
	} = useQuery<TodoItem>({
		queryKey: ["todoItem", url],
		queryFn: () => axios.get(url, axiosConfig).then((res) => res.data),
		// 	staleTime: 60 * 1000,
		retry: 3,
	});

	return (
		<div>{item ? <TodoItemForm todoItem={item} /> : <TodoItemForm />}</div>
	);
};

export default EditTodoItemPage;
