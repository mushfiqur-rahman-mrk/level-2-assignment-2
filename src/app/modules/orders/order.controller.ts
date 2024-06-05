import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { ProductModel } from '../student/product.model';
import PurchaseInfoModel from './order.model';

// for creating Order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, productId, price, quantity } = req.body;

    // Check if the product exists 
    const product = await ProductModel.findById(productId);
    if (!product || product.inventory.quantity < quantity) {
      return res.status(404).json({ success: false, message: 'Insufficient stock available' });
    }

    // Create the order
    const order = await PurchaseInfoModel.create({ email, productId, price, quantity });

    // Update the inventory quantity and inStock status
    product.inventory.quantity -= quantity;
    if (product.inventory.quantity <= 0) {
      product.inventory.quantity = 0;
      product.inventory.inStock = false;
    } else {
      product.inventory.inStock = true;
    }

    res.status(200).json({ success: true, message: 'Order created successfully!', data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


// for getting all order
const getAllOrders = async (req: Request, res: Response) => {
  try {

    const result = await OrderServices.getAllOrdersFromDB();
    res.status(200).json({
      success: true,
      message: 'Order is Retrived succesfully',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      
    })
  }
}

// for getting One Order
const getOneOrder = async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.email as string;

    // Call service function to retrieve orders by email
    const orders = await OrderServices.getOrdersByEmail(userEmail);

    res.status(200).json({
      success: true,
      message: `Orders fetched successfully for user email ${userEmail}!`,
      data: orders,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders.',
      error: err.message,
    });
  }
}



// for searching a Product
const searchOrder =async (req: Request, res: Response) => {
  try {
    const  {email}  = req.query;

    // Find orders by user email
    const orders = await OrderServices.searchOrderDB( email as string);

    res.status(200).json({
      success: true,
      message: 'Orders searched successfully for user email!',
      data: orders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to search orders for user email',
    });
  }
}
export const OrderControllers = {
  createOrder,
  getAllOrders,
  getOneOrder,
  searchOrder

}