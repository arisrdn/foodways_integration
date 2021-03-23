import map from "../compnents/img/map.svg";

import { useContext, useState } from "react";
import { KeranjangContext } from "../contexts/keranjangContext";
import { Link } from "react-router-dom";
import convertToRupiah from "../compnents/ToRupiah";
import Maps from "../compnents/Maps";

const Cart = () => {
	const [state, dispatch] = useContext(KeranjangContext);
	const [modalShow, setModalShow] = useState(false);

	const deleteProductFromCart = (id) => {
		dispatch({
			type: "REMOVE_CART",
			payload: {
				id,
			},
		});
	};
	const minusProductFromCart = (id) => {
		console.log(id);
		dispatch({
			type: "MINUS_CART",
			payload: {
				id,
			},
		});
	};

	const addProductToCart = (data) => {
		dispatch({
			type: "ADD_CART",
			payload: data,
		});
	};
	const sum = (data) => {
		var sum = 0;
		data.forEach(function (obj) {
			sum += obj.qty;
		});
		return sum;
	};

	function getSubTotal(data) {
		var subtotal = 0;
		data.forEach(function (obj) {
			subtotal += obj.qty * obj.price;
		});
		return subtotal;
	}
	function getTotal(data, ongkir) {
		var subtotal = 0;
		data.forEach(function (obj) {
			subtotal += obj.qty * obj.price;
		});
		return subtotal + ongkir;
	}

	// console.log(state.carts);

	return (
		<>
			<div className="container pt-3">
				<div className="row py-3 mt-3 mt-custom justify-content-center">
					{state.carts.length ? (
						<>
							<div className="my-2 col-10 ">
								<div class="mb-4">
									<h2>Geprek Bensu</h2>
								</div>
								<div class="input-group mb-3">
									<div className="col-12 px-1">
										<p> Delivery Location</p>
									</div>
									<div className="col px-0">
										<input
											type="text"
											class="form-control"
											placeholder="Search"
										/>
									</div>
									<div className="col-3 pr-0">
										<button
											class="btn btn-brown btn-block"
											onClick={() => setModalShow(true)}
										>
											Select On Map
											<img src={map} alt="map" className="ml-2" />
										</button>
									</div>
								</div>
								<div class="input-group mb-3">
									<div className="col-12 px-1">
										<p>Review Order</p>
									</div>
									<div className="col-md-7 px-0">
										<table class="table">
											{state.carts.map((cart) => (
												<>
													<tr
														style={{
															borderTop: "2px solid",
														}}
													>
														<th
															rowspan="2"
															style={{
																width: "20%",
																borderBottom: "2px solid",
															}}
														>
															<img
																src={cart.logo}
																alt="menu"
																style={{
																	height: "80px",
																	width: "80px",
																	objectFit: "cover",
																}}
															/>{" "}
														</th>
														<td>{cart.name}</td>
														<td
															className="text-danger	text-right"
															style={{ width: "35%" }}
														>
															{convertToRupiah(cart.price * cart.qty)}
														</td>
													</tr>
													<tr
														style={{
															borderBottom: "2px solid",
														}}
													>
														<td>
															<div
																class="input-group mb-3"
																style={{ width: "50%" }}
															>
																<div class="">
																	{cart.qty === 1 ? (
																		<button
																			class=""
																			type="button"
																			onClick={() =>
																				deleteProductFromCart(cart.id)
																			}
																			style={{
																				border: "0",
																				background: "transparent",
																				fontSize: "20px",
																				fontWeight: "bolder",
																			}}
																		>
																			-
																		</button>
																	) : (
																		<button
																			onClick={() =>
																				minusProductFromCart(cart.id)
																			}
																			class=""
																			type="button"
																			style={{
																				border: "0",
																				background: "transparent",
																				fontSize: "20px",
																				fontWeight: "bolder",
																			}}
																		>
																			-
																		</button>
																	)}
																</div>
																<input
																	value={cart.qty}
																	type="text"
																	style={{
																		width: "34px",
																		background: "#F6E6DA",
																		borderRadius: "5px",
																		textAlign: "center",
																		border: "0",
																	}}
																/>
																<div class="input-group-append">
																	<button
																		style={{
																			border: "0",
																			background: "transparent",
																			fontSize: "20px",
																			fontWeight: "bolder",
																		}}
																		onClick={() => addProductToCart(cart)}
																	>
																		+
																	</button>
																</div>
															</div>
														</td>
														<td className="text-right">
															<Link
																href="/#"
																onClick={() => deleteProductFromCart(cart.id)}
															>
																<img src="trash.svg" alt="Delete" />
															</Link>
														</td>
													</tr>
												</>
											))}
										</table>
									</div>
									<div className="col-5 pr-0">
										<table
											class="table"
											style={{
												fontFamily: "Avenir",
												fontSize: "14px",
												lineHeight: "19px",
											}}
										>
											<tr
												style={{
													borderTop: "2px solid",
												}}
											>
												<td>Subtotal</td>
												<td className="text-danger text-right">
													{convertToRupiah(getSubTotal(state.carts))}
												</td>
											</tr>
											<tr>
												<td>Qty</td>
												<td className="text-right">{sum(state.carts)}</td>
											</tr>
											<tr>
												<td>ongkir</td>
												<td className="text-danger text-right">
													{convertToRupiah(10000)}
												</td>
											</tr>
											<tr
												className="font-weight-bold text-danger "
												style={{ borderTop: "2px solid black" }}
											>
												<td>Total</td>
												<td className="text-right">
													{convertToRupiah(getTotal(state.carts, 10000))}
												</td>
											</tr>
										</table>
									</div>
								</div>
							</div>
							<div className="my-2 col-10 row px-0 ">
								<div className="col"></div>
								<div className="col-4">
									<button class="btn btn-brown btn-block" type="submit">
										Order
									</button>
								</div>
							</div>
						</>
					) : (
						<div className="col">
							<div className="container-fluid mt-100">
								<div className="row">
									<div className="col-md-12">
										<div className="card">
											<div className="card-body cart">
												<div
													className="col-sm-12 empty-cart-cls text-center"
													style={{ background: "whitesmoke" }}
												>
													{" "}
													<img
														src="https://www.pngitem.com/pimgs/m/174-1749315_shopping-cart-buy-online-icon-png-transparent-png.png"
														width="130"
														height="130"
														class="img-fluid mb-4 mr-3"
													/>
													<h3>
														<strong>Your Cart is Empty</strong>
													</h3>
													<h4>Add something to make me happy :)</h4>{" "}
													<Link to="/" className="btn btn-yellow mb-4">
														continue shopping
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			<Maps show={modalShow} onHide={() => setModalShow(false)} />
		</>
	);
};

export default Cart;
