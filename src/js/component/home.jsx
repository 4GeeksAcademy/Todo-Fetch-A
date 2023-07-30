import React, { useState, useEffect, useRef } from "react";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [userName, setUserName] = useState("");
	const [todos, setTodos] = useState([]);

	const getUrl = () => `https://playground.4geeks.com/apis/fake/todos/user/${userName}`

	let myInput = useRef()

	useEffect(async () => {
		if (userName !== "") {
			let response = await fetch(
				getUrl(),
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if(!response.ok){
				response = await fetch(
					getUrl(),
					{
						method: "POST",
						body: JSON.stringify([]),
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				response = await fetch(
					getUrl(),
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
			}
			


			let data = await response.json();
			setTodos(data);
		}
		else {
			setTodos([])
		}

	}

		, [userName]);

	const updateApi = async (data = false) => {
		if (!data) data = todos
		let response = await fetch(
			getUrl(),
			{
				method: "PUT",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	};

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
		let newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
		await updateApi(newTodos);
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
		await updateApi(updatedTodos);
	};

	const changeUser = () => setUserName(myInput.current.value)

	return (
		<div className="container">
			<ul>
				<h1>To-do</h1>
				<input
					ref={myInput}
					type="text"
					placeholder="Username"
				/>
				<button onClick={changeUser}>Buscar usuario</button>
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
				{todos ? todos.map((todo, index) => (
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
				)) : <li>nada</li>}
			</ul>
			<div className="tasks">{todos.length} tasks</div>
		</div>
	);
};

export default Home;
