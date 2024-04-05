"use client";

import { Input } from "./ui/input";

export default function Sidebar() {
	return (
		<div className="flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4">
			<Input></Input>
			<Input></Input>
			<Input></Input>
		</div>
	);
}
