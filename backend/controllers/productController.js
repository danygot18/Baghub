const Product = require('../models/product')
const APIFeatures = require('../utils/apiFeatures');

exports.NewProduct = async (req, res, next) => {
	
	// req.body.user = req.body.id;
	const product = await Product.create(req.body);
	res.status(201).json({
		success: true,
		product
	})
}
exports.GetProducts = async (req, res, next) => {
	const products = await Product.find({});
	res.status(200).json({
		success: true,
		count: products.length,
		products
	})
}

// exports.GetProducts = async (req,res,next) => {
	
// 	const resPerPage = 4;
// 	const productsCount = await Product.countDocuments();
// 	const apiFeatures = new APIFeatures(Product.find(),req.query).search().filter(); 

// 	// const products = await Product.find();
// 	apiFeatures.pagination(resPerPage);
// 	const products = await apiFeatures.query;
// 	let filteredProductsCount = products.length;
// 	res.status(200).json({
// 		success: true,
// 		filteredProductsCount,
// 		productsCount,
// 		products,
// 		resPerPage,
// 	})
// }

// exports.NewProduct = async (req, res, next) => {

// 	let images = []
// 	if (typeof req.body.images === 'string') {
// 		images.push(req.body.images)
// 	} else {
// 		images = req.body.images
// 	}

// 	let imagesLinks = [];

// 	for (let i = 0; i < images.length; i++) {
// 		let imageDataUri = images[i]
// 		// console.log(imageDataUri)
// 		try {
// 			const result = await cloudinary.v2.uploader.upload(`${imageDataUri}`, {
// 				folder: 'product',
// 				width: 150,
// 				crop: "scale",
// 			});
	
// 			 imagesLinks.push({
// 				public_id: result.public_id,
// 				url: result.secure_url
// 			})
			
// 		} catch (error) {
// 			console.log(error)
// 		}
		
// 	}

// 	req.body.images = imagesLinks
// 	// req.body.user = req.body.id;

// 	const product = await Product.create(req.body);
// 	if (!product)
// 		return res.status(400).json({
// 			success: false,
// 			message: 'Product not created'
// 		})


// 	res.status(201).json({
// 		success: true,
// 		product
// 	})
// }
