const express = require("express");
const app = express();
const cors = require("cors");
const products = require("./products");
require("dotenv").config();

const makeRequest = require("./utilities").makeRequest;

// Enable CORS
app.use(cors());

// Parse JSON bodies for this app
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// Set JSON spaces to 4 for readability
app.set("json spaces", 4);

// Get all products route
app.get("/products", (req, res) => {
  res.json(products);
});

// Get a single product route
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === Number(id));
  res.json(product);
});

// Get payment methods route
app.get("/country/:code", async (req, res) => {
  const { code } = req.params;
  try {
    const result = await makeRequest(
      "GET",
      `/v1/payment_methods/country?country=${code}`
    );

    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// Get required fields route
app.get("/fields/:type", async (req, res) => {
  const { type } = req.params;
  try {
    const result = await makeRequest(
      "GET",
      `/v1/payment_methods/required_fields/${type}`
    );
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// Create a payment route
app.post("/payment/:productId/:currency/:type", async (req, res) => {
  try {
    const { productId, currency, type } = req.params;

    const product = products.find(
      (product) => product.id === Number(productId)
    );

    const { firstName, lastName } = req.body;

    const body = {
      amount: product.price,
      currency: currency,
      payment_method: {
        type: type,
        fields: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    };
    const result = await makeRequest("POST", "/v1/payments", body);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// Complete a payment route
app.post("/completePayment", async (req, res) => {
  try {
    const { paymentId, code, price } = req.body;

    let body = {};
    if (code) {
      body = {
        token: paymentId,
        param1: code,
        param2: price.toString(),
      };
    } else {
      body = {
        token: paymentId,
        param2: price,
      };
    }

    const result = await makeRequest(
      "POST",
      "/v1/payments/completePayment",
      body
    );
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// Start a server
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
