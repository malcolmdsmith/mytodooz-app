import React from "react";
import { Project } from "../Types/Project";
import { useQuery } from "@tanstack/react-query";
import { axiosConfig } from "../api/AuthHeader";
import axios from "axios";
import { BASE_API_URL } from "../settings";

interface ChildProps {
	onChange: (proj_id: string) => void;
	showProjectsOnly: boolean;
	value: string;
}

const ProjectPicker = ({ onChange, showProjectsOnly, value }: ChildProps) => {
	const {
		data: projects,
		error,
		isLoading,
	} = useQuery<Project[]>({
		queryKey: ["projects"],
		queryFn: () =>
			axios
				.get(BASE_API_URL + `/projects/user/2/fh1zlr`, axiosConfig)
				.then((res) => res.data),
		staleTime: 360 * 1000,
		retry: 3,
	});

	if (error) console.info(error.message);

	const pickerList = (projs: Project[]) => {
		if (!showProjectsOnly) {
			if (projs.findIndex((proj) => proj.project_id === "[MyTodooz]") === -1) {
				projs?.unshift({
					project_id: "[Completed]",
					project_name: "[Completed]",
					display_when_selected: false,
					owner_id: 2,
					project_description: "",
					project_notes: "",
					parent_project_id: "0",
				});
				projs?.unshift({
					project_id: "[MyTodooz]",
					project_name: "[MyTodooz]",
					display_when_selected: false,
					owner_id: 2,
					project_description: "",
					project_notes: "",
					parent_project_id: "0",
				});
			}
		}
		return projs;
	};

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value);
	};

	return (
		<div>
			<select
				id="projects"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				onChange={handleChange}
				value={value}
			>
				{pickerList(projects || [])?.map((project, index) => (
					<option key={index} value={project.project_id}>
						{project.project_name}
					</option>
				))}
			</select>
		</div>
	);
};

export default React.forwardRef(ProjectPicker);
