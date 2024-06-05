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
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
//  for creating Products
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product: productData } = req.body;
        const zodValidation = product_validation_1.default.parse(productData);
        const result = yield product_service_1.ProductServices.createStudentIntoDB(zodValidation);
        res.status(200).json({
            success: true,
            message: 'Product is created succesfully',
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
// for getting all the Products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductServices.getAllProductsFromDB();
        res.status(200).json({
            success: true,
            message: 'Product retrived  succesfully',
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
// for Getting the single product
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        console.log(productId);
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'One Product retrieved succesfully',
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
// for updating a single Product
const getSingleUpdatedProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const { price } = req.body;
        const result = yield product_service_1.ProductServices.getSingleProductAndUpdateFromDB(productId, price);
        res.status(200).json({
            success: true,
            message: 'Product updated succesfully',
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
// for deleting a single Product
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.deleteSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product Deleted succesfully',
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
// for searching a Product
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("object");
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.ProductServices.searchFromDB(searchTerm);
        res.status(200).json({
            success: true,
            message: 'Search Query Product',
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
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    getSingleUpdatedProduct,
    deleteSingleProduct,
    searchProduct
};
