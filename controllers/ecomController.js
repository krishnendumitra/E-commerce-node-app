
const mongoose = require('mongoose');
const shortId = require('shortid');
const ProductModel = mongoose.model('Product');
const responseGen = require('./../libs/responseLib');
const time = require('./../libs/timeLib');
const check = require('./../libs/checkLib');
const logger = require('./../libs/loggerLib');


// getAllProducts
let getAllProducts = (request, response) => {
    ProductModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, "Ecom Controller: getAllProducts", 10);
                response.send(responseGen.generateResponse(true, "internal error", 500, null));
            } else if (check.isArrayEmpty(result)) {
                logger.info("no product found", "Ecom Controller: getAllProducts", 5);
                response.send(responseGen.generateResponse(true, "no product found", 404, null));
            } else {
                response.send(responseGen.generateResponse(false, "all products found", 200, result));
            }
        });
} // end getAllProducts


// getProduct details byId
let getProductById = (request, response) => {

    ProductModel.
        findOne({ 'productId': request.params.productId })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, "Ecom Controller: getProductById", 10);
                response.send(responseGen.generateResponse(true, "internal error", 500, null));
            } else if (check.isEmpty(result)) {
                logger.info('no product found', "Ecom Controller: getProductById", 5);
                response.send(responseGen.generateResponse(true, "no product found", 404, null));
            } else {
                response.send(responseGen.generateResponse(false, "product details found", 200, result));
            }
        });



} // end get product by Id




// getProduct details by category
let getProductByCategory = (request, response) => {

    ProductModel.
        find({ 'category': request.params.category })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, "Ecom Controller: getProductByCategory", 10);
                response.send(responseGen.generateResponse(true, "internal error", 500, null));
            } else if (check.isArrayEmpty(result)) {
                logger.info('no product found', "Ecom Controller: getProductByCategory", 5);
                response.send(responseGen.generateResponse(true, "no products found", 404, null));
            } else {
                response.send(responseGen.generateResponse(false, "products found", 200, result));
            }
        });



} // end get product by Id


// entry product 

let entryProduct = (request, response) => {
    let productId = shortId.generate();


    let newProduct = new ProductModel({
        productId: productId,
        productName: request.body.productName,
        productDetails: request.body.productDetails,
        productImage: {
            thumbnail: request.body.thumbnail,
            large: request.body.large
        },
        large: request.body.large,
        productPrice: request.body.productPrice,
        productPriceDiscount: request.body.productPriceDiscount,
        isPublished: true,
        category: request.body.category,
        seller: request.body.seller,
        posted: time.convertToLocalTime(time.now(), 'Asia/Calcutta').toString(),
        lastUpdated: time.convertToLocalTime(time.now(), 'Asia/Calcutta').toString()

    }) // end new product

    let areaAvailability = (check.isEmpty(request.body.areaAvailability)) ? [] : request.body.areaAvailability.split(',').map(function (item) {
        return item.trim();
    });
    newProduct.areaAvailability = areaAvailability;


    let seoTags = (check.isEmpty(request.body.seoTags)) ? [] : request.body.seoTags.split(',').map(function (item) {
        return item.trim();
    });
    newProduct.seoTags = seoTags;

    newProduct.save((err, result) => {
        if (err) {
            logger.error(err.message, "Ecom Controller: EntryProduct", 10);
            response.send(responseGen.generateResponse(true, "no product found", 500, null));
        } else {
            let insertedData = result.toObject();
            insertedData.__v = undefined;
            insertedData._id = undefined;
            response.send(responseGen.generateResponse(false, "product posted successfully", 200, insertedData));
        }
    });

} // entry product end


// deleteProduct

let deleteProduct = (request, response) => {
    ProductModel.deleteMany({ 'productId': request.params.productId }, (err, result) => {
        if (err) {
            logger.error(err.message, "Ecom Controller: DeleteProduct", 10);
            response.send(responseGen.generateResponse(true, "internal error", 500, null));
        } else if (result.n === 0) {
            logger.info('product not found', "Ecom Controller: EntryProduct", 5);
            response.send(responseGen.generateResponse(true, "product not found", 404, result));
        } else {
            response.send(responseGen.generateResponse(false, "product deleted successfully", 200, result));
        }
    });
} // end delete



//edit product

let editProduct = (request, response) => {

    let options = request.body;



    if (!check.isEmpty(options.areaAvailability)) {
        options.areaAvailability = options.areaAvailability.split(',').map(function (item) {
            return item.trim();
        });
    }

    if (!check.isEmpty(options.seoTags)) {
        options.seoTags = options.seoTags.split(',').map(function (item) {
            return item.trim();
        });
    }

    options.lastUpdated = time.convertToLocalTime(time.now(), 'Asia/Calcutta').toString();
    // multi helps to update all records if find more than one
    ProductModel.updateOne({ 'productId': request.params.productId },
        options, { multi: true }).exec((err, result) => {
            if (err) {
                logger.error(err.message, "Ecom Controller: EditProduct", 10);
                response.send(responseGen.generateResponse(true, "internal error", 500, null));
            } else if (check.isEmpty(result)) {
                logger.info("no product found", "Ecom Controller: EditProduct", 5);
                response.send(responseGen.generateResponse(true, "no product found", 404, null));
            } else if (result.n === 0) {
                logger.info('product not found', "Ecom Controller: EntryProduct", 5);
                response.send(responseGen.generateResponse(true, "product not found", 404, result));
            }
            else {
                // sending json response
                response.send(responseGen.generateResponse(false, "product updated successfully", 200, result));
            }

        });
} // end edit product


let increaseProductView = (request, response) => {
    ProductModel.findOne({ 'productId': request.params.productId }, (err, result) => {
        if (err) {
            logger.error(err.message, "Ecom Controller: increaseProductView", 10);
            response.send(responseGen.generateResponse(true, "internal error", 500, null));
        } else if (check.isEmpty(result)) {
            logger.info("no product found", "Ecom Controller: increaseProductView", 5);
            response.send(responseGen.generateResponse(true, "no product found", 404, null));
        } else {
            // up[dating value
            result.productViews += 1;
            // saving in db
            result.save((err, result) => {
                if (err) {
                    logger.error(err.message, "Ecom Controller: increaseProductView", 10);
                    response.send(responseGen.generateResponse(true, "internal error", 500, null));
                } else if (check.isEmpty(result)) {
                    logger.info("no product found", "Ecom Controller: increaseProductView", 5);
                    response.send(responseGen.generateResponse(true, "no product found", 404, null));
                } else {
                    let data = {
                        info: 'you viewed this product'
                    }
                    response.send(responseGen.generateResponse(false, "product view count increased by 1", 200, data));

                }

            }); // end result save
        }

    });

}

// add to cart
let addToCustomerCart = (request, response) => {

    // checking if that product id has the customer id in cart list or not
    ProductModel.findOne({
        $and: [
            { 'productId': request.body.productId }, { 'inCartOfCustomers': request.body.customerId }]
    }, (err, result) => {
        if (err) {
            logger.error(err.message, "Ecom Controller: addToCustomerCart", 10);
            response.send(responseGen.generateResponse(true, "internal error", 500, null));
        } else if (check.isEmpty(result)) {

            // two conditions not satisfied means product does not have customerId
            //hence finding that product again to insert customer id

            ProductModel.findOne({ 'productId': request.body.productId }, (err, result) => {
                if (err) {
                    logger.error(err.message, "Ecom Controller: addToCustomerCart", 10);
                    response.send(responseGen.generateResponse(true, "internal error", 500, null));
                } else if (check.isEmpty(result)) {
                    logger.info("no product found", "Ecom Controller: addToCustomerCart", 5);
                    response.send(responseGen.generateResponse(true, "no product found", 404, null));
                } else {

                    // push customer id  to array

                    result.inCartOfCustomers.push(request.body.customerId);

                    // saving in db
                    result.save((err, result) => {
                        if (err) {
                            logger.error(err.message, "Ecom Controller: addToCustomerCart", 10);
                            response.send(responseGen.generateResponse(true, "internal error", 500, null));
                        } else if (check.isEmpty(result)) {
                            logger.info("no product found", "Ecom Controller: addToCustomerCart", 5);
                            response.send(responseGen.generateResponse(true, "no product found", 404, null));
                        } else {
                            let data = {
                                message: `product add to cart of customer having id : ${request.body.customerId}`
                            }
                            response.send(responseGen.generateResponse(false, "added to cart", 200, data));

                        }

                    }); // end result save
                }
            })

        } else {
            response.send(responseGen.generateResponse(true, "Already added to cart", 404, null));
        }

    });

} // end add to cart

// remove from cart
let removeFromCart = (request, response) => {

    ProductModel.update(
        { 'productId': request.body.productId }, { $pull: { 'inCartOfCustomers': request.body.customerId } }
        , (err, result) => {
            if (err) {
                logger.error(err.message, "Ecom Controller: removeFromCart", 10);
                response.send(responseGen.generateResponse(true, "internal error", 500, null));
            } else if (check.isEmpty(result)) {
                logger.info("product not found in cart", "Ecom Controller: removeFromCart", 5);
                response.send(responseGen.generateResponse(true, "product not found in cart", 404, null));
            } else if (result.nModified === 0) {
                logger.info("product not found in cart", "Ecom Controller: removeFromCart", 5);
                response.send(responseGen.generateResponse(true, "product not found in cart", 404, null));
            } else {
                response.send(responseGen.generateResponse(false, `removed from cart of customer having id : ${request.body.customerId}`, 404, null));
            }

        });

} // end remove from cart

module.exports = {
    getAllProducts: getAllProducts,
    entryProduct: entryProduct,
    deleteProduct: deleteProduct,
    editProduct: editProduct,
    getProductById: getProductById,
    getProductByCategory: getProductByCategory,
    increaseProductView: increaseProductView,
    addToCustomerCart: addToCustomerCart,
    removeFromCart: removeFromCart
}

