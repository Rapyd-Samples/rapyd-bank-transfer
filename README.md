# Rapyd Bank Transfer Integration

## Overview

The e-commerce industry is growing rapidly, with more businesses moving towards selling products or services online. Offering bank transfers as a payment method is crucial to helping customers purchase items from your portal. However, implementing bank transfers across different banks and regions can be a complex task. Rapyd makes it easy with its **Bank Transfer API**, enabling you to accept and manage payments with ease.

This repository demonstrates how to implement a bank transfer payment method using the **Rapyd Payment API**. With Rapyd, you can handle local and international payments, helping your business reach new markets and expand globally. The API is available for various programming languages, and in this example, the backend is built using **Node.js** and **Express**, while the frontend is created with **Next.js** and **Tailwind CSS**.

## Features

- **Seamless Bank Transfers**: Accept payments directly from customer bank accounts.
- **International Payments**: Simplify international payments by integrating different banks for different countries.
- **Easy Integration**: Focus on your business while Rapyd handles the complexities of bank transfers and payments.
- **Real-time Payment Management**: Track and manage payments through Rapyd’s unified dashboard.

## Use Cases

1. **Paying for Purchases**: Let your customers pay for services or products with bank transfers.
2. **Accepting International Payments**: Implement international bank transfers and grow your business without worrying about cross-border complexities.
3. **Sending Funds Internationally**: Enable easy international fund transfers through a single platform.

## Workflow

1. Customer selects the bank transfer option at checkout.
2. Rapyd processes the payment request and returns the payment details.
3. Customer completes the payment via their bank (online or offline).
4. Rapyd receives confirmation from the bank and sends a webhook to your application to complete the process.

## Prerequisites

Before you begin, ensure you have the following:

- A **Rapyd Client Portal** account.
- Rapyd **API Key** and **Secret Key** (available in the Client Portal).
- Basic knowledge of **JavaScript** and **Node.js**.
- Understanding of **React** and **Next.js**.
- Familiarity with **Tailwind CSS** for styling.

## License
- MIT

## Get Support
- https://community.rapyd.net
- https://support.rapyd.net

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Rapyd-Samples/rapyd-bank-transfer.git
    ```

2. Navigate to the project folder:

    ```bash
    cd rapyd-bank-transfer
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Set up your environment variables:

    Create a `.env` file in the root directory with the following:

    ```bash
    RAPYD_ACCESS_KEY=<your-rapyd-access-key>
    RAPYD_SECRET_KEY=<your-rapyd-secret-key>
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

## API Endpoints

- **Get Products**: `GET /products` - Fetch a list of available products.
- **Get Payment Methods**: `GET /country/:code` - Retrieve available payment methods for a country.
- **Create Payment**: `POST /payment/:productId/:currency/:type` - Create a payment request.
- **Complete Payment**: `POST /completePayment` - Simulate webhook response to complete a payment.

## Frontend Setup

The frontend is built with **Next.js** and styled with **Tailwind CSS**. To start the frontend server, run the following command:

```bash
npm run dev
