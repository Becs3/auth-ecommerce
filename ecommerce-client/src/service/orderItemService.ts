import axios from "axios"
import { IOrderItem, updateOrItem } from "../models/orderItem"
import { API_URL, handleRequest } from "./baseService"

export const createOrderItem = async(payload: IOrderItem) => {
    return await handleRequest<IOrderItem>(axios.post(`${API_URL}/orders-items`, payload))
}

export const updateOrderItem = async(id:number, payload: updateOrItem): Promise<IOrderItem> => {
    return await handleRequest<IOrderItem>(axios.patch(`${API_URL}/order-items/${id}`,payload))
}


export const deleteOrderItem = async(id:number)=> {
    return await handleRequest(axios.delete(`${API_URL}/order-items/${id}`))
}