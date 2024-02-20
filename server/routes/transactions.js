const express = require('express');
const getTransactionCollection = require('../models/Transaction');
const router = express.Router();

const getCollection = () => {
  const client = getConnectedClient();
  const collection = client.db("transactionsdb").collection("transactions");
  return collection;
}

// Get transactions
router.get('/', async (req, res) => {
  const collection = getTransactionCollection(); // Get the transactions collection
  try {
    const transactions = await collection.find({}).toArray(); // Fetch all transactions
    res.status(200).json(transactions); // Send transactions in the response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle potential errors
  }
});

//POST transaction
router.post('/', async (req, res) => {
  const collection = getTransactionCollection(); // Get the transactions collection
  let { name, datetime, description, amount } = req.body;

  // Basic validation to ensure required fields are present
  if (!name || !datetime || !description || amount == null) {
    return res.status(400).json({ message: "Please provide name, datetime, description, and amount for the transaction." });
  }

  // Convert datetime to a Date object if it's a string
  datetime = new Date(datetime);

  // Insert the new transaction into the collection
  try {
    const newTransaction = await collection.insertOne({
      name,
      datetime,
      description,
      amount
    });
    // Respond with the newly created transaction including its generated _id
    res.status(201).json({
      _id: newTransaction.insertedId,
      name,
      datetime,
      description,
      amount
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;