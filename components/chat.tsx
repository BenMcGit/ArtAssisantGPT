"use client";

import {
	Message,
	// import as useAssistant:
	experimental_useAssistant as useAssistant,
} from "ai/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { useEffect, useRef, useState } from "react";

const roleToColorMap: Record<Message["role"], string> = {
	system: "red",
	user: "black",
	function: "blue",
	assistant: "green",
	data: "orange",
	tool: "",
};

const THEMES = [
	"Abstract",
	"Pop Art",
	"Cubism",
	"Minimalism",
	"Realism",
	"Impressionism",
];

export default function Chat() {
	const { status, messages, input, submitMessage, handleInputChange } =
		useAssistant({ api: "/api/assistant" });
	const messagesContainerRef = useRef<HTMLDivElement>(null);
	const [theme, setTheme] = useState(THEMES[0]);

	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div
			className="flex flex-col w-full max-w-xl py-24 mx-auto stretch bg-cyan-100"
			ref={messagesContainerRef}
		>
			{messages.map((m: Message) => (
				<div
					key={m.id}
					className="whitespace-pre-wrap"
					style={{ color: roleToColorMap[m.role] }}
				>
					<strong>{`${m.role}: `}</strong>
					{m.role !== "data" && m.content}
					{m.role === "data" && (
						<>
							{/* here you would provide a custom display for your app-specific data:*/}
							{(m.data as any).description}
							<br />
							<pre className={"bg-gray-200"}>
								{JSON.stringify(m.data, null, 2)}
							</pre>
						</>
					)}
					<br />
					<br />
				</div>
			))}

			{status === "in_progress" && (
				<div className="h-8 w-full p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
			)}

			<form
				onSubmit={submitMessage}
				className="fixed bottom-0 max-w-xl w-full p-2 mb-8 space-y-4"
			>
				<Select defaultValue={theme}>
					<SelectTrigger>
						<SelectValue placeholder="Themes" />
					</SelectTrigger>
					<SelectContent>
						{THEMES.map((opt, idx) => (
							<SelectItem key={idx} value={opt}>
								{opt}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Input
					disabled={status !== "awaiting_message"}
					value={input}
					placeholder="Provide a short description of a painting"
					onChange={handleInputChange}
				/>
				<Button
					className="flex grow"
					disabled={status !== "awaiting_message"}
					type="submit"
				>
					Send
				</Button>
			</form>
		</div>
	);
}
