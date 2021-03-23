import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const [state, dispatch] = useContext(AuthContext);
	const handleOpenLogin = () => {
		dispatch({
			type: "MODAL_LOGIN_OPEN",
		});
	};

	return (
		<Route
			{...rest}
			render={(props) =>
				state.user.type ? (
					<Component {...props} />
				) : (
					<Redirect to="/?popup=login" />
				)
			}
		/>
	);
};

export default PrivateRoute;
