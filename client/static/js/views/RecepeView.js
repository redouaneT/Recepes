import AbstractView from "./AbstractView.js";
export default class RecepeView extends AbstractView {
	constructor(params) {
		super(params);
		this.setTitle("Recepes");
	}
	async getHtml() {
		// console.log(this.params.id)
		const nu = Number(this.params.id);
		async function getData(url) {
			const response = await fetch(url);
			console.log(response);
			return response.json();
		}
		const data = await getData("/static/js/views/recepe.json");
		const recepe = data.find((item) => item.id === nu);
		let {
			thumbnail_url,
			name,
			description,
			tags,
			credits,
			sections,
			instructions,
			total_time_minutes,
			prep_time_minutes,
			original_video_url,
		} = recepe;
		if (!total_time_minutes) {
			total_time_minutes = "N/A";
		}
		let html = `<div class="container-fluid recepe">
        <div class="row">
          <main class="col-md-9">
            <!-- main content here -->
            <div class="row">
                <div class="col-md-6">
                    <img
                        src="${thumbnail_url}"
                        alt="Spicy chicken curry"
                        class="img-fluid"
                    />
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Ingredients</h5>
                            <ul class="list-group list-group-flush">`;
		if (sections) {
			if (sections[0]) {
				sections[0].components.forEach((Ingredient) => {
					html += `
                                                                                        <li class="list-group-item">
                                                                                           <span class="info"></span> ${Ingredient.raw_text}</span>
                                                                                        </li>`;
				});
			} else if (sections[1]) {
				sections[1].components.forEach((Ingredient) => {
					html += `
                                                                                        <li class="list-group-item">
                                                                                            ${Ingredient.raw_text}
                                                                                        </li>`;
				});
			}
		} else {
			html += `
                                                        <li class="list-group-item">
                                                            Données non disponibles
                                                        </li>`;
		}
		html += `</ul>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Cooking Time</h5>
                            <p class="card-text">Total time: ${total_time_minutes} minutes</p>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Instructions</h5>
                            <ol class="list-group list-group-numbered">`;
		if (instructions) {
			instructions.forEach((instruction) => {
				html += `
                                                                <li class="list-group-item ">
                                                                    ${instruction.display_text}
                                                                </li>`;
			});
		} else {
			html += `
                                                <li class="list-group-item">
                                                    Données non disponibles
                                                </li>`;
		}
		html += `</ol>
                        </div>
                    </div>
                </div>
            </div>
          </main>
          <aside class="col-md-2">
            <div class="row">
                <div class="col-md-12 mb-4">
                    <div class="embed-responsive embed-responsive-16by9">
                        <iframe
                            class="embed-responsive-item"
                            src="${original_video_url}"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            <div class="col-md-12 mb-3">
                <div class="card shadow-lg border-0">
                    <div class="card-body text-center">
                        <h5 class="card-title mb-4">Nutrition Information</h5>
                        <ul class="list-unstyled">
                            <li class="mb-4">
                                <span class="icon bg-danger"><i class="fas fa-fire"></i></span>
                                <span class="info">Calories: 300</span>
                            </li>
                            <li class="mb-4">
                                <span class="icon bg-success"><i class="fas fa-bacon"></i></span>
                                <span class="info">Fat: 15g</span>
                            </li>
                            <li class="mb-4">
                                <span class="icon bg-warning"><i class="fas fa-bread-slice"></i></span>
                                <span class="info">Carbohydrates: 35g</span>
                            </li>
                            <li class="mb-4">
                                <span class="icon bg-info"><i class="fas fa-fish"></i></span>
                                <span class="info">Protein: 10g</span>
                            </li>
                            <li class="mb-4">
                                <span class="icon bg-secondary"><i class="fas fa-leaf"></i></span>
                                <span class="info">Fiber: 5g</span>
                            </li>
                            <li>
                                <span class="icon bg-primary"><i class="fas fa-candy-cane"></i></span>
                                <span class="info">Sugar: 20g</span>
                            </li>
                        </ul>
                    </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>`;
		return html;
	}
}
