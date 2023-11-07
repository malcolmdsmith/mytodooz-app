"use client";

import Link from "next/link";
import React from "react";

const NavBar = () => {
	return (
		<>
			<div className="flex justify-between">
				<div className="flex p-3">
					<Link href="/list">
						<img src="/todologo.png" alt="logo" className="h-14" />
					</Link>
				</div>
				<div className="flex space-x-3 pb-1 items-end">
					<Link
						href="/projects/new"
						className="w-32 p-1 text-center text-sm text-green-700 border-solid border-2 border-green-700 rounded-3xl"
					>
						New List
					</Link>
					<Link
						href="/new"
						className="w-32 p-1 text-center text-sm text-red-500 border-solid border-2 border-red-500 rounded-3xl"
					>
						New Todo Item
					</Link>
				</div>
			</div>
			<div className="h-3 bg-sky-600"></div>
			<div className="h-1 bg-yellow-300"></div>
		</>
	);
};

export default NavBar;
