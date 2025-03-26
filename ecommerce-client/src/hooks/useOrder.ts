import { useState } from "react"
import { IOrder, updateOrd } from "../models/order";
import { createOrder, deleteOrder, fetchOrders, fetchOrderByID, updateOrder, fetchOrderByPaymentID } from "../service/orderService";


export const useOrder = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchOrdersHandler = async() => {
        setIsLoading(true);

        try {
            const data = await fetchOrders();
            setOrders(data);
        } catch(error){
            setError("Problem fetching orders")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const fetchOrderByIdHandler = async(id:number) => {
        setIsLoading(true);

        try {
            return await fetchOrderByID(id);
        } catch(error){
            setError("Problem fetching order")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const fetchOrderByPaymentIdHandler = async(paymentId:string) => {
        setIsLoading(true);

        try {
            return await fetchOrderByPaymentID(paymentId);
        } catch(error){
            setError("Problem fetching order")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    

    const createOrderHandler = async(payload:IOrder) => {
        setIsLoading(true);

        try {
            return await createOrder(payload);
        } catch(error){
            setError("Problem creating order")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const updateOrderHandler = async(id:number, payload:updateOrd) => {
        setIsLoading(true);

        try {
            return await updateOrder(id, payload);
        } catch(error){
            setError("Problem updating order")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const deleteOrderHandler = async(id:number) => {
        setIsLoading(true);

        try {
            await deleteOrder(id);
            const newProducts = orders.filter(o => o.id !== id);
            setOrders(newProducts)
        } catch(error){
            setError("Problem fetching order")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return { 
        orders, 
        isLoading, 
        error, 
        fetchOrdersHandler, 
        fetchOrderByIdHandler,
        fetchOrderByPaymentIdHandler,
        createOrderHandler,
        updateOrderHandler,
        deleteOrderHandler
    }
}