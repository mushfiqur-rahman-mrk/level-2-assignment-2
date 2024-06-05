import { Request, Response } from 'express';
import { ProductServices } from './product.service';

import zodProductSchema from './product.validation';
//  for creating Products
const createProduct = async (req: Request, res: Response) => {
  try {
   
    
    const { product: productData } = req.body;
    const zodValidation = zodProductSchema.parse(productData)
    const result = await ProductServices.createStudentIntoDB(zodValidation);

    res.status(200).json({
      success: true,
      message: 'Product is created succesfully',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      
    })
  }
};


// for getting all the Products
const getAllProducts = async(req: Request, res: Response) => {
      try{
        
        const result = await ProductServices.getAllProductsFromDB();
        res.status(200).json({
          success: true,
          message: 'Product retrived  succesfully',
          data: result,
        });
      }catch (err) {
        res.status(404).json({
          success: false,
          message: 'Something went wrong',
          
        })
      }
}


// for Getting the single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
  
    const { productId } = req.params;
   
    
    console.log(productId)

    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'One Product retrieved succesfully',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      
    })
  }
};

// for updating a single Product
const getSingleUpdatedProduct = async (req: Request, res: Response) => {
  try {
    const {  productId } = req.params;
    const { price}  = req.body;

    const result = await ProductServices.getSingleProductAndUpdateFromDB(productId, price);

    res.status(200).json({
      success: true,
      message: 'Product updated succesfully',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      
    })
  }
}

// for deleting a single Product
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
  
    const { productId } = req.params;
   
    


    const result = await ProductServices.deleteSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product Deleted succesfully',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      
    })
  }
};


// for searching a Product
const searchProduct =async (req: Request, res: Response) => {
  console.log("object");
    try{
      const searchTerm = req.query.searchTerm as string;
      const result = await ProductServices.searchFromDB(searchTerm);
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
        
      })
    }
}

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getSingleUpdatedProduct,
  deleteSingleProduct,
  searchProduct
}