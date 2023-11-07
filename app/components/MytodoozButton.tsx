import React from "react";

interface Props {
	onClick: () => void;
	label: string;
	color: string;
}
const MytodoozButton = ({ onClick, label, color }: Props) => {
	return (
		<button
			onClick={onClick}
			className={"w-32 p-1 text-sm border-solid border-2 rounded-2xl " + color}
		>
			{label}
		</button>
	);
};

export default MytodoozButton;
