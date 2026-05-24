// import Order from '../models/orderModel.js';
// import Product from '../models/productModel.js';
// import HandleError from "../utils/handleError.js";
// import handleAsyncError from '../middleware/handleAsyncError.js';

// // Create New Order
// export const createNewOrder=handleAsyncError(async(req,res,next)=>{
// const {shippingInfo,orderItems,paymentInfo,itemPrice,taxPrice,shippingPrice,totalPrice}=req.body;

// const order=await Order.create({
//     shippingInfo,
//     orderItems,
//     paymentInfo,
//     itemPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//     paidAt:Date.now(),
//     user:req.user._id
// })
// res.status(201).json({
//     success:true,
//     order
// })
// })

// //Getting single Order
// export const getSingleOrder=handleAsyncError(async(req,res,next)=>{
//  const order=await Order.findById(req.params.id).populate("user","name email")
//  if(!order){
//     return next(new HandleError("No order found",404));
//  }
//  res.status(200).json({
//     success:true,
//     order
//  })
// })

// //All my orders
// export const allMyOrders=handleAsyncError(async(req,res,next)=>{
//  const orders=await Order.find({user:req.user._id});
//  if(!orders){
//     return next(new HandleError("No order found",404));
// }
// res.status(200).json({
//     success:true,
//     orders
// })
// })

// //Getting all orders
// export const getAllOrders=handleAsyncError(async(req,res,next)=>{
//     const orders=await Order.find();
//     let totalAmount=0;
//     orders.forEach(order=>{
//         totalAmount+=order.totalPrice
//     })
//     res.status(200).json({
//         success:true,
//         orders,
//         totalAmount
//     })
// })

// //Update order status
// export const updateOrderStatus=handleAsyncError(async(req,res,next)=>{
//     const order=await Order.findById(req.params.id);
//     if(!order){
//         return next(new HandleError("No order found",404));
//     }
//     if(order.orderStatus==='Delivered'){
//         return next(new HandleError("This order is already been delivered",404));
//     }
//     await Promise.all(order.orderItems.map(item=>updateQuantity(item.product,item.quantity)
//     ))
//     order.orderStatus=req.body.status;
//     if(order.orderStatus==='Delivered'){
//         order.deliveredAt=Date.now();
//     }
//     await order.save({validateBeforeSave:false})
//     res.status(200).json({
//         success:true,
//         order
//     })
// })
// async function updateQuantity(id,quantity){
//     const product=await Product.findById(id);
//     if(!product){
//         throw new Error("Product not found");
//     }
//     product.stock-=quantity
//     await product.save({validateBeforeSave:false})
// }

// //Delete Order
// export const deleteOrder=handleAsyncError(async(req,res,next)=>{
//     const order=await Order.findById(req.params.id);
//     if(!order){
//         return next(new HandleError("No order found",404));
//     }
//     if(order.orderStatus!=='Delivered'){
//         return next(new HandleError("This order is under processing and cannot be deleted",404));

//     }
//     await Order.deleteOne({_id:req.params.id});
//     res.status(200).json({
//         success:true,
//         message:"Order Deleted successfully"
//     })
// })



//new 



import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";

/**
 * @desc    Create New Order
 * @route   POST /api/orders
 * @access  Private (User)
 */
export const createNewOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return next(new HandleError("No order items provided", 400));
    }

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get Single Order
 * @route   GET /api/orders/:id
 * @access  Private
 */
export const getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new HandleError("Order not found", 404));
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get Logged-in User Orders
 * @route   GET /api/orders/my
 * @access  Private (User)
 */
export const allMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    if (!orders || orders.length === 0) {
      return next(new HandleError("No orders found", 404));
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get All Orders (Admin)
 * @route   GET /api/orders
 * @access  Private (Admin)
 */
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    const totalAmount = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.status(200).json({ success: true, orders, totalAmount });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update Order Status (Admin)
 * @route   PUT /api/orders/:id
 * @access  Private (Admin)
 */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new HandleError("Order not found", 404));
    }

    if (order.orderStatus === "Delivered") {
      return next(new HandleError("This order has already been delivered", 400));
    }

    // Update product stock
    await Promise.all(
      order.orderItems.map((item) =>
        updateProductStock(item.product, item.quantity)
      )
    );

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Helper - Update Product Stock
 */
async function updateProductStock(productId, quantity) {
  const product = await Product.findById(productId);

  if (!product) {
    throw new HandleError("Product not found", 404);
  }

  if (product.stock < quantity) {
    throw new HandleError("Insufficient stock available", 400);
  }

  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

/**
 * @desc    Delete Order (Admin)
 * @route   DELETE /api/orders/:id
 * @access  Private (Admin)
 */
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new HandleError("Order not found", 404));
    }

    if (order.orderStatus !== "Delivered") {
      return next(
        new HandleError(
          "Only delivered orders can be deleted (processing orders cannot be deleted)",
          400
        )
      );
    }

    await order.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};
