import mongoose from 'mongoose';
export interface IOrder {

    products: mongoose.Types.ObjectId[] // массив _id, обязательно ссылка на другую коллекцию Product

    customer: mongoose.Types.ObjectId  // _id покупателя, обязательно ссылка на коллекцию User

}