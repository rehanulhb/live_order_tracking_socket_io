import { getCollection } from "../config/database.js";
import {
  calculateTotals,
  createOrderDocument,
  generateOrderId,
} from "../utils/helper.js";

export const orderHandler = (io, socket) => {
  console.log("A User connected", socket.id);

  //Place Order
  socket.on("placeOrder", async (data, callback) => {
    try {
      console.log(`Placed Order From ${socket.id}`);
      const validation = validateOrder(data);
      if (!validation.valid) {
        return callback({
          success: false,
          message: validation.message,
        });
      }
      const totals = calculateTotals(data.items);
      const orderId = generateOrderId();
      const order = createOrderDocument(data, orderId, totals);

      const ordersCollection = getCollection("orders");
      await ordersCollection.insertOne(order);

      socket.join(`order-${orderId}`);
      socket.join("customers");

      io.to("admins").emit("newOrder", { order });
      callback({
        success: true,
        order,
      });
      console.log(`Order Created: ${orderId}`);
    } catch (error) {
      console.log(error);
      callback({ success: false, message: "Failed to Place Order..." });
    }
  });
};
