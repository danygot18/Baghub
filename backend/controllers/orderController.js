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
    
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Details</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        main {
            background-color: #fff;
            width: 600px;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
        }

        p {
            color: #555;
            margin-bottom: 10px;
        }

        .confirmation {
            font-style: italic;
            margin-top: 20px;
            color: #888;
        }

        .thank-you {
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            color: #27ae60;
        }
    </style>
</head>

<body>
    <main>
        <h2>Product Details</h2>

        <p>Product name: ${bags.name}</p>
        <p>Quantity: ${bags.quantity}</p>
        <p>Price: ${bags.price}</p>
        <p>Total Amount: ${bags.quantity * bags.price}</p>

        <div class="confirmation">
            <p>Your order is now confirmed and will be processed promptly.</p>
            <p>We appreciate your business and look forward to serving you again.</p>
            <p>If you have any questions or require further assistance, feel free to reach out to our customer support
                team at 09988.</p>
        </div>
        <p> an Order has been made by ${req.user.name}
        </p>
        <br>    
        <div style="display: flex; justify-content: center;">

            <a href="http://localhost:4001/api/v1/confirm?orderId=${order._id}&userEmail=${req.user.email}"
                style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">Confirm
                Order</a>
        </div>
        <br>
        <div class="thank-you">
            <p>Thank you for choosing BAGHUB!</p>
        </div>
    </main>
</body>

</html>
    `

    )
    // const confirmationLink = `<a href="http://localhost:4001/api/v1/confirm?orderId=${order._id}&userEmail=${req.user.email}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">Confirm Order</a>`;
    const message = `an Order has been made by ${req.user.name} `
    // ${listItems}
    // ${confirmationLink}
   
    await sendEmail({
        email: 'Baghub@email.com',
        subject: 'Order notif',
        message:listItems
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
        Product name: ${bags.name}
        Quantity:     ${bags.quantity}
        Price:        ${bags.price}
        Total Amount  ${bags.quantity * bags.price}
        `).join('');
        pdfDoc.pipe(pdfStream);
        pdfDoc.font('Helvetica');
        pdfDoc.text('BAGHUB', { align: 'center' });
        pdfDoc.moveDown();
        pdfDoc.text('Your order has been confirmed.');
        pdfDoc.moveDown();
        pdfDoc.text('Order Details:', { align: 'center'});
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


exports.totalOrders = async (req, res, next) => {
    const totalOrders = await Order.aggregate([
        {
            $group: {
                _id: null,
                count: { $sum: 1 }
            }
        }
    ])
    if (!totalOrders) {
        return res.status(404).json({
            message: 'error total orders',
        })
    }
    res.status(200).json({
        success: true,
        totalOrders
    })

}

exports.totalSales = async (req, res, next) => {
    const totalSales = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalSales: { $sum: "$totalPrice" }
            }
        }
    ])
    if (!totalSales) {
        return res.status(404).json({
            message: 'error total sales',
        })
    }
    res.status(200).json({
        success: true,
        totalSales
    })
}

exports.customerSales = async (req, res, next) => {
    const customerSales = await Order.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'userDetails'
            },
        },
        // {
        //     $group: {
        //         _id: "$user",
        //         total: { $sum: "$totalPrice" },
        //     }
        // },

        { $unwind: "$userDetails" },
        // {
        //     $group: {
        //         _id: "$user",
        //         total: { $sum: "$totalPrice" },
        //         doc: { "$first": "$$ROOT" },

        //     }
        // },

        // {
        //     $replaceRoot: {
        //         newRoot: { $mergeObjects: [{ total: '$total' }, '$doc'] },
        //     },
        // },
        {
            $group: {
                _id: "$userDetails.name",
                total: { $sum: "$totalPrice" }
            }
        },
        // {
        //     $project: {
        //         _id: 0,
        //         "userDetails.name": 1,
        //         total: 1,
        //     }
        // },
        { $sort: { total: -1 } },

    ])
    console.log(customerSales)
    if (!customerSales) {
        return res.status(404).json({
            message: 'error customer sales',
        })
    }
    // return console.log(customerSales)
    res.status(200).json({
        success: true,
        customerSales
    })

}
exports.salesPerMonth = async (req, res, next) => {
    const salesPerMonth = await Order.aggregate([
        {
            $group: {
                // _id: {month: { $month: "$paidAt" } },
                _id: {
                    year: { $year: "$paidAt" },
                    month: { $month: "$paidAt" }
                },
                total: { $sum: "$totalPrice" },
            },
        },

        {
            $addFields: {
                month: {
                    $let: {
                        vars: {
                            monthsInString: [, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', ' Sept', 'Oct', 'Nov', 'Dec']
                        },
                        in: {
                            $arrayElemAt: ['$$monthsInString', "$_id.month"]
                        }
                    }
                }
            }
        },
        { $sort: { "_id.month": 1 } },
        {
            $project: {
                _id: 0,
                month: 1,
                total: 1,
            }
        }

    ])
    if (!salesPerMonth) {
        return res.status(404).json({
            message: 'error sales per month',
        })
    }
    // return console.log(customerSales)
    res.status(200).json({
        success: true,
        salesPerMonth
    })

}
