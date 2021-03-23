import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";

import { KeranjangContextProvider } from "./contexts/keranjangContext";
import { AuthContextProvaider } from "./contexts/authContext";

import Navigation from "./compnents/Nav";

import Test from "./pages/Test";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import EditProfile from "./pages/EditProfile";
import AddProduct from "./pages/AddProduct";
import Transaction from "./pages/Transaction";
import Login from "./pages/Login";
import Register from "./pages/Register";

import PrivateRoute from "./compnents/PrivateRoute";
function useQuery() {
	return new URLSearchParams(useLocation().search);
}
export default function MasterRoute() {
	let query = useQuery();
	return (
		<AuthContextProvaider>
			<KeranjangContextProvider>
				<Navigation />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<PrivateRoute exact path="/profile" component={Profile} />
					<PrivateRoute exact path="/profile" component={Profile} />
					<PrivateRoute exact path="/Cart" component={Cart} />
					<PrivateRoute exact path="/product/add" component={AddProduct} />
					<PrivateRoute exact path="/profile/edit" component={EditProfile} />
					<PrivateRoute exact path="/transaction" component={Transaction} />
					<PrivateRoute exact path="/market/:id" component={Product} />
					<Route exact path="/test">
						<Test />
					</Route>
				</Switch>
				<Register />
				<Login />
				<Child popUP={query.get("popup")} />
			</KeranjangContextProvider>
		</AuthContextProvaider>
	);
}

function Child({ popUP }) {
	const [show, setShow] = useState(true);
	// const handleClose = () => setShow(false);
	console.log("sow", show);
	const close = () => {
		setShow(false);
	};
	useEffect(() => {
		console.log("useEffect componentDidMount");
		if (popUP) {
			setShow(true);
			// console.log("popup");
		}
	}, []); //fetching data dari API

	return (
		<>
			{popUP === "login" && (
				<>
					<Login show={show} onHide={close} />

					{show === false ? <Redirect to="/" /> : <></>}
				</>
			)}
		</>
	);
}
