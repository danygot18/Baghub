const Order = require('../models/order');
const Product = require('../models/product');
const sendEmail = require('../utils/sendEmail');
const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.newOrder = async (req, res, next) => {
    console.log(req.body)
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })
    const listItems = orderItems.map(bags => `
    
    <p>${bags.name}</p>
    <p>${bags.quantity}</p>
    <p>${bags.price}</p>
    <p>${bags.quantity * bags.price}</p>
    `

    )
    const confirmationLink = `<a href="http://localhost:4001/api/v1/confirm?orderId=${order._id}&userEmail=${req.user.email}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">Confirm Order</a>`;
    const message = `an Order has been made by ${req.user.name} 
    ${listItems}
    ${confirmationLink}
    `
    await sendEmail({
        email: 'Baghub@email.com',
        subject: 'Order notif',
        message
    })

    res.status(200).json({
        success: true,
        order,
        message: `Email sent to: Baghub@email.com`
    })
}
exports.confirm = async (req, res, next) => {
    const { orderId, userEmail } = req.query
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }
        const message = `<p>Your order has been confirmed!</p>`
        const pdfDoc = new PDFDocument();
        const pdfFilePath = `./order${orderId}.pdf`;
        const pdfStream = fs.createWriteStream(pdfFilePath);
        const listItems = order.orderItems.map(bags => `   
        ${bags.name}
        ${bags.quantity}
        ${bags.price}
        ${bags.quantity * bags.price}
        `

        ).join('');
        pdfDoc.pipe(pdfStream);
        pdfDoc.text(`${listItems}`)
        pdfDoc.end();
        await sendEmail({
            email: userEmail,
            subject: 'Your Order has been Confirmed',
            message,
            attachments: [{
                filename: 'order.pdf',
                path: pdfFilePath,
                encoding: 'base64',
            }],
        });

        res.status(200).json({
            success: true,
            message: Order`Email sent to: ${userEmail}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }

}

exports.myOrders = async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
}

exports.getSingleOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        return res.status(404).json({ message: `No Order found with this ID` })

    }

    res.status(200).json({
        success: true,
        order
    })
}
exports.adminOrders = async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
}

exports.deleteOrder = async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'No Order found with this ID'
        })

    }
    res.status(200).json({
        success: true
    })
}
exports.updateOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'Delivered') {
        return res.status(404).json({ message: `You have already delivered this order` })

    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()
    await order.save()

    res.status(200).json({
        success: true,
    })
}
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false })
}

