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
export function generateOrderId(){
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth()+1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2,'0');
    const  =  Math.floor(Math.random()*1000)
}