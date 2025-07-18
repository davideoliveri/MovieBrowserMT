import React, { createContext, useContext, useReducer, useEffect, act } from "react";
import { Movie } from "../interfaces/MovieInterface";
import { MovieDetailsData } from "../interfaces/MovieDetailsDataInterface";
import { WishlistEntry } from "../interfaces/WishlistEntryInterface";

type State = WishlistEntry[]
type Action = { type: 'ADD', entry: WishlistEntry } | { type: 'REMOVE', id: number }

const WishlistContext = createContext<{
	state: State
	dispatch: React.Dispatch<Action>
}>({state: [], dispatch: () => null})

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case ("ADD"):
			return [action.entry, ...state]
		case ("REMOVE"):
			console.log("removing from reducer")
			return state.filter((entry) => entry.id !== action.id)
		default:
			return state
	}
}

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, [], () => {
		try {
			const json: string | null = localStorage.getItem("wishlist")
			if (!json) {
				return []
			} else {
				return JSON.parse(json)
			}
		} catch {
			return []
		}

	})

	useEffect(() => {
		localStorage.setItem("wishlist", JSON.stringify(state))
	}, [state])

	return (
		<WishlistContext.Provider value={{state, dispatch}}>
			{ children }
		</WishlistContext.Provider>
	)
}

export const useWishlist = () => useContext(WishlistContext)