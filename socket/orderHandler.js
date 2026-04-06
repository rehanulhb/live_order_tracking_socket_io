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
    } catch (error) {
      console.log(error);
    }
  });
};
