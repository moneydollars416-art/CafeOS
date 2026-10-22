const USERS_URL = "https://6ad9f7b37512f497b3ff6286.mockapi.io/users";
const PRODUCTS_URL = "https://6ad9f7297512f497b3ff61c1.mockapi.io/products";
const ORDERS_URL = "https://6ad9f7297512f497b3ff61c1.mockapi.io/orders";

async function requestJSON(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export async function getUsers() {
  return requestJSON(USERS_URL);
}

export async function createUser(user) {
  return requestJSON(USERS_URL, {
    method: "POST",
    body: JSON.stringify(user)
  });
}

export async function getProducts() {
  return requestJSON(PRODUCTS_URL);
}

export async function createProduct(product) {
  return requestJSON(PRODUCTS_URL, {
    method: "POST",
    body: JSON.stringify(product)
  });
}

export async function updateProduct(id, product) {
  return requestJSON(`${PRODUCTS_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(product)
  });
}

export async function deleteProduct(id) {
  return requestJSON(`${PRODUCTS_URL}/${id}`, {
    method: "DELETE"
  });
}

export async function getOrders() {
  return requestJSON(ORDERS_URL);
}

export async function createOrder(order) {
  return requestJSON(ORDERS_URL, {
    method: "POST",
    body: JSON.stringify(order)
  });
}

export async function updateOrder(id, order) {
  return requestJSON(`${ORDERS_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(order)
  });
}

export async function deleteOrderApi(id) {
  return requestJSON(`${ORDERS_URL}/${id}`, {
    method: "DELETE"
  });
}
