import { MongooseModule } from "@nestjs/mongoose";
import { OrderSchema } from "../schemas/orders.schema";

let OrderModel = MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema, collection: 'orders' }])
export default OrderModel