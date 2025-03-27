import dotenv from "dotenv";
import express, {Request, Response}  from "express";
import {connectDB} from "./config/db";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { useOrder } from "/Users/ekloo/OneDrive/Desktop/egna projekt/auth-ecommerce/ecommerce-client/src/hooks/useOrder"

dotenv.config();
const app = express();

// Middleware
app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,  // ✅ Allows cookies
}));

// Routes
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
import authRouter from "./routes/auth";
import { IOrder } from "./models/IOrder";
import { updateOrder } from "./controllers/orderController";
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)
app.use('/order-items', orderItemRouter)
app.use('/auth', authRouter)

// Attempt to connect to the database
connectDB()
// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
})


const stripe = require('stripe')(process.env.SECRET_KEY);

app.post('/stripe/create-checkout-session-hosted', async (req: Request, res: Response) => {
  
  const order: IOrder = req.body;
  const items = order.order_items;

  const lineItems = items.map((item) => {

    if(!item){
      console.log ("no item")
    }

    return {
    price_data: {
      currency: 'SEK',
      product_data: {
        name: item.product_name,
      },
      unit_amount: (item.unit_price) * 100,
    },
    quantity: item.quantity,
  };
  });

const session = await stripe.checkout.sessions.create({
  line_items: lineItems,
  mode: 'payment',
    success_url: `http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: 'http://localhost:5173/cart',
    metadata: {orderId: order.id},
  });

  res.json({
    checkout_url: session.url,
    session_id: session.id 
    //clientSecret: session.client_secret
  });
});

app.post("/stripe/webhook", async (req: Request, res: Response) => {


  const event = req.body;
  //const {updateOrderHandler} = useOrder();
  
    switch (event.type){
      case "checkout.session.completed":
        const session = event.data.object;
        console.log("session:", session.id);
  
        const orderId = session.metadata.orderId;
        console.log("Order ID from metadata:", orderId);
        
        if(orderId)       
  
        //update payment status     
          try {
             await updateOrder(orderId, {
              payment_status: "pending", 
              payment_id: session.id, 
              order_status: "unpaid",
            });
          
         } catch(error) {
          error} 
        
        break;
        //update stock
        //send confirmation
  
      default:
        console.log("unhandled event type")
    } 
  
    res.json({received: true});
  }) 



