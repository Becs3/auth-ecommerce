import { ChangeEvent, useEffect, useState } from "react";
import { useOrder } from "../hooks/useOrder";
import "../pages/adminList.css"


type updateOrderStatusProps = {
    OrderID:number;
  }

export const UpdateOrderStatus = ({OrderID}: updateOrderStatusProps) => {

    const order_categories = ["pending", "readyForCollection", "cancelled", "Completed"]
    const payment_categories = ["not paid", "paid"]

      const [orderStatus, setOrderStatus] = useState(""); 
      const [paymentStatus, setPaymentStatus] = useState(""); 
      const {fetchOrderByIdHandler, updateOrderHandler}=useOrder();
      const paymentId = ("");

      useEffect(() => {
        const fetchOrderStatus = async () => {
            const order = await fetchOrderByIdHandler(OrderID);
            if (order) {
                setOrderStatus(order.order_status); 
                setPaymentStatus(order.payment_status);
            }
        };

        fetchOrderStatus();
    }, [OrderID]);
    

      const handleSubmit = () => {

        updateOrderHandler(OrderID, { order_status: orderStatus, payment_id:paymentId, payment_status: paymentStatus })

      }

    return (
        <>
        <form onSubmit={handleSubmit}>
        <div className="status-container">
        <div>
            <p>OrderStatus</p>
            <select value={orderStatus} onChange={(e:ChangeEvent<HTMLSelectElement>) => setOrderStatus(e.currentTarget.value)}>
                {order_categories.map((orderstatus) => (
                    <option key={orderstatus} value={orderstatus}>
                        {orderstatus}
                    </option>
                ))}
            </select>
        </div>
        <div>
            <p>PaymentStatus</p>
            <select value={paymentStatus} onChange={(e:ChangeEvent<HTMLSelectElement>) => setPaymentStatus(e.currentTarget.value)}>
                {payment_categories.map((paymentstatus) => (
                    <option key={paymentstatus} value={paymentstatus}>
                        {paymentstatus}
                    </option>
                ))}
            </select>
        </div>
        <button>Save changes</button>
        </div>
        </form>
    </>
    );
}
