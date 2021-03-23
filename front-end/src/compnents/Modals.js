import React from "react";
import { useHistory } from "react-router-dom";
import Card from "./Card";

const Modal = () => {
	const history = useHistory();

	const closeModal = (e) => {
		e.stopPropagation();
		history.goBack();
	};

	React.useEffect(() => {
		document.body.classList.add("overflow-hidden");

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, []);

	return (
		<div
			onClick={closeModal}
			role="dialog"
			aria-modal="true"
			class="fade modal show"
			tabindex="-1"
			style={{
				display: "block",
				// position: "absolute",
				// top: 0,
				// left: 0,
				// bottom: 0,
				// right: 0,
				background: "rgba(0, 0, 0, 0.50)",
			}}
		></div>
	);
};

export default Modal;
