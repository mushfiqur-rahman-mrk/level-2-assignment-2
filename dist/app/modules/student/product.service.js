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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const createStudentIntoDB = (student) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(student);
    return result;
});
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.find();
    return result;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOne({ id });
    return result;
});
const getSingleProductAndUpdateFromDB = (id, price) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { id };
    const update = { price };
    const result = yield product_model_1.ProductModel.updateOne(filter, update);
    return result;
});
const deleteSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.deleteOne({ id });
    return result;
});
const searchFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("object");
    const result = yield product_model_1.ProductModel.find({
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
        ],
    });
    return result;
});
exports.ProductServices = {
    createStudentIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    getSingleProductAndUpdateFromDB,
    deleteSingleProductFromDB,
    searchFromDB
};
