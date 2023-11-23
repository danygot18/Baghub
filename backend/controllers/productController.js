const product = require('../models/product');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary')
const category = require('../models/category')

// exports.NewProduct = async (req, res, next) => {
	
// 	// req.body.user = req.body.id;
// 	const product = await Product.create(req.body);
// 	res.status(201).json({
// 		success: true,
// 		product
// 	})
// }
exports.GetProducts = async (req, res, next) => {
	const resPerPage = 4;
	const productsCount = await product.countDocuments();
	const apiFeatures = new APIFeatures(product.find(),req.query).search().filter(); 

    apiFeatures.pagination(resPerPage);
	const products = await apiFeatures.query;
	let filteredProductsCount = products.length;
	res.status(200).json({
		success: true,
		filteredProductsCount,
		productsCount,
		products,
		resPerPage,
	})
}

exports.NewProduct = async (req, res, next) => {

    let images = []

    if (req.files) {

        req.files.forEach(file => {
            images.push(file.path)
        });
    }

    if (req.file) {
        images.push(req.file.path)
    }

    if (req.body.images) {
        if (typeof req.body.images === 'string') {
            images.push(req.body.images)
        } else {
            images = req.body.images
        }
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        let imageDataUri = images[i]
        // console.log(imageDataUri)
        try {
            const result = await cloudinary.v2.uploader.upload(`${imageDataUri}`, {
                folder: 'baghub/product',
                width: 150,
                crop: "scale",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })

        } catch (error) {
            console.log(error)
        }

    }

    req.body.images = imagesLinks
    req.body.user = req.body.id;

    const productResult = await product.create(req.body);
    if (!productResult)
        return res.status(400).json({
            success: false,
            message: 'Product not created'
        })


    res.status(201).json({
        success: true,
        productResult
    })
}

exports.getAdminProductsShow = async (req, res, next) =>{
    const products = await product.find()
    res.status(201).json({
        success: true,
        products
    })
}

exports.getAdminProducts = async (req, res, next) => {

	const products = await product.find().populate({
        path:"category", 
        model: category

    });

	res.status(200).json({
		success: true,
		products
	})

}

exports.deleteProduct = async (req, res, next) => {
    const Products = await product.findByIdAndDelete(req.params.id);
    if (!Products) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    res.status(200).json({
        success: true,
        message: 'Product deleted'
    })
}
exports.updateProduct = async (req, res, next) => {

    console.log(req.body)
    let products = await product.findById(req.params.id);

    if (!products) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    if (req.body.images) {

        let images = [];

        if (typeof req.body.images === 'string') {
            images.push(req.body.images)
        } else {
            images = req.body.images
        }
    
        if (images !== undefined) {
            for (let i = 0; i < products.images.length; i++) {
                const result = await cloudinary.v2.uploader.destroy(products.images[i].public_id)
            }
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            console.log(images[i])
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'baghub/product'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })

        }
        req.body.images = imagesLinks
    }

    products = await product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindandModify: false
    })

    return res.status(200).json({
        success: true,
        products
    })

}
exports.getSingleProduct = async (req, res, next) => {
	const products = await product.findById(req.params.id);
	if (!products) {
		return res.status(404).json({
			success: false,
			message: 'Product not found'
		})
	}
	res.status(200).json({
		success: true,
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
