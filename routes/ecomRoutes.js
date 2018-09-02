const ecomController = require('./../controllers/ecomController');
const appConfig = require('./../config/appConfig');
// authentication for secure api access
const auth = require('./../middlewares/auth');

let setRouter = (app) => {

	let baseUrl = appConfig.apiVersion + '/products';

	//create Product

	app.post(baseUrl + '/create', auth.isAuthenticated, ecomController.entryProduct);

	/**
	* @api {post} /api/v1/products/create Create product
	* @apiVersion 1.0.0
	* @apiGroup create
	*
	* @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	* @apiParam {String} productName name of the product passed as a body parameter
	* @apiParam {String} productDetails details of the product passed as a body parameter
	* @apiParam {String} thumbnail thumbnail image of the product passed as a body parameter
	* @apiParam {String} large large image of the product passed as a body parameter
	* @apiParam {Number} productPrice price of the product passed as a body parameter
	* @apiParam {Number} productPriceDiscount price discount of the product passed as a body parameter
	* @apiParam {String} category category of the product passed as a body parameter
	* @apiParam {String} seller seller of the product passed as a body parameter 
	* @apiParam {String} seoTags seo tags of the product passed as a body parameter (multiple values should be separated by commas)
	* @apiParam {String} areaAvailability area availability of the product passed as a body parameter (multiple values should be separated by commas)
	*
	*  @apiSuccessExample {json} Success-Response:
	*  {
	   error: false,
	   message: "product Created successfully",
	   status: 200,
	   data: [{
					
						productImage: {
							thumbnail: "string",
							large: "string"
						},
						productName: "string",
						productDetails: "string",
						productPrice: "number",
						productPriceDiscount: "number",
						productViews: "number",
						isPublished: "boolean",
						category: "string",
						seller: "string",
						areaAvailability: "string"(type = array),
						seoTags: "string"(type = array),
						posted: "string",
						lastUpdated: "string",
						inCartOfCustomers: "string"(type = array),
						productId: "string"
					}]
				}
	    	}
   	*}
	  @apiErrorExample {json} Error-Response:
	*
	*{
	    error: true,
	    message: "internal error",
	    status: 500,
	    data: null
	*}
	*/


	//read Product

	app.get(baseUrl + '/all', auth.isAuthenticated, ecomController.getAllProducts);


    /**
	 * @api {get} /api/v1/products/all Get all products
	 * @apiVersion 1.0.0
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    error: false,
	    message: "all products found",
	    status: 200,
	    data: [{
					productImage: {
						thumbnail: "string",
						large: "string"
					},
					productName: "string",
					productDetails: "string",
					productPrice: number,
					productPriceDiscount: number,
					productViews: number,
					isPublished: boolean,
					category: "string",
					seller: "string",
					areaAvailability: "string"(type = array),
					seoTags: "string"(type = array),
					posted: "string",
					lastUpdated: "string",
					inCartOfCustomers: "string"(type = array),
					productId: "string"
            		}]
	    		}
		 	}
	 *}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
        error: true,
        message: "internal error",
        status: 500,
        data: null
	  *}
	 */


	app.get(baseUrl + '/view/by/:productId', auth.isAuthenticated, ecomController.getProductById);


	/**
	 * @api {get} /api/v1/products/view/by/:productId Get information of a particular product
	 * @apiVersion 1.0.0
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId productId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    error: false,
	    message: "product details found",
	    status: 200,
	    data: [{
					productImage: {
						thumbnail: "string",
						large: "string"
					},
					productName: "string",
					productDetails: "string",
					productPrice: number,
					productPriceDiscount: number,
					productViews: number,
					isPublished: boolean,
					category: "string",
					seller: "string",
					areaAvailability: "string"(type = array),
					seoTags: "string"(type = array),
					posted: "string",
					lastUpdated: "string",
					inCartOfCustomers: "string"(type = array),
					productId: "string"
            		}]
	    		}
		 	}
	 * }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
        error: true,
        message: "internal error",
        status: 500,
        data: null
	 *}
	 */



	app.get(baseUrl + '/view/by/category/:category', auth.isAuthenticated, ecomController.getProductByCategory);



	/**
	 * @api {get} /api/v1/products/view/by/category/:category Get all products by category
	 * @apiVersion 1.0.0
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} category category of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    error: false,
	    message: "product details found",
	    status: 200,
	    data: [{
					productImage: {
						thumbnail: "string",
						large: "string"
					},
					productName: "string",
					productDetails: "string",
					productPrice: number,
					productPriceDiscount: number,
					productViews: number,
					isPublished: boolean,
					category: "string",
					seller: "string",
					areaAvailability: "string"(type = array),
					seoTags: "string"(type = array),
					posted: "string",
					lastUpdated: "string",
					inCartOfCustomers: "string"(type = array),
					productId: "string"
            		}]
	    		}
		 	}
	 * }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
        error: true,
        message: "internal error",
        status: 500,
        data: null
	 *}
	 */



	//delete Product


	app.post(baseUrl + '/:productId/delete', auth.isAuthenticated, ecomController.deleteProduct);

	/**
   * @api {post} /api/v1/products/:productId/delete Delete product
   * @apiVersion 1.0.0
   * @apiGroup delete
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
   * @apiParam {String} productId productId of the product passed as the URL parameter
   *
   *  @apiSuccessExample {json} Success-Response:
   *  {
	  	error: false,
	  	message: "product deleted successfully",
	  	status: 200,
	  	data: {
		  		n: number,
		  		ok: number
	  		}
	* }

	  @apiErrorExample {json} Error-Response:
	 *
	 * {
        error: true,
        message: "internal error",
        status: 500,
        data: null
	  *}
	 */



	//update Product


	app.put(baseUrl + '/:productId/edit', auth.isAuthenticated, ecomController.editProduct);

    /**
	 * @api {put} /api/v1/products/:productId/edit Edit product
	 * @apiVersion 1.0.0
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId productId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    	error: false,
	    	message: "product Edited Successfully.",
	    	status: 200,
	    	data: [{
            		productImage:{
                			thumbnail: "string",
                			large: "string"
					},
            		productName: "string",
            		productDetails: "string",
            		productPrice: number,
            		productPriceDiscount: number,
            		productViews: number,
            		isPublished: boolean,
            		category: "string",
            		seller: "string",
            		areaAvailability: "string"(type = array),
            		seoTags: "string"(type = array),
            		posted: "string",
            		lastUpdated: "string",
            		inCartOfCustomers: "string"(type = array),
            		productId: "string"
                	}]
	    		}
			}
	 * }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
        error: true,
        message: "internal error",
        status: 500,
        data: null
	  *}
	 */


	app.post(baseUrl + '/:productId/count/view', auth.isAuthenticated, ecomController.increaseProductView);



    /**
	 * @api {post} /api/v1/products/:productId/count/view Increase product's view count
	 * @apiVersion 1.0.0
	 * @apiGroup update
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId productId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    		error: false,
    		message: "product view count increased by 1",
    		status: 200,
    		data: {
        			info: "you viewed this product"
    			}

	 * }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
        error: true,
        message: "internal error",
        status: 500,
        data: null
	  *}
	 */

	app.post(baseUrl + '/cart/add', auth.isAuthenticated, ecomController.addToCustomerCart);




    /**
	 * @api {post} /api/v1/products/cart/add add product to customer cart 
	 * @apiVersion 1.0.0
	 * @apiGroup update
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId productId of the product passed as the body parameter
	 * @apiParam {String} customerId customerId of the product passed as the body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    		error: false,
    		message: "added to cart",
    		status: 200,
    		data: {
        			message: "product add to cart of customer having id :customerId"
			}
	 * }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
        error: true,
        message: "internal error",
        status: 500,
        data: null
	  *}
	 */




	app.post(baseUrl + '/cart/remove', auth.isAuthenticated, ecomController.removeFromCart);



    /**
	 * @api {post} /api/v1/products/cart/remove remove product from customer cart
	 * @apiVersion 1.0.0
	 * @apiGroup update
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId productId of the product passed as the body parameter
	 * @apiParam {String} customerId customerId of the product passed as the body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    		error: false,
    		message: "removed from cart of customer having id :customerId",
    		status: 404,
    		data: null
	 * }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
        error: true,
        message: "internal error",
        status: 500,
        data: null
      *}
	 */


}; // end setRouter


module.exports = {
	setRouter: setRouter
};