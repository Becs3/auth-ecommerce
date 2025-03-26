import axios from "axios";
import { API_URL, handleRequest } from "./baseService";
import { Customer, ICustomer, updateCust } from "../models/costumer";

export const fetchCustomers = async ()=> {
    return await handleRequest<ICustomer[]>(axios.get(`${API_URL}/customers`))
}

export const fetchCustomerByID = async(id:number) => {
    return await handleRequest<ICustomer>(axios.get(`${API_URL}/customers/${id}`))
}

export const fetchCustomerByEmail = async(email:string) => {
    return await handleRequest<ICustomer>(axios.get(`${API_URL}/customers/email/${email}`))
}


export const createCustomer = async(payload: Customer) => {
    return await handleRequest<Customer>(axios.post(`${API_URL}/customers`, payload))
}

export const updateCustomer = async(id:number, payload: updateCust): Promise<ICustomer> => {
    return await handleRequest<ICustomer>(axios.patch(`${API_URL}/customers/${id}`,payload))
}


export const deleteCustomer = async(id:number)=> {
    return await handleRequest(axios.delete(`${API_URL}/customers/${id}`))
}