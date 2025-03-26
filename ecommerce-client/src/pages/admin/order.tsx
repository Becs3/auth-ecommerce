import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { IOrder } from "../../models/order";
import { useOrder } from "../../hooks/useOrder";
import { UpdateOrder } from "../update/updateOrder";

export const OrderDetails = () => {

    const {fetchOrderByIdHandler, isLoading, error} = useOrder();
    const [order, setOrder] = useState<IOrder>();
    const params = useParams();
    

    useEffect(() => {
        if(!params.id) return;
        fetchOrderByIdHandler(+params.id).then((data)=>setOrder(data));
        
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return(
    <>
            <div className="object-container">
                <section>
                <h2>OrderDetails</h2>
                <ul>
                    <li>Payment status: {order?.payment_status}</li>
                    <li>Payment id: {order?.payment_id}</li>
                    <li>Order status: {order?.order_status}</li>
                    <li>Order price: {order?.total_price}</li>
                    <li>Order date: {order?.created_at}</li>
                </ul>
                </section>
                <section>
                    <h2>customer info</h2>
                    <ul>
                        <li>Customer name: {order?.customer_firstname} {order?.customer_lastname}</li>
                        <li>email: {order?.customer_email}</li>
                        <li>phone: {order?.customer_phone}</li>
                        <li>street: {order?.customer_street_address}</li>
                        <li>postal code: {order?.customer_postal_code}</li>
                        <li>city: {order?.customer_city}</li>
                        <li>country: {order?.customer_country}</li>
                    </ul>
                </section>
                <section>
                    <h2>order items</h2>
                    {order?.order_items.map((oi) => (
                        <div key={oi.product_id} className="list-section">
                            <ul>
                        <li><p>Item ID: {oi.product_id}</p></li>
                        <li><p>Name: {oi.product_name}</p></li>
                        <li><p>Price: {oi.unit_price}</p></li>
                        <li><p>Quantity: {oi.quantity}</p></li>
                        <li><UpdateOrder OrderId={order.id} OrderItem ={oi}></UpdateOrder></li>
                        </ul>
                        </div>
            ))}
                </section>
            <Link to={`/admin/orders`}>Back to products</Link>
            </div>
            
    </>
    )
}

