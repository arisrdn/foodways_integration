import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { API, setAuthToken } from "../config/api";

import { AuthContext } from "../contexts/authContext";

import { Button, Form, Modal } from "react-bootstrap";

function Login(props) {
	console.log(props);
	const [state, dispatch] = useContext(AuthContext);
	const router = useHistory();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	// const LoginUser = () => {
	// 	dispatch({
	// 		type: "LOGIN",
	// 		payload: { email: form.email },
	// 	});

	// 	if (state.user.type) {
	// 		// console.log("masuk", state);
	// 		if (state.user.type === 1) {
	// 			router.push("/");
	// 			handleClose();
	// 			setForm({
	// 				email: "",
	// 				password: "",
	// 			});
	// 		} else {
	// 			handleClose();
	// 			router.push("/transaction");
	// 			setForm({
	// 				email: "",
	// 				password: "",
	// 			});
	// 		}
	// 	}
	// };

	const handleClose = () => {
		dispatch({
			type: "MODAL_LOGIN_CLOSE",
		});
	};
	const handleOpenRegister = () => {
		handleClose();
		dispatch({
			type: "MODAL_REGISTER_OPEN",
		});
	};

	const onChange = (e) => {
		const updateForm = { ...form };
		updateForm[e.target.name] = e.target.value;
		setForm(updateForm);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		// LoginUser();
		try {
			const body = JSON.stringify({
				email,
				password,
			});

			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const user = await API.post("/login", body, config);

			dispatch({
				type: "LOGIN_SUCCESS",
				payload: user.data.data.user,
			});

			setAuthToken(user.data.data.user.token);

			history.push("/home");
		} catch (error) {
			console.log(error);
		}
	};
	// console.log("login", state);
	return (
		<Modal
			// show={state.modalLogin}{modalshow}
			show={props.show ? props.show : state.modalLogin}
			// onHide={handleClose}
			onHide={props.onHide ? props.onHide : handleClose}
			size="sm"
			centered
			className={state.error ? "error " : ""}
		>
			<Modal.Body>
				<div className="form-title mb-3">
					<h4 className="text-yellow">Login</h4>
				</div>
				<div className="d-flex flex-column">
					<Form onSubmit={(e) => handleSubmit(e)}>
						<Form.Group controlId="formBasicEmail">
							<Form.Control
								value={form.email}
								onChange={(e) => onChange(e)}
								type="email"
								name="email"
								className="form-control input-bg"
								placeholder="Email"
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Control
								value={form.password}
								onChange={(e) => onChange(e)}
								type="password"
								name="password"
								className="form-control input-bg"
								placeholder="Password"
							/>
						</Form.Group>
						<Button
							type="submit"
							variant="brown"
							className="btn btn-block btn-round"
						>
							Login
						</Button>
					</Form>
					<p className="text-danger">{state.error}</p>
					{/* <pre>{JSON.stringify(form, 2, null)}</pre> */}
					<div className="text-center text-muted delimiter mt-2">
						Don't have an account ? klick
						<Link
							to="#"
							onClick={handleOpenRegister}
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
export default Login;
