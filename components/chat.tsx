"use client";

import { useChat } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";

export default function Chat() {
	const messagesContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
		}
	}, []);

	return (
		<div className="justify-center">
			<div
				className="mb-8 w-full overflow-auto bg-slate-300"
				ref={messagesContainerRef}
			>
				TEST
				{false && (
					<div className="flex justify-end pr-4">
						<span className="animate-bounce">...</span>
					</div>
				)}
			</div>
			<div className="fixed bottom-16 w-full max-w-md">
				<div className="flex w-full max-w-sm items-center space-x-2">
					<Input type="email" placeholder="Email" />
					<Button type="submit">Submit</Button>
				</div>
			</div>
		</div>
	);
}
