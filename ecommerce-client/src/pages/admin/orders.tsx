import { Link, useNavigate } from "react-router";
import "../adminList.css"
import { useEffect } from "react";
import { useOrder } from "../../hooks/useOrder";
import { AdminHeader } from "../../components/admin-header";

export const Orders = () => {

    const {orders, fetchOrdersHandler, isLoading, error, deleteOrderHandler} = useOrder();
    
    const nav = useNavigate();
    
        useEffect(() => {
            fetchOrdersHandler();
        }, [])

        const deleteFullOrder = async(id:number) => {

            if(!id) return;
            
            await deleteOrderHandler(id);
            nav("/admin/orders");
        }

        if (isLoading) return <p>Loading...</p>
        if (error) return <p>{error}</p>
    
    return(
    <>
    <AdminHeader />
    <div className="list-container">
        <h2>Orders</h2>
        <div>
        <section>
            {orders.map((o) => (
                <div key={o.id} className="list-section">
                    <p>Order ID: {o.id}</p>
                    <p>Customer name: {o.customer_firstname} {o.customer_lastname}</p>
                    <p>Customer email: {o.customer_email}</p>
                    <p>Customer phone: {o.customer_phone}</p>
                    <p>Price: {o.total_price}</p>
                    <p>Orde status: {o.order_status}</p>
                    <p>Payment status: {o.payment_status}</p>
                    {/* <UpdateOrderStatus OrderID={o.id}/> */}
                    <p>Date: {o.created_at}</p>
                    <ul>
                    <li><a onClick={() => {deleteFullOrder(o.id)}}>Delete order </a></li>
                    <li><Link to={`/admin/orders/orderDetails/${o.id}`}> Order details</Link></li>
                    </ul>
                </div>
                
            ))}
        </section>
    </div>
    </div>
    </>
    )
}
