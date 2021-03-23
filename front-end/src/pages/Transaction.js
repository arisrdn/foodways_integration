import { AuthContext } from "../contexts/authContext";
import { transaction, order, restaurants } from "../API/Data";
import { useContext } from "react";
import { Button, Table } from "react-bootstrap";

// IMG
import cancel from "../compnents/img/cancel.svg";
import succes from "../compnents/img/success.svg";
import otw from "../compnents/img/on-time.svg";

const Transaction = () => {
	const [state, dispatch] = useContext(AuthContext);

	const handleStatus = (status) => {
		switch (status) {
			case 0:
				return <p className="text-danger">Cancel</p>;

			case 1:
				return <p className="text-warning">Waiting Approve</p>;

			case 2:
				return <p className="text-info">On The Way</p>;

			case 3:
				return <p className="text-success">Success</p>;

			default:
				return;
				// <td></td><td></td>
				break;
		}
	};

	return (
		<>
			<div className="container pt-3">
				<div className="row py-3 mt-3 mt-custom justify-content-center">
					<div className="my-2 col-11 ">
						<div className="mb-4">
							<h2>Income Transaction</h2>
						</div>
						<div className="table-responsive">
							<Table
								style={{ backgroundColor: "white", borderColor: "#828282" }}
								className="overflow-auto  table-hover table-bordered table-bordered-black"
							>
								<thead style={{ backgroundColor: "#E5E5E5" }}>
									<tr>
										<th style={{ width: "" }}>No</th>
										<th style={{ width: "15%" }}>Name</th>
										<th style={{ width: "30%" }}>Address</th>
										<th>Product Order</th>
										<th style={{ width: "15%" }}>Status</th>
										<th style={{ width: "15%" }}>Action</th>
									</tr>
								</thead>
								<tbody>
									{/* {incomeList.map((income, index) => ( */}
									<tr>
										<td>sd</td>
										<td>sd</td>
										<td>ds</td>
										<td>
											<div
												style={{
													width: "200px",
													overflow: "hidden",
													whiteSpace: "nowrap",
													textOverflow: "ellipsis",
												}}
											></div>
										</td>
										<td className="text-center text-success">succes</td>
										<td className="text-center">
											<img src={succes} alt="success action" />
										</td>
									</tr>
									<tr>
										<td>sd</td>
										<td>sd</td>
										<td>ds</td>
										<td>
											<div
												style={{
													width: "200px",
													overflow: "hidden",
													whiteSpace: "nowrap",
													textOverflow: "ellipsis",
												}}
											></div>
										</td>
										<td className="text-center text-info">On The Way</td>
										<td className="text-center">
											<img src={otw} alt="on the way" />
										</td>
									</tr>
									<tr>
										<td>sd</td>
										<td>sd</td>
										<td>ds</td>
										<td>
											<div
												style={{
													width: "200px",
													overflow: "hidden",
													whiteSpace: "nowrap",
													textOverflow: "ellipsis",
												}}
											></div>
										</td>
										<td className="text-center text-warning">Waiting Approp</td>
										<td className="text-center">
											<div style={{ display: "flex" }}>
												<Button
													size="sm2"
													variant="danger"
													className="mr-0 mr-lg-2"
												>
													Cancel
												</Button>
												<Button size="sm2" variant="success">
													Approve
												</Button>
											</div>
										</td>
									</tr>
									<tr>
										<td>sd</td>
										<td>sd</td>
										<td>ds</td>
										<td>
											<div
												style={{
													width: "200px",
													overflow: "hidden",
													whiteSpace: "nowrap",
													textOverflow: "ellipsis",
												}}
											></div>
										</td>
										<td className="text-center text-danger">Cancel</td>
										<td className="text-center">
											<img src={cancel} alt="success action" />
										</td>
									</tr>
									<tr>
										<td>sd</td>
										<td>sd</td>
										<td>ds</td>
										<td>
											<div
												style={{
													width: "200px",
													overflow: "hidden",
													whiteSpace: "nowrap",
													textOverflow: "ellipsis",
												}}
											></div>
										</td>
										<td className="text-center text-info">On The Way</td>
										<td className="text-center">
											<img src={otw} alt="on the way" />
										</td>
									</tr>
									{/* ))} */}
								</tbody>
							</Table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Transaction;
