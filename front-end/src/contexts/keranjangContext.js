import { createContext, useReducer } from "react";

export const KeranjangContext = createContext();

const initialState = { carts: [] };

export const reducer = (state, { type, payload }) => {
	console.log("keranjang contect", state.carts);
	switch (type) {
		case "ADD_CART":
			// console.log("di context", payload);
			const checkProductById = state.carts.find(
				(cart) => cart.id === payload.id
			);
			if (checkProductById) {
				const updatedCarts = state.carts.map((cart) =>
					cart.id === payload.id
						? {
								...cart,
								qty: cart.qty + 1,
						  }
						: cart
				);

				return {
					...state,
					carts: updatedCarts,
				};
			}

			return {
				// //add data
				...state,
				carts: [
					...state.carts,
					{
						...payload,
						qty: 1,
					},
				],
			};
		case "REMOVE_CART":
			const filteredCarts = state.carts.filter(
				(cart) => cart.id !== payload.id
			);

			return {
				...state,
				carts: filteredCarts,
			};
		case "MINUS_CART":
			const checkById = state.carts.find((cart) => cart.id === payload.id);

			if (checkById) {
				const updatedCarts = state.carts.map((cart) =>
					cart.id === payload.id
						? {
								...cart,
								qty: cart.qty - 1,
						  }
						: cart
				);

				return {
					...state,
					carts: updatedCarts,
				};
			}
			return;
		default:
			throw new Error();
	}
};

export const KeranjangContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<>
			<KeranjangContext.Provider value={[state, dispatch]}>
				{children}
			</KeranjangContext.Provider>
		</>
	);
};
