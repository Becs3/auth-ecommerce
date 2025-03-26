import { useEffect, useState } from "react";
import { useOrder } from "../../hooks/useOrder"
import { useSearchParams } from "react-router";
import { IOrder } from "../../models/order";
import { useCustomer } from "../../hooks/useCustomer";
import { ICustomer } from "../../models/costumer";
import { useProducts } from "../../hooks/useProduct";
import "./confirmation.css"

export const OrderConfirmatin = () => {
  const {fetchOrderByPaymentIdHandler, updateOrderHandler} = useOrder();
  const {fetchCustomerByIdHandler} = useCustomer();
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id")
  const [order, setOrder] = useState<IOrder|null>(null);
  const [customer, setCustomer] = useState<ICustomer|null>(null);
  const {fetchProductByIdHandler} =useProducts();
  const {updateProductHandler} = useProducts();

  //get order
   useEffect(() => {
    if(!session_id) {
      console.log("found no session_id")
      return;
    }

    const fetchOrder = async () => {
      try {
        const orderData = await fetchOrderByPaymentIdHandler(session_id);
        setOrder(orderData)
      } catch (error){
        error
      }
    }

    fetchOrder();
  }, []) 

  //update orderstatus
  useEffect(()=> {
    const updateOrder = async () => {
      if(!order) return; 
      if(!session_id) return;

      try {
        const orderData = await updateOrderHandler(order.id, {
          order_status: "Paid", 
          payment_id: session_id, 
          payment_status: "Recieved"});

          if(orderData){
            console.log("updated")
          }

      } catch (error){
        error
      }
    }

    updateOrder();
  }, [order])

  //get Customer 
  useEffect(() => {
    const fetchCustomer = async (id: number) => {
      try {
        const OrderCustomer = await fetchCustomerByIdHandler(id);
        setCustomer(OrderCustomer); 
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    if (order && order.customer_id) {
      fetchCustomer(order.customer_id);
    }
  }, [order]);

  //Update Product stock
  const FetchProductId = async(id:number) => {
    try{
    const Product = await fetchProductByIdHandler(id)
    console.log("fetched product", Product)
    } catch (error) {
      console.log("problem fetching product", error)
    }
  }

  useEffect(() => {
    const updateOrderItems = async () => {
      if (!order) return;
      console.log("in updateOrder");
  
      await Promise.all(
        order.order_items.map(async (item) => {
          const fetchedProduct = await fetchProductByIdHandler(item.product_id);
          console.log("fetched product", fetchedProduct);
  
          if (fetchedProduct) {
            const updatedStock = fetchedProduct.stock - item.quantity;
  
            try {
               await updateProductHandler(fetchedProduct.id, {
                name: fetchedProduct.name,
                description: fetchedProduct.description,
                price: fetchedProduct.price,
                category: fetchedProduct.category,
                stock: updatedStock,
              });
              console.log("Updated product before stock:", fetchedProduct.stock, "new stock", updatedStock);
            } catch (error) {
              console.error("Error updating product:", error);
            }
          }
        })
      );
    };
  
    updateOrderItems(); 
  
  }, [order]);

  console.log("order", order)
  console.log("customer", customer) 

  localStorage.setItem("customer_id", JSON.stringify(""));
  localStorage.setItem("cart", JSON.stringify([]));

    return(
        <>
        <div className="container">
          <h2>orderconfirmation</h2>
          <p>Thank you {customer?.firstname} for your order! </p>
          <p>Your order ID: {order?.id}</p>
          <div>
          <p>You have ordered: </p>
            {order?.order_items.map((item) => (
              <div key={item.product_id}>
                <ul>
                <li>
                  <p>{item.product_name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.unit_price}</p>
                </li>
                </ul>
          </div>
          ))}
            <p>Total price: {order?.total_price} </p>
          </div>
          <div>
            <p>It will be delivered to: </p>
            <p>{customer?.firstname} {customer?.lastname}</p>
            <p>{customer?.street_address}</p>
            <p>{customer?.postal_code}</p>
            <p>{customer?.city}</p>
          </div>

          <p>Please don't hesitate to contact us for any questions!</p>
        </div>
        </>
    )
} 