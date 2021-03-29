import { Link, useParams } from "react-router-dom";
import { API } from "../../config/api";
import { useQuery, useMutation } from "react-query";

import { TextLoading } from "../../compnents/card/CardLoading";
import GetAddress from "../../compnents/utils/getAddress";
import Card from "../../compnents/card/CardMyRestaurant";
import { useState, useEffect } from "react";

import "./assets/index.css";

const Restaurant = () => {
	const {
		data: myData,
		error: myError,
		loading: myLoading,
		refetch,
	} = useQuery("myCache", async () => {
		return await API.get(`/restaurant`);
	});

	const deleteMenu = useMutation(async (id) => {
		await API.delete(`/product/${id}`);
		refetch();
	});

	const deleteById = async (id) => {
		deleteMenu.mutate(id);
	};

	const location = myData?.data?.data?.restaurant?.location;
	const [address, setAddress] = useState("");

	const fetchLocation = async () => {
		const token =
			"pk.eyJ1IjoiaWxoYW0yNSIsImEiOiJja20yczc0dm0zOWczMndwMzVmdmJ1bjI4In0.1l2Zgxjy5R0iW2SlySO_fQ";
		const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?limit=1&access_token=${token}&country=id`;

		const api = await fetch(apiUrl);
		const response = await api.json();

		// console.log(location);÷
		if (response?.features) {
			setAddress(response?.features[0]?.place_name);
		}
	};

	useEffect(() => {
		fetchLocation();
		refetch();
	}, [location]);
	useEffect(() => {
		// refetch();
	});
	return (
		<>
			<div className=" mt-5 pb-3">
				<div className="container pt-3"></div>
			</div>
			<div className="container">
				{myData?.data?.data?.restaurant?.image ? (
					<>
						<div className="row">
							<div className="col-lg-3">
								<div className="profile-sidebar">
									<div className="d-flex justify-content-center px-2">
										<img
											src={
												myData.data.data.url + myData.data.data.restaurant.image
											}
											className="img-responsive"
											alt=""
											style={{
												height: "200px",
												objectFit: "cover",
												width: "100%",
											}}
										/>
									</div>

									<div className="text-center mt-3">
										<h4>{myData.data.data.restaurant.name}</h4>
									</div>
									<div className="text-center mb-3 px-3">
										{address}
										{/* <small>{myData.data.data.restaurant.location}</small> */}
									</div>

									<div className="portlet light bordered">
										<div className="row list-separated profile-stat">
											<div className="col-md-6 col-sm-12">
												<div className="uppercase profile-stat-title">
													{myData.data.data.restaurant.transactions.length}
												</div>
												<div className="uppercase profile-stat-text">
													{" "}
													Transactions{" "}
												</div>
											</div>

											<div className="col-md-6 col-sm-12">
												<div className="uppercase profile-stat-title">
													{myData.data.data.restaurant.products.length}
												</div>
												<div className="uppercase profile-stat-text">
													{" "}
													Product{" "}
												</div>
											</div>
										</div>

										<div>
											<div className="profile-userbuttons">
												<Link
													to="/my-restaurant/edit"
													className="btn btn-brown btn-sm"
												>
													Edit Restaurant
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-9">
								<div className="profile-content row">
									{myLoading ? (
										<TextLoading />
									) : (
										myData.data.data.restaurant.products.map(
											(product, index) => (
												<div className="col-lg-4 col-md-6 col-sm-6">
													<Card
														product={product}
														url={myData.data.data.url2}
														key={product.id}
														deleteById={deleteById}
													/>
												</div>
											)
										)
									)}
								</div>
							</div>
						</div>
					</>
				) : (
					<>loading</>
				)}
			</div>
		</>
	);
};

export default Restaurant;
