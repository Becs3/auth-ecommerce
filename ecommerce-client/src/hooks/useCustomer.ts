import { useState } from "react"
import { Customer, ICustomer, updateCust } from "../models/costumer";
import { createCustomer, deleteCustomer, fetchCustomerByEmail, fetchCustomerByID, fetchCustomers, updateCustomer } from "../service/customerService";

export const useCustomer = () => {
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchCustomersHandler = async() => {
        setIsLoading(true);

        try {
            const data = await fetchCustomers();
            setCustomers(data);
        } catch(error){
            setError("Problem fetching costumer")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const fetchCustomerByIdHandler = async(id:number) => {
        setIsLoading(true);

        try {
            return await fetchCustomerByID(id);
        } catch(error){
            setError("Problem fetching costumer")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const fetchCustomerByEmailHandler = async(email:string) => {
        setIsLoading(true);

        try {
            return await fetchCustomerByEmail(email);
        } catch{
            console.log("customer did not exist")
            return;
        } finally {
            setIsLoading(false);
        }
    }

    const createCustomerHandler = async(payload:Customer) => {
        setIsLoading(true);

        try {
            return await createCustomer(payload);
        } catch(error){
            setError("Problem creating Customer")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const updateCustomerHandler = async(id:number, payload:updateCust) => {
        setIsLoading(true);

        try {
            return await updateCustomer(id, payload);
        } catch(error){
            setError("Problem updating customer")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const deleteCustomerHandler = async(id:number) => {
        setIsLoading(true);

        try {
            await deleteCustomer(id);
            const newCustomers = customers.filter(c => c.id !== id);
            setCustomers(newCustomers)
        } catch(error){
            setError("Problem fetching product")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return { 
        customers,
        isLoading,
        error,
        fetchCustomerByIdHandler,
        fetchCustomersHandler,
        fetchCustomerByEmailHandler,
        createCustomerHandler,
        updateCustomerHandler,
        deleteCustomerHandler
    }
}