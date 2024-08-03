import { jwtDecode } from "jwt-decode";
import { Cookies } from "quasar";

/**
 * Extract the values inside the coded token
 *
 * @returns decodedToken
 */
export const decodedToken = async () => {
	const token = await Cookies.get("token");
	if (token != null) {
		return jwtDecode(token);
	}
	return null;
};

export const tokenManagement = {

	/**
	 * extract the token inside the cookie
	 *
	 * @returns token: string | null
	 */
	getJwt: () => {
		try {
			const token = Cookies.get("token");
			return token ? token : null;
		} catch (error) {
			console.log(error);
			return null;
		}
	},



	/**
	 * Set the token inside a cookie and return true if done correctly
	 *
	 * @param {*} token
	 * @returns Boolean
	 */
	setJwt: (token) => {
		try {
			Cookies.set("token", token, {
				expires: "2h",
				path: "/",
				sameSite: "Strict",
			});
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	},



	/**
	 * Delete the token inside the cookie
	 *
	 * @returns Boolean
	 */
	deleteJwt: () => {
		try {
			Cookies.remove("token", {
				expires: "2h",
				path: "/",
			});
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	},
};
