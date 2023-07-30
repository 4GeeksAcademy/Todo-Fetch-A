import React, { useState, useEffect } from "react";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [userName, setUserName] = useState("Anggie");
	const [todos, setTodos] = useState([]);


	const getData = useEffect(async () => {
		let response = await fetch(
			"https://playground.4geeks.com/apis/fake/todos/user/Anggie",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		let data = await response.json();
		setTodos(data);
	}, []);

	const updateApi = async () => {
		let response = await fetch(
			"https://playground.4geeks.com/apis/fake/todos/user/Anggie",
			{
				method: "PUT",
				body: JSON.stringify(todos),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	};

	const deleteApi = async () => {
		let response = await fetch(
			"https://playground.4geeks.com/apis/fake/todos/user/Anggie",
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}

	const handleKeyPress = async (e) => {
		if (e.key === "Enter") {
			setTodos((prevTodos) => [
				...prevTodos,
				{ label: inputValue, done: false, id: prevTodos.length },
			]);
			setInputValue("");
			await updateApi();
		}
	};

	const handleDeleteTodo = async (index) => {
		await deleteApi();
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
		console.log(newTodos)
	};

	const handleToggleDone = async (index) => {
		const updatedTodos = todos.map((todo, i) => {
			if (i === index) {
				return {
					...todo,
					done: !todo.done
				};
			} else {
				return todo;
			}
		});
		setTodos(updatedTodos);
		console.log(updatedTodos);
		await updateApi();
	};


	const handleUserNameChange = (e) => {
		setUserName(e.target.value);
	};

	return (
		<div className="container">
			<ul>
				<h1>To-do</h1>
				<input
					type="text"
					onChange={handleUserNameChange}
					value={userName}
					placeholder="Username"
				/>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyPress={handleKeyPress}
						placeholder="What do you need to do?"
					/>

					{todos.length === 0 && (
						<div className="alert-task">No hay tareas, añadir tareas</div>
					)}
				</li>
				{todos.map((todo, index) => (
					<li key={index}>
						<input
							id="checkbox"
							type="checkbox"
							checked={todo.done}
							onChange={() => handleToggleDone(index)}
						/>
						<span
							style={{
								textDecoration: todo.done ? "line-through" : "none",
							}}
						>
							{todo.label}
						</span>{" "}
						<i
							id="icon-trash"
							className="fas fa-trash"
							onClick={() => handleDeleteTodo(index)}
						></i>
					</li>
				))}
			</ul>
			<div className="tasks">{todos.length} tasks</div>
		</div>
	);
};

export default Home;
