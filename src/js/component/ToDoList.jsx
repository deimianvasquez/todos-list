import React, { useEffect, useState } from "react";

const ToDoList = () => {
	const initialState = {
		label: "",
		done: false
	};

	const [listTask, setListTask] = useState([]);
	const [task, setTask] = useState(initialState);

	const handleChange = e => {
		setTask({ ...task, [e.target.name]: e.target.value });
	};

	const URL_BASE = "https://assets.breatheco.de/apis/fake/todos/user/deimian";

	const getTask = async () => {
		try {
			let response = await fetch(URL_BASE);
			if (response.ok) {
				let data = await response.json();
				setListTask(data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const addTask = async e => {
		if (e.key === "Enter") {
			if (task.label.trim() != "") {
				let response = await fetch(URL_BASE, {
					method: "PUT",
					body: JSON.stringify([...listTask, task]),
					headers: {
						"Content-Type": "application/json"
					}
				});
				if (response.ok) {
					getTask();
					listTask(initialState);
				}
				// setListTask([...listTask, task]);
				// setTask(initialState);
			} else {
				//debo explotar un error
			}
		}
	};

	const deleteTask = async id => {
		let newListTask = listTask.filter((task, index) => id != index);
		try {
			let response = await fetch(URL_BASE, {
				method: "PUT",
				body: JSON.stringify(newListTask),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				getTask();
			}
		} catch (err) {
			console.log(err);
		}
		setListTask(newListTask);
	};

	useEffect(() => {
		getTask();
	}, []);

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 text-center">
					<h1>Todos List</h1>
				</div>
				<div className="col-12 col-md-6">
					<input
						type="text"
						placeholder="Ingresa la tarea"
						className="form-control"
						name="label"
						value={task.label}
						onChange={handleChange}
						onKeyDown={addTask}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col">{/* aqui va el error  */}</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<ul>
						{listTask.map((task, index) => (
							<li key={index} onClick={() => deleteTask(index)}>
								{task.label}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="row">
				<div className="col">
					{/* aqui cuantas tareas me quedan  */}
				</div>
			</div>
		</div>
	);
};

export default ToDoList;
