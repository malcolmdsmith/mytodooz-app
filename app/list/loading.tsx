import Skeleton from "../components/Skeleton";
import React from "react";

const LoadingListPage = () => {
	const items = [1, 2, 3, 4, 5, 6];

	return (
		<div className="m-8">
			<div className="flex mr-4 items-center">
				<div className="mr-2">Select List:</div>
				<div className="h-10">
					<Skeleton width="10rem" />
				</div>
			</div>
			<div className="flex flex-col w-full">
				<div className="m-auto mt-5 w-2/3">
					{items.map((item) => (
						<div
							key={item}
							className={`flex h-16 w-12 flex-shrink-0 text-white justify-center items-center`}
						>
							<Skeleton />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default LoadingListPage;
