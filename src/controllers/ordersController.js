const fs = require('fs');
const path = require('path');

// path to the mock data where orders are stored
const ordersFilePath = path.join(__dirname, '../data/orders.json');

let orders = JSON.parse(fs.readFileSync(ordersFilePath, 'utf-8'));

// retrieve all orders
const findAllUsingGET = (req, res) => {
  res.json(orders);
};

// create a new order
const createUsingPOST = (req, res) => {
  const newOrder = req.body;
  orders.push(newOrder);
  res.status(201).json(newOrder);
};

// delete all orders
const deleteAllUsingDELETE = (req, res) => {
  orders = [];
  res.status(204).json({ message: 'All orders have been deleted successfully!' });
};

// retrieve a specific order
const readUsingGET = (req, res) => {
  const orderID = req.params.orderID;

  const order = orders.find((o) => o.orderID === orderID);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ message: `Order with ID ${orderID} not found` });
  }
};

// update an order with no delta updates
const upsertUsingPUT = (req, res) => {
  const orderID = req.params.orderID;
  const updatedOrder = req.body;
  const orderIndex = orders.findIndex((o) => o.orderID === orderID);

  if (orderIndex !== -1) {
    orders[orderIndex] = { orderID, ...updatedOrder };
    res.status(200).json(orders[orderIndex]);
  } else {
    const newOrder = { orderID, ...updatedOrder };
    orders.push(newOrder);
    res.status(201).json(newOrder);
  }
};

// delete a specific order
const deleteUsingDELETE = (req, res) => {
  const orderID = req.params.orderID;
  const orderIndex = orders.findIndex((o) => o.orderID === orderID);

  if (orderIndex !== -1) {
    orders.splice(orderIndex, 1);

    res.status(200).json({ message: `The order with ID ${orderID} has been deleted` });
  } else {
    res.status(404).json({ message: `The order with ID ${orderID} not found` });
  }
};

// update an order with delta updates
const deltaUpdateUsingPATCH = (req, res) => {
  const orderID = req.params.orderID;
  const updates = req.body;

  const orderIndex = orders.findIndex((o) => o.orderID === orderID);

  if (orderIndex !== -1) {
    const existingOrder = orders[orderIndex];
    const updatedOrder = { ...existingOrder, ...updates };
    orders[orderIndex] = updatedOrder;

    res.status(200).json({ updatedOrder });
  } else {
    res.status(404).json({ message: `Order with ID ${orderID} not found` });
  }
};

module.exports = {
  findAllUsingGET,
  createUsingPOST,
  deleteAllUsingDELETE,
  readUsingGET,
  upsertUsingPUT,
  deleteUsingDELETE,
  deltaUpdateUsingPATCH,
};
