"use client";

import React from "react";
import axios from "axios";
import { axiosConfig } from "../api/AuthHeader";
import { FaList, FaPencilAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import ProjectPicker from "./ProjectPicker";
import PriorityPicker from "./PriorityPicker";
import { BASE_API_URL } from "../settings";
import { useRouter } from "next/navigation";
import { Priority } from "../Types/Priority";
import { todoItemSchema } from "../validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoItem } from "../Types/TodoItem";
import MytodoozButton from "./MytodoozButton";

interface Props {
	todoItem?: TodoItem;
}

const TodoItemForm = ({ todoItem }: Props) => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<TodoItem>({
		resolver: zodResolver(todoItemSchema),
		defaultValues: {
			priority: todoItem?.priority || Priority.LOW,
			due_date: todoItem?.due_date || null,
			completed: todoItem?.completed || null,
			project_id: todoItem?.project_id || "5",
			todo_text: todoItem?.todo_text || "",
			owner_id: 2,
		},
	});

	const formatDate = (date: Date | null) => {
		if (date === null) return null;
		const year = date?.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${day}-${month}-${year}`;
	};

	const onSubmit = handleSubmit(async (data) => {
		console.info(data);
		const todoData = {
			...data,
			owner_id: 2,
			due_date: formatDate(data.due_date),
			completed: formatDate(data.completed),
		};
		if (todoItem)
			await axios.put(
				BASE_API_URL + "/todooz/" + todoItem.item_id,
				todoData,
				axiosConfig
			);
		else await axios.post(BASE_API_URL + "/todooz", todoData, axiosConfig);
		reset({
			priority: Priority.LOW,
			due_date: null,
			completed: null,
			project_id: data.project_id,
			todo_text: "",
			owner_id: 2,
		});
	});

	const handleClose = () => {
		router.push("/list");
	};

	const handleDelete = () => {
		router.push("/list");
	};

	return (
		<div className="m-auto mt-6 w-1/2">
			<h1 className="flex items-center mb-6 text-blue-800">
				<FaList />
				&nbsp; New Todo Item
			</h1>
			<form onSubmit={onSubmit} className="flex flex-col gap-4">
				<Controller
					name="owner_id"
					control={control}
					render={({ field }) => <input type="hidden" {...field} />}
				/>
				<Controller
					name="project_id"
					control={control}
					render={({ field }) => (
						<ProjectPicker showProjectsOnly={true} {...field} />
					)}
				/>
				<Controller
					name="priority"
					control={control}
					render={({ field }) => <PriorityPicker {...field} />}
				/>
				<div className="flex flex-col bg-slate-200">
					<h3 className="flex m-1 items-center text-slate-400">
						<FaPencilAlt />
						&nbsp;&nbsp;Description
					</h3>
					<textarea
						rows={8}
						cols={40}
						className="bg-slate-200"
						{...register("todo_text", { required: true })}
						defaultValue={todoItem?.todo_text}
					></textarea>
					{errors.todo_text && (
						<p className="text-red-600">{errors.todo_text.message}</p>
					)}
				</div>
				<div className="flex space-x-10">
					<div className="flex items-center p-2 w-40 text-slate-400 bg-slate-200">
						<FaPencilAlt />
						<Controller
							name="due_date"
							control={control}
							render={({ field }) => (
								<DatePicker
									className="bg-slate-200 text-black p-2 w-32"
									selected={field.value}
									placeholderText="Due Date"
									dateFormat="dd/MM/yyyy"
									isClearable={true}
									{...field}
								/>
							)}
						/>
					</div>
					<div className="flex items-center p-2 w-40 text-slate-400 bg-slate-200">
						<FaPencilAlt />
						<Controller
							name="completed"
							control={control}
							render={({ field }) => (
								<DatePicker
									className="bg-slate-200 text-black p-2 w-32"
									selected={field.value}
									placeholderText="Completed"
									dateFormat="dd/MM/yyyy"
									isClearable={true}
									{...field}
								/>
							)}
						/>
					</div>
				</div>
				<div className="flex space-x-3 pb-1 items-end">
					<button
						onClick={handleDelete}
						className="w-32 p-1 text-sm text-green-700 border-solid border-2 border-green-700 rounded-3xl"
					>
						Save
					</button>
					<MytodoozButton
						label="Delete"
						onClick={handleDelete}
						color="text-red-500 border-red-500"
					/>
					<MytodoozButton
						label="Close"
						onClick={handleClose}
						color="text-slate-700 border-slate-700"
					/>
				</div>
			</form>
		</div>
	);
};

export default TodoItemForm;
