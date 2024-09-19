const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// routes for managing orders
router.get('/', ordersController.findAllUsingGET); // retrieve all orders
router.post('/', ordersController.createUsingPOST); // create a new order
router.delete('/', ordersController.deleteAllUsingDELETE); // delete all orders

// routes for managing a specific order by ID
router.get('/:orderID', ordersController.readUsingGET); // retrieve an order by ID
router.put('/:orderID', ordersController.upsertUsingPUT); // update an order by ID
router.delete('/:orderID', ordersController.deleteUsingDELETE); // delete an order by ID
router.patch('/:orderID', ordersController.deltaUpdateUsingPATCH); // delta update an order by ID

module.exports = router;
