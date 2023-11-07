"use client";

import React, { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
import TodoItems from "../components/TodoItems";
import ProjectPicker from "../components/ProjectPicker";

const MyTodoozList = () => {
	// const searchParams = useSearchParams();
	const [project, setProject] = useState("5");
	const [params, setParams] = useState(
		"owner_id=2&complete=false&project_id=5"
	);
	const lparams = new URLSearchParams();
	// params.append("owner_id", searchParams.get("owner_id") || "");
	// params.append("project_id", searchParams.get("project_id") || "");
	// params.append("completed", searchParams.get("completed") || "");
	// console.info("MyTodoozList...", searchParams.toString());

	// useEffect(() => {
	// 	setParams("owner_id=2&complete=false&project_id=5");
	// }, []);

	const handleProjectSelect = (proj_id: string) => {
		// console.info("handleProjectSelect...", proj_id);
		// params.append("owner_id", "2");
		// params.append("project_id", proj_id);
		// params.append("completed", "false");
		setParams("owner_id=2&complete=false&project_id=" + proj_id);
	};

	return (
		<div className="m-4">
			<div>
				<div className="flex mr-4 items-center">
					<div className="mr-2">Select List:</div>
					<ProjectPicker
						onChange={handleProjectSelect}
						showProjectsOnly={false}
						value={project}
					/>
				</div>
			</div>
			<TodoItems params={params} />
		</div>
	);
};

export default MyTodoozList;
