import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Routing from "./Router";

const App = () => {
	return (
		<>
			<Router>
				<Routing />
			</Router>
		</>
	);
};

export default App;
