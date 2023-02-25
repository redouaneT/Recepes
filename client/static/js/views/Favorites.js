import AbstractView from "./AbstractView.js";
import { CookieUtil } from "../core/CookieUtil.js";
export default class Favorites extends AbstractView {
	constructor() {
		super();
		this.setTitle("Favorites");
	}
	async getHtml() {
		let favorites = [];
		const favoriteIds = CookieUtil.getFavorites();
		async function getData(url) {
			const response = await fetch(url);
			console.log(response);
			return response.json();
		}

		const data = await getData("/static/js/views/recepe.json");
		favoriteIds.forEach((favoriteId) => {
			console.log(typeof favoriteId);
			favorites.push(data.find((item) => item.id === parseInt(favoriteId)));
		});

		let html = `<div class="container-fluid"> <div class="album py-5 bg-light">
        <div class="container">
       
            <div class="row">
            <h1 class="display-4">My favorite recepes</h1>`;
		console.log(favorites);
		favorites.forEach((recepe) => {
			let {
				thumbnail_url,
				name,
				description,
				tags,
				slug,
				credits,
				total_time_minutes,
				prep_time_minutes,
				id,
			} = recepe;
			if (!total_time_minutes) {
				total_time_minutes = "N/A";
			}
			html += `<div class="col-md-4">
                        <div class="card mb-4 hover box-shadow">
                            <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="${thumbnail_url}" data-holder-rendered="true">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="card-title">${name}</h5>
                                    <div class="favorites"> `;
			id = "" + id;
			console.log(typeof id);

			if (CookieUtil.checkFavoriteExists(id)) {
				html += `<i id="favorite-icon" data-recepeid="${id}" class="fas fa-heart"></i> `;
			} else {
				html += `<i id="favorite-icon" data-recepeid="${id}" class="far fa-heart"></i> `;
			}

			html += `</div>
                                </div>
                               
                                <p class="card-text">${
																	description
																		? description.substring(0, 85)
																		: slug
																}...</p>
                                    <div class="d-flex flex-wrap mb-3">`;
			tags.forEach((tag) => {
				html += `<span class="badge badge-pill badge-secondary m-1" style="background-color: #6c6b6b !important" >${tag.name}</span>`;
			});
			html += `</div>
                                    <p class="card-text"><small class="text-muted">Preparation Time: ${total_time_minutes}  minutes</small></p>
                        
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group">
                                            <a href="/recepe-view/${id}" type="button" class="btn btn-sm btn-outline-secondary">View</a>
                                        </div>
                                        <p class="card-text"><small class="text-muted">Author: ${credits[0].name}</small></p>
                                    </div>
                            </div>
                        </div>
                    </div>`;
		});
		html += `</div>
            </div>
        </div> 
        </div>`;

		return html;
	}
}
