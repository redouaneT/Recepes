//router

import Home from "./views/Home.js";
import Recepe from "./views/Recepe.js";
import RecepeView from "./views/RecepeView.js";
import Favorites from "./views/Favorites.js";
import { CookieUtil } from "./core/CookieUtil.js"; // import cookie module

const pathToRegex = (path) =>
	new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
	const values = match.result.slice(1);

	const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
		(result) => result[1]
	);

	return Object.fromEntries(
		keys.map((key, i) => {
			return [key, values[i]];
		})
	);
};

const router = async () => {
	const routes = [
		{ path: "/", view: Home },
		{ path: "/recepe", view: Recepe },
		{ path: "/recepe-view/:id", view: RecepeView },
		{ path: "/favorites", view: Favorites },
	];
	//match
	const potencialMatches = routes.map((route) => {
		return {
			route: route,
			//isMatch: location.pathname === route.path
			result: location.pathname.match(pathToRegex(route.path)),
		};
	});
	//console.log(potencialMatches)
	let match = potencialMatches.find(
		(potencialMatch) => potencialMatch.result != null
	);

	if (!match) {
		match = {
			route: routes[0],
			result: [location.pathname],
		};
	}

	const view = new match.route.view(getParams(match));
	console.log(document.querySelector("#app"));
	document.querySelector("#app").innerHTML = await view.getHtml();
};

const navigateTo = (url) => {
	history.pushState(null, null, url);
	router();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
	// charger les données
	document.body.addEventListener("click", (e) => {
		if (e.target.matches("[data-link]")) {
			e.preventDefault();
			navigateTo(e.target.href);
		}
	});
	router();
	// set favorites to empty array for seven days
	CookieUtil.setFavorites([], 7);
	// Add event listener for favorite button
	document.body.addEventListener("click", (e) => {
		let icon = e.target;
		if (icon.classList.contains("fa-heart") || icon.tagName == "path") {
			if (icon.tagName == "path") {
				icon = icon.parentElement;
			}
			const recepeId = icon.dataset.recepeid;
			console.log(recepeId);
			// Add or remove recepe from favorites and change icon
			if (CookieUtil.checkFavoriteExists(recepeId)) {
				console.log("remove");
				CookieUtil.removeFavorite(recepeId);
				icon.classList.remove("fas");
				icon.classList.add("far");
			} else {
				console.log("add");
				CookieUtil.addFavorite(recepeId);
				icon.classList.remove("far");
				icon.classList.add("fas");
			}
		}
	});
});
