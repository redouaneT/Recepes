import AbstractView from "./AbstractView.js";
export default class Home extends AbstractView {
	constructor() {
		super();
		this.setTitle("Home");
	}
	async getHtml() {
		return `
        <div class="container col-xxl-8 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div class="col-10 col-sm-8 col-lg-6">
            <img src="./static/img/recepe.jpg" class="d-block mx-lg-auto img-fluid" alt="recepe Image" width="700" height="500" loading="lazy">
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-3">Experience the Joy of Cooking with Our Amazing Recipes</h1>
            <p class="lead">Welcome to our recipe website, where you'll find a diverse range of recipes to satisfy any craving or dietary requirement. From savory mains to sweet desserts, our collection has been carefully curated to provide you with delicious and easy-to-follow recipes.</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                <a href="/recepe" class="btn btn-primary btn-lg px-4 me-md-2">View recepes</a>
            </div>
          </div>
        </div>
      </div>
        `;
	}
}
