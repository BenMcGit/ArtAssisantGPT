"use client";

import { Message, experimental_useAssistant as useAssistant } from "ai/react";
import { useRef, useEffect, useState } from "react";

const roleToColorMap: Record<Message["role"], string> = {
	system: "red",
	user: "black",
	function: "blue",
	assistant: "green",
	data: "orange",
	tool: "purple",
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
	const {
		status,
		messages,
		input,
		submitMessage,
		setInput,
		handleInputChange,
	} = useAssistant({ api: "/api/assistant" });
	const [theme, setTheme] = useState(THEMES[0]);
	const messagesContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div className="stretch mx-auto flex h-screen w-full max-w-md flex-col pb-24 pt-8">
			<div className="mb-24 w-full overflow-auto" ref={messagesContainerRef}>
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
					<div className="flex justify-end pr-4">
						<span className="animate-bounce">...</span>
					</div>
				)}
			</div>

			<form
				onSubmit={submitMessage}
				className="fixed bottom-0 w-full max-w-md p-2 mb-4 border border-gray-300 shadow-xl bg-slate-200 rounded"
			>
				<input
					disabled={status !== "awaiting_message"}
					className="w-full max-w-md p-2 mb-2 border bg-white border-gray-300 rounded shadow-xl"
					value={input}
					placeholder="Describe a painting with a description..."
					onChange={handleInputChange}
				/>
				<p className="flex justify-center py-2 font-bold"> OR</p>
				<select
					id="countries"
					className="w-full max-w-md p-2 mb-2 border border-gray-300 rounded shadow-xl dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white"
					value={theme}
					onChange={(e) => setTheme(e.target.value)}
					disabled={status === "in_progress"}
				>
					{THEMES.map((theme, idx) => (
						<option key={idx} value={theme}>
							{theme}
						</option>
					))}
				</select>
				<div className="flex flex-col">
					<button
						className="bg-blue-500 p-2 text-white rounded shadow-xl"
						disabled={status === "in_progress"}
						onClick={() =>
							setInput(`Describe a a painting using the theme ${theme}`)
						}
					>
						Describe a painting with a theme...
					</button>
				</div>
			</form>
		</div>
	);
}
