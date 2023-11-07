"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosConfig } from "../../api/AuthHeader";
import { FaList, FaPencilAlt } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import ProjectPicker from "../../components/ProjectPicker";
import { BASE_API_URL } from "../../settings";
import { useRouter } from "next/navigation";
import { Project } from "@/app/Types/Project";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/app/validationSchemas";
import MytodoozButton from "@/app/components/MytodoozButton";

const ProjectForm = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		control,
		reset,
		setFocus,
		formState: { errors },
	} = useForm<Project>({
		resolver: zodResolver(projectSchema),
		defaultValues: {
			parent_project_id: "5",
			project_name: "",
			project_description: "",
			project_notes: "",
			display_when_selected: false,
			owner_id: 2,
		},
	});

	const onSubmit = handleSubmit(async (data) => {
		await axios.post(BASE_API_URL + "/projects", data, axiosConfig);
		reset({
			parent_project_id: "5",
			project_name: "",
			project_description: "",
			project_notes: "",
			display_when_selected: false,
			owner_id: 2,
		});
		setFocus("project_name");
	});

	const handleClose = () => {
		router.push("/list");
	};

	const handleDelete = () => {};

	return (
		<div>
			<div className="m-auto mt-6 w-1/2">
				<h1 className="flex items-center mb-6 text-blue-800">
					<FaList />
					&nbsp; New List
				</h1>
				<form onSubmit={onSubmit} className="flex flex-col gap-4">
					<Controller
						name="owner_id"
						control={control}
						render={({ field }) => <input type="hidden" {...field} />}
					/>
					<div className="flex items-center h-10 px-3 bg-slate-200 text-slate-400">
						<FaPencilAlt />
						<input
							type="text"
							placeholder="Name"
							className="ml-2 h-10 border-none bg-slate-200 text-slate-900"
							{...register("project_name", { required: true })}
						/>
					</div>
					{errors.project_name && (
						<p className="text-red-700">{errors.project_name?.message}</p>
					)}
					<Controller
						name="parent_project_id"
						control={control}
						render={({ field }) => (
							<ProjectPicker showProjectsOnly={true} {...field} />
						)}
					/>
					<div className="flex flex-col bg-slate-200">
						<h3 className="flex m-1 items-center text-slate-400">
							<FaPencilAlt />
							&nbsp;&nbsp;Description
						</h3>
						<textarea
							rows={3}
							cols={40}
							className="bg-slate-200"
							{...register("project_description", { required: false })}
						></textarea>
					</div>
					<div className="flex flex-col bg-slate-200">
						<h3 className="flex m-1 items-center text-slate-400">
							<FaPencilAlt />
							&nbsp;&nbsp;Notes
						</h3>
						<textarea
							rows={4}
							cols={40}
							className="bg-slate-200"
							{...register("project_notes", { required: false })}
						></textarea>
					</div>
					<div className="flex items-center h-10 pl-2 bg-slate-200 text-slate-400">
						<input
							type="checkbox"
							{...register("display_when_selected", { required: true })}
						/>
						<h3 className="ml-2">Display as seperate list</h3>
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
		</div>
	);
};

export default ProjectForm;
