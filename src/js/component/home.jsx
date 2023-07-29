import React, { useState } from "react";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			setTodos((prevTodos) => [...prevTodos, inputValue]);
			setInputValue("");
		}
	};

	const handleDeleteTodo = (todo) => {
		setTodos((prevTodos) => prevTodos.filter((t) => t !== todo));
	};

	return (
		<div className="container">
			<ul>
				<h1>To-do To-day</h1>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyPress={handleKeyPress}
						placeholder="What do you need to do?"
					/>
				</li>
				{todos.map((todo, index) => (
					<li key={index}>
						{todo}{" "}
						<i
							id="icon-trash"
							className="fas fa-trash"
							onClick={() => handleDeleteTodo(todo)}
						></i>
					</li>
				))}
			</ul>
			<div className="tasks">{todos.length} tasks</div>
		</div>
	);
};

export default Home;
