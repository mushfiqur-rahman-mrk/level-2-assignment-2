import mongoose, { Document, Schema } from 'mongoose';
import PurchaseInfo from './order.interface';



// Step 1: Define Mongoose schema
const purchaseInfoSchema: Schema = new Schema<PurchaseInfo>({
    email: { type: String, required: true },
    productId: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});
purchaseInfoSchema.index({ email: 1 });

// Step 3: Create Mongoose model
const PurchaseInfoModel = mongoose.model<PurchaseInfo>('PurchaseInfo', purchaseInfoSchema);

export default PurchaseInfoModel;
