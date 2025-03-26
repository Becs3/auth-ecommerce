import { useState } from "react"
import { IOrderItem, updateOrItem } from "../models/orderItem";
import { createOrderItem, deleteOrderItem, updateOrderItem } from "../service/orderItemService";


export const useOrderItem = () => {
    const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

const createOrderItemHandler = async(payload:IOrderItem) => {
        setIsLoading(true);

        try {
            return await createOrderItem(payload);
        } catch(error){
            setError("Problem creating order")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const updateOrderItemHandler = async(id:number, payload:updateOrItem) => {
        setIsLoading(true);

        try {
            return await updateOrderItem(id, payload);
        } catch(error){
            setError("Problem updating order")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const deleteOrderItemHandler = async(id:number) => {
        setIsLoading(true);

        try {
            await deleteOrderItem(id);
            const newOrderItems = orderItems.filter(oi => oi.id !== id);
            setOrderItems(newOrderItems)
        } catch(error){
            setError("Problem fetching orderItem")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return { 
        orderItems, 
        isLoading, 
        error, 
        createOrderItemHandler,
        updateOrderItemHandler,
        deleteOrderItemHandler
    }
}

