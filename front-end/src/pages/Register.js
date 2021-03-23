import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../contexts/authContext";

import { Button, Form, Modal } from "react-bootstrap";

function Register() {
	const [state, dispatch] = useContext(AuthContext);
	const [form, setForm] = useState({
		email: "",
		name: "",
		type: "1",
		phone: "",
		img: "",
		id: Math.random() * 10,
		img: "https://ui-avatars.com/api/?name=John+Doe",
	});
	const handleClose = () => {
		dispatch({
			type: "MODAL_REGISTER_CLOSE",
		});
	};
	const handleOpenLogin = () => {
		handleClose();
		dispatch({
			type: "MODAL_LOGIN_OPEN",
		});
	};
	const handleOpenRegister = () => {
		dispatch({
			type: "MODAL_REGISTER_OPEN",
		});
	};
	const onChange = (e) => {
		// console.log("log ".e);
		const updateForm = { ...form };
		updateForm[e.target.name] = e.target.value;
		setForm(updateForm);
	};

	const registerUser = (e) => {
		e.preventDefault();
		handleClose();
		// console.log("ok", form);
		dispatch({
			type: "REGISTER",
			payload: form,
		});

		setForm({
			email: "",
			name: "",
			type: "1",
			phone: "",
			img: "",
			id: Math.random() * 10,
			img: "https://ui-avatars.com/api/?name=John+Doe",
		});
		// if (!state.errormail) {
		// 	handleOpenRegister();
		// }
	};

	// console.log("register", state);
	return (
		<Modal show={state.modalRegister} onHide={handleClose} size="sm" centered>
			<Modal.Body>
				<div className="form-title mb-3">
					<h4 className="text-yellow">Login</h4>
				</div>
				<div className="d-flex flex-column">
					<Form onSubmit={(e) => registerUser(e)}>
						<Form.Group controlId="formBasicEmail">
							<Form.Control
								type="email"
								className="form-control input-bg"
								placeholder="Email"
								value={form.email}
								name="email"
								required
								onChange={(e) => onChange(e)}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Control
								type="password"
								className="form-control input-bg"
								placeholder="Password"
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Control
								type="text"
								className="form-control input-bg"
								placeholder="Full Name"
								name="name"
								value={form.name}
								onChange={(e) => onChange(e)}
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Control
								type="text"
								className="form-control input-bg"
								placeholder="Gender"
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Control
								type="text"
								className="form-control input-bg"
								placeholder="Phone"
								name="phone"
								value={form.phone}
								onChange={(e) => onChange(e)}
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Control
								as="select"
								className="input-bg"
								name="type"
								onChange={(e) => onChange(e)}
								value={form.type}
							>
								<option value="1">As User</option>
								<option value="2">As Partner</option>
							</Form.Control>
						</Form.Group>
						<Button
							type="submit"
							variant="brown"
							className="btn btn-block btn-round"
							// onClick={registerUser()}
						>
							Register
						</Button>
					</Form>
					<p className="text-danger">{state.errormail}</p>
					<div className="text-center text-muted delimiter mt-2 ">
						Already have an account ? klick {"\u00A0"}
						<Link
							to="#"
							onClick={handleOpenLogin}
							className="font-weight-bold text-muted"
						>
							here
						</Link>
						.
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default Register;
