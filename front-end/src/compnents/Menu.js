import { useContext } from "react";
import { Link } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";

import { AuthContext } from "../contexts/authContext";
import { KeranjangContext } from "../contexts/keranjangContext";

import keranjang from "./img/keranjang.svg";
import user from "./img/user.svg";
import product from "./img/product.svg";
import logout from "./img/logout.svg";

const Menu = () => {
	const [state, dispatch] = useContext(AuthContext);
	// console.log("menu-header", state);

	return <>{!state.user.type ? <LoginRegister /> : <User />}</>;
};

export default Menu;

export const LoginRegister = () => {
	const [state, dispatch] = useContext(AuthContext);
	const handleOpenLogin = () => {
		dispatch({
			type: "MODAL_LOGIN_OPEN",
		});
	};
	const handleOpenRegister = () => {
		dispatch({
			type: "MODAL_REGISTER_OPEN",
		});
	};
	return (
		<div>
			<Nav>
				<li className="nav-link">
					<button
						className="btn btn-brown btn-nav btn-sm"
						onClick={handleOpenLogin}
					>
						Login
					</button>
				</li>
				<li className="nav-link">
					<button
						className="btn btn-brown btn-nav btn-sm"
						onClick={handleOpenRegister}
					>
						Register
					</button>
				</li>
			</Nav>
		</div>
	);
};

export const User = () => {
	const [state, dispatch] = useContext(AuthContext);

	const logoutUser = () => {
		// console.log("lll", state);
		dispatch({
			type: "LOGOUT",
		});
	};
	return (
		<>
			{state.user.type === 1 ? <Cart /> : ""}

			<NavDropdown
				// eventKey={1}
				title={
					<div className="pull-left">
						<img
							className="thumbnail-image rounded-circle"
							src={state.user.img}
							alt="user pic"
							width="40"
							height="40"
						/>
					</div>
				}
				id="basic-nav-dropdown"
				alignRight
				// className="dropdown-menu-right menu"
			>
				<Link to="/profile" className="dropdown-item">
					<img src={user} alt="" className="dropdown-logo " /> Profile
				</Link>
				{state.user.type === 2 ? (
					<Link to="/product/add" className="dropdown-item">
						<img src={product} alt="" className="dropdown-logo " /> Add product
					</Link>
				) : (
					""
				)}

				<NavDropdown.Divider />
				<Link to="/#" onClick={logoutUser} className="dropdown-item">
					<img src={logout} alt="" className="dropdown-logo " /> logout
				</Link>
			</NavDropdown>
		</>
	);
};

export const Cart = () => {
	const [state, dispatch] = useContext(KeranjangContext);
	return (
		<>
			<Nav.Link as={Link} to="/cart">
				<img src={keranjang} alt="" className="thumbnail-image" />
				{state.carts.length ? (
					<span className="badge badge-pill badge-danger rounded-pill position-absolute top-0 start-0">
						{/* {state.carts.length} */}
						{sum(state.carts)}
					</span>
				) : (
					""
				)}
			</Nav.Link>
		</>
	);
};

const sum = (data) => {
	var sum = 0;
	data.forEach(function (obj) {
		sum += obj.qty;
	});
	return sum;
};
