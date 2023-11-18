const category = require('../models/category');
const cloudinary = require('cloudinary')
const APIFeatures = require('../utils/apiFeatures');
// const APIFeatures = require('../utils/apiFeatures');

// exports.NewCategory = async (req, res, next) => {

//     const category = await category.create(req.body);
//     res.status(201).json({
//         success: true,
//         category
//     })

// }

exports.NewCategory = async (req, res, next) => {



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
                folder: 'category',
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
    req.body.user = req.user.id;

    const categoryResult = await category.create(req.body);
    if (!categoryResult)
        return res.status(400).json({
            success: false,
            message: 'Category not created'
        })


    res.status(201).json({
        success: true,
        categoryResult
    })
}

exports.GetCategory = async (req,res,next) => {
	
	const categories = await category.find();
    res.status(200).json({
        success: true,
        categories
    })
}

exports.deleteCategory = async (req, res, next) => {
	const Category = await category.findByIdAndDelete(req.params.id);
	if (!Category) {
		return res.status(404).json({
			success: false,
			message: 'Category not found'
		})
	}

	res.status(200).json({
		success: true,
		message: 'Category deleted'
	})
}
exports.updateCategory = async (req, res, next) => {
	let Category = await category.findById(req.params.id);
	// console.log(req.body)
	if (!category) {
		return res.status(404).json({
			success: false,
			message: 'Category not found'
		})
	}
	let images = []

    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
	if (images !== undefined) {
        // Deleting images associated with the product
        for (let i = 0; i < category.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(category.images[i].public_id)
        }
	}
	let imagesLinks = [];
	for (let i = 0; i < images.length; i++) {
		const result = await cloudinary.v2.uploader.upload(images[i], {
			folder: 'category'
		});
		imagesLinks.push({
			public_id: result.public_id,
			url: result.secure_url
		})

	}
	req.body.images = imagesLinks
	category = await Category.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindandModify: false
	})
	// console.log(product)
	return res.status(200).json({
		success: true,
		category
	})
}