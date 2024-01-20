// const express = require('express');
// const app = express();
// const port = 3001;
// const billing_model = require('./server_model');
// const cors = require('cors');

// app.use(express.json());
// app.use(cors());

// app.get('/', (req, res) => {
//   billing_model
//     .getInvoices()
//     .then((response) => {
//       res.status(200).send(response);
//     })
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// });


// app.post('/invoice', (req, res) => {
//   billing_model
//     .createInvoice(req.body)
//     .then((response) => {
//       res.status(200).send(response);
//     })
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// });

// app.delete('/invoice/:id', (req, res) => {
//   billing_model
//     .deleteInvoice(req.params.id)
//     .then((response) => {
//       res.status(200).send(response);
//     })
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// });

// app.listen(port, () => {
//   console.log(`App running on port ${port}.`);
// });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (replace 'your-mongodb-uri' with your MongoDB URI)
mongoose.connect('mongodb+srv://Dentee:Dentee1234@denteecluster.z7tggmn.mongodb.net/Dentee?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a MongoDB schema for invoices
const invoiceSchema = new mongoose.Schema({
  currentDate: String,
  invoiceNumber: Number,
  customerName: String,
  phoneNumber: String,
  Email: String,
  notes: String,
  total: String,
  subTotal: String,
  taxRate: String,
  taxAmount: String,
  discountRate: String,
  discountAmount: String,
  items: [
    {
      id: Number,
      name: String,
      description: String,
      price: String,
      quantity: Number
    }
  ]
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

// Define a route to handle invoice creation
app.post('/invoice', async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    const savedInvoice = await newInvoice.save();
    res.json(savedInvoice);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
