import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useOrder } from "../../hooks/useOrder";
import { IOrder } from "../../models/order";
import { useOrderItem } from "../../hooks/useOrderItem";
import { IOrderItem } from "../../models/orderItem";

type updateItemProps = {
    OrderId: number;
    OrderItem: IOrderItem;
}

export const UpdateOrder = ({OrderId, OrderItem}:updateItemProps) => {

    const {fetchOrderByIdHandler} =useOrder();
    const {updateOrderItemHandler, deleteOrderItemHandler} =useOrderItem();
    const [order, setOrder] = useState<IOrder>();
    const nav = useNavigate();

    const[orderitemQ, setOrderitemQ] = useState<number>(1)

    useEffect (() =>{

        if(!OrderId) return;
        fetchOrderByIdHandler(OrderId).then((data) => {setOrder(data);
            const item = data.order_items.find((i) => i.id === OrderItem.id);
            if(item) {
                setOrderitemQ(item.quantity)
            }
        
    });

    }, [ OrderId ])


    const handleChange =(e:ChangeEvent<HTMLInputElement>, orderItemID: number) => {

        const updatedQuantity = +e.target.value;
        setOrderitemQ(updatedQuantity) 

        const updatedOrderItems = order?.order_items.map((oi) => (
            oi.id === orderItemID
                ? {...oi, quantity: updatedQuantity}
                : oi
    ))       
    
 
        if(!order || !updatedOrderItems) return;
        setOrder({...order, order_items: updatedOrderItems});
    }
        
            
    const handleSubmit = async (e:FormEvent, orderItemId:number, orderitemQ: number) => {
        e.preventDefault();

        if(!orderitemQ) return;

        await updateOrderItemHandler(orderItemId, {quantity: orderitemQ});

        setTimeout(() => nav(`/admin/orders`), 300);
    }

    const deleteOrderItem = async(id:number) => {

        if(!id) return;
        
        await deleteOrderItemHandler(id);
        setTimeout(() => nav(`/admin/orders`), 300);
    }


        return(
            <>
                <section>
                        <div>
                            <form onSubmit={(e) =>handleSubmit(e, OrderItem.id, orderitemQ)}>
                            <input type="number"
                            value={orderitemQ}
                            onChange={(e) => handleChange(e, OrderItem.id)}
                            /> 
                            <button type="submit">Update</button>
                            </form>
                            <a onClick={() => {deleteOrderItem(OrderItem.id)}}>Delete item </a>
                        </div>
                </section>
            </>

)};

