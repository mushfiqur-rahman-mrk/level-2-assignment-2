
import PurchaseInfo from './order.interface';
import PurchaseInfoModel from './order.model';



const createOrderInfoDB = async (order: PurchaseInfo) => {
  const result = await PurchaseInfoModel.create(order);
  return result;
};
const getAllOrdersFromDB = async () => {
  const result = await PurchaseInfoModel.find();
  return result;

}
const getOrdersByEmail = async (email: string) => {
  try {
      const userEmail = email.trim().toLowerCase();
      const orders = await PurchaseInfoModel.find({ email: userEmail });
      return orders;
  } catch (error) {
      throw new Error('Failed to retrieve orders by email.');
  }
};


const searchOrderDB =async (email: string) => {
  console.log("object");
  const result = await PurchaseInfoModel.find({email});
  return result;
}


export const OrderServices = {
    createOrderInfoDB,
  getAllOrdersFromDB,
  getOrdersByEmail,
  searchOrderDB
  
};