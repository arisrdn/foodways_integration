import { Modal, Col, Row, Button } from "react-bootstrap";
// import Map from "./Map";
import Map from "./MapsAll";
import { useState, useCallback, useEffect } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import Pin from "./Pin";

// import ControlPanel from "./control/control-panel";

function ModalMap(props) {
	const { from } = props;
	const [place, setPlace] = useState("");
	const [address, setAddress] = useState("");

	const fetchLocation = async () => {
		const lng = 106.91905;
		const lat = -6.9123;
		const token =
			"pk.eyJ1IjoiaWxoYW0yNSIsImEiOiJja20yczc0dm0zOWczMndwMzVmdmJ1bjI4In0.1l2Zgxjy5R0iW2SlySO_fQ";
		const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?limit=1&access_token=${token}`;

		const api = await fetch(apiUrl);
		const response = await api.json();

		setPlace(response.features[0].text);
		setAddress(response.features[0].place_name);
	};
	const renderDialog = () => {
		switch (from) {
			case "delivery":
				return (
					<div
						className="shadow p-3 overflow-auto"
						style={{
							width: "400px",
							height: "200px",
							position: "absolute",
							left: "50%",
							bottom: "0",
							backgroundColor: "white",
							transform: "translateX(-50%)",
							borderRadius: "5px",
						}}
					>
						<Row className="mb-2">
							<Col>
								<h5 className="font-weight-bold mb-0">
									Select delivery location
								</h5>
							</Col>
						</Row>
						<Row className="mb-3">
							<Col lg={2}>
								{/* <img src={iconMapPointer} alt="map pointer" width="55" /> */}
							</Col>
							<Col lg={10}>
								<Row>
									<Col lg={12}>
										{/* <small className="font-weight-bold">{place}</small> */}
									</Col>

									<Col lg={12} style={{ lineHeight: "1" }}>
										{/* <small className="text-sm">{address}</small> */}
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button
									// onClick={handleMapClose}
									variant="brown"
									className="w-100"
								>
									Confirm Location
								</Button>
							</Col>
						</Row>
					</div>
				);
				break;
			case "order":
				return (
					<div
						className="shadow p-3 overflow-auto"
						style={{
							width: "500px",
							height: "350px",
							position: "absolute",
							right: "30px",
							top: "30px",
							backgroundColor: "white",
							borderRadius: "5px",
						}}
					>
						<Row className="mb-4">
							<Col>
								<h5 className="font-weight-bold mb-0">
									Waiting for the transaction to be approved
								</h5>
							</Col>
						</Row>
						<Row className="mb-5">
							<Col lg={2}>
								{/* <img src={iconMapPointer} alt="map pointer" width="55" /> */}
							</Col>
							<Col lg={10}>
								<Row>
									<Col lg={12}>
										{/* <small className="font-weight-bold">{place}</small> */}
									</Col>

									<Col lg={12} style={{ lineHeight: "1" }}>
										{/* <small className="text-sm">{address}</small> */}
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col lg={12} className="mb-4">
								<h5 className="font-weight-bold mb-0">Delivery Time</h5>
							</Col>
							<Col>
								<p>10 - 15 minutes</p>
							</Col>
						</Row>
						{/* {isFinished && (
							<Row className="mt-4">
								<Col lg={12}>
									<Button
										variant="brown"
										className="w-100"
										onClick={handleFinished}
									>
										Finished Order
									</Button>
								</Col>
							</Row>
						)} */}
					</div>
				);
				break;
			case "user":
				return (
					<div
						className="shadow p-3 overflow-auto"
						style={{
							width: "400px",
							height: "200px",
							position: "absolute",
							left: "50%",
							bottom: "0",
							backgroundColor: "white",
							transform: "translateX(-50%)",
							borderRadius: "5px",
						}}
					>
						<Row className="mb-2">
							<Col>
								<h5 className="font-weight-bold mb-0">Select my location</h5>
							</Col>
						</Row>
						<Row className="mb-3">
							<Col lg={2}>
								{/* <img src={iconMapPointer} alt="map pointer" width="55" /> */}
							</Col>
							<Col lg={10}>
								<Row>
									<Col lg={12}>
										{/* <small className="font-weight-bold">{place}</small> */}
									</Col>

									<Col lg={12} style={{ lineHeight: "1" }}>
										{/* <small className="text-sm">{address}</small> */}
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button
									// onClick={handleMapClose}
									variant="brown"
									className="w-100"
								>
									Confirm Location
								</Button>
							</Col>
						</Row>
					</div>
				);
				break;

			default:
				break;
		}
	};

	useEffect(() => {
		// from === "order" &&
		//   setTimeout(() => {
		//     setIsFinished(true);
		//   }, 5000);

		fetchLocation();
	}, []);
	return (
		<div className="">
			<Modal
				{...props}
				// show
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Select Map</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ height: "500px" }}>
					<Map>
						{props.children}
						{renderDialog()}
					</Map>
				</Modal.Body>
				<Modal.Footer></Modal.Footer>
			</Modal>
		</div>
	);
}
export default ModalMap;
