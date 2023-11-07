import React, { useState } from "react";
import { Priority } from "../Types/Priority";

interface ChildProps {
	onChange: (priority: Priority) => void;
	value: Priority;
}
const PriorityPicker = ({ onChange, value }: ChildProps) => {
	// console.info("PriorityPicker...", value);

	return (
		<div className="flex gap-2 h-10">
			<div
				className={
					"flex justify-center items-center w-1/3 " +
					(value === Priority.HIGH
						? "bg-red-600 text-white"
						: "bg-slate-200 text-slate-400")
				}
				onClick={() => {
					onChange(Priority.HIGH);
				}}
			>
				HIGH
			</div>
			<div
				className={
					"flex justify-center items-center w-1/3 " +
					(value === Priority.MEDIUM
						? "bg-orange-400 text-white"
						: "bg-slate-200 text-slate-400")
				}
				onClick={() => {
					onChange(Priority.MEDIUM);
				}}
			>
				MEDIUM
			</div>
			<div
				className={
					"flex justify-center items-center w-1/3 " +
					(value === Priority.LOW
						? "bg-green-600 text-white"
						: "bg-slate-200 text-slate-400")
				}
				onClick={() => {
					onChange(Priority.LOW);
				}}
			>
				LOW
			</div>
		</div>
	);
};

export default PriorityPicker;
