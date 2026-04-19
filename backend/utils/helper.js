export function validateOrder(data) {
  if (!data.customerName?.trim()) {
    return {
      valid: false,
      message: "Customer Name is Reqired",
    };
  }

  if (!data.customerPhone?.trim()) {
    return {
      valid: false,
      message: "Customer Phone Number is Reqired",
    };
  }

  if (!data.customerAddress?.trim()) {
    return {
      valid: false,
      message: "Customer Address is Reqired",
    };
  }

  if (!Array.isArray(data.items)) {
    return {
      valid: false,
      message: "Order Must Have at least one Item",
    };
  }

  return { valid: true };
}

//Generate Order Id -> format: ORD-20260127-001
export function generateOrderId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  return `ORD-${year}${month}${day}-${random}`;
}

export function calculateTotals(item) {
  const subTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const tax = subTotal * 0.1;
  const deliveryFee = 5;
  const total = subTotal + tax + deliveryFee;

  return {
    subTotal: Math.round(subTotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    deliveryFee,
    totalAmount: Math.round(total * 100) / 100,
  };
}

export function createOrderDocument(orderData, orderId, totals) {
  return {
    orderId,
    customerName: orderData.customerName.trim(),
    customerPhone: orderData.customerPhone.trim(),
    customerAddress: orderData.customerAddress.trim(),
    items: orderData.items,
    subtotal: totals.subtotal,
    tax: totals.tax,
    deliveryFee: totals.deliveryFee,
    totalAmount: totals.totalAmount,
    specialNotes: orderData.specialNotes || "",
    paymentMethod: orderData.paymentMethod || "cash",
    paymentStatus: "pending",
    status: "pending",
    statusHistory: [
      {
        status: "pending",
        timestamp: new Date(),
        by: "customer",
        note: "Order placed",
      },
    ],
    estimatedTime: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function isValidStatusTransition(currentStatus, newStatus) {
  const validTransitions = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["preparing", "cancelled"],
    preparing: ["ready", "cancelled"],
    ready: ["out_for_delivery", "cancelled"],
    out_for_delivery: ["delivered"],
    delivered: [],
    cancelled: [],
  };

  return validTransitions[currentStatus]?.includes(newStatus) || false;
}
