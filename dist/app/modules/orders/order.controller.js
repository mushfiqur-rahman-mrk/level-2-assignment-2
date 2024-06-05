"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const product_model_1 = require("../student/product.model");
const order_model_1 = __importDefault(require("./order.model"));
// for creating Order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, productId, price, quantity } = req.body;
        // Check if the product exists 
        const product = yield product_model_1.ProductModel.findById(productId);
        if (!product || product.inventory.quantity < quantity) {
            return res.status(404).json({ success: false, message: 'Insufficient stock available' });
        }
        // Create the order
        const order = yield order_model_1.default.create({ email, productId, price, quantity });
        // Update the inventory quantity and inStock status
        product.inventory.quantity -= quantity;
        if (product.inventory.quantity <= 0) {
            product.inventory.quantity = 0;
            product.inventory.inStock = false;
        }
        else {
            product.inventory.inStock = true;
        }
        res.status(200).json({ success: true, message: 'Order created successfully!', data: order });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
// for getting all order
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderServices.getAllOrdersFromDB();
        res.status(200).json({
            success: true,
            message: 'Order is Retrived succesfully',
            data: result,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Something went wrong',
        });
    }
});
// for getting One Order
const getOneOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = req.query.email;
        // Call service function to retrieve orders by email
        const orders = yield order_service_1.OrderServices.getOrdersByEmail(userEmail);
        res.status(200).json({
            success: true,
            message: `Orders fetched successfully for user email ${userEmail}!`,
            data: orders,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders.',
            error: err.message,
        });
    }
});
// for searching a Product
const searchOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        // Find orders by user email
        const orders = yield order_service_1.OrderServices.searchOrderDB(email);
        res.status(200).json({
            success: true,
            message: 'Orders searched successfully for user email!',
            data: orders,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to search orders for user email',
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
    getOneOrder,
    searchOrder
};
