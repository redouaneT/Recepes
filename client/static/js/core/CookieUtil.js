export class CookieUtil {
	// set favorites to empty array for seven days
	static setFavorites(favoriteIds, expirationDays = 7) {
		CookieUtil.setCookie("favoriteRecipes", favoriteIds, expirationDays);
		console.log(favoriteIds);
	}

	// get favorites from cookie
	static getFavorites() {
		return CookieUtil.getCookie("favoriteRecipes") || [];
	}
	//  add favorite to cookie
	static addFavorite(id, expirationDays = 7) {
		const favorites = CookieUtil.getFavorites();
		favorites.push(id);
		CookieUtil.setFavorites(favorites, expirationDays);
	}
	// get favorite by id
	static getFavoriteById(id) {
		const favorites = CookieUtil.getFavorites();
		return favorites.find((favoriteId) => favoriteId === id);
	}
	// remove favorite by id
	static removeFavorite(id) {
		const favorites = CookieUtil.getFavorites();
		const newFavorites = favorites.filter((favoriteId) => favoriteId !== id);
		CookieUtil.setFavorites(newFavorites);
	}
	// check if favorite exists
	static checkFavoriteExists(id) {
		const favorites = CookieUtil.getFavorites();
		console.log(typeof id);
		console.log(favorites);
		return favorites.includes(id);
	}
	// get cookie by name
	static getCookie(name) {
		let cookies = document.cookie.split("; ");
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].split("=");
			if (cookie[0] === name) {
				return JSON.parse(decodeURIComponent(cookie[1]));
			}
		}
		return null;
	}

	static setCookie(name, value, expirationDays) {
		let expires;
		if (expirationDays) {
			let date = new Date();
			date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
			expires = "; expires=" + date.toUTCString();
		} else {
			expires = "";
		}
		document.cookie =
			name +
			"=" +
			encodeURIComponent(JSON.stringify(value)) +
			expires +
			"; path=/";
	}

	static removeCookie(name) {
		document.cookie =
			name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	}
}
