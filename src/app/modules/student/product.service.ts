
import { Product } from './product.interface';
import { ProductModel } from './product.model';


const createStudentIntoDB = async (student: Product) => {
  const result = await ProductModel.create(student);
  return result;
};
const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;

}


const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ id });
  return result;
};
const getSingleProductAndUpdateFromDB = async (id: string, price: number) => {
  const filter = { id };
  const update = {price};
  const result = await ProductModel.updateOne(filter, update);

  return result;
};

const deleteSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.deleteOne({ id });
  return result;
};


const searchFromDB =async (searchTerm: string) => {
  console.log("object");
  const result = await ProductModel.find({
    $or: [
      { name: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
    ],
  })
  return result;
}

export const ProductServices = {
  createStudentIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  getSingleProductAndUpdateFromDB,
  deleteSingleProductFromDB,
  searchFromDB

};