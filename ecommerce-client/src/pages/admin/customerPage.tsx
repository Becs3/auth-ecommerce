import { Link, useParams } from "react-router";
import { useCustomer } from "../../hooks/useCustomer";
import { ICustomer } from "../../models/costumer";
import { useEffect, useState } from "react";
import "../adminObject.css"

export const CustomerPage = () => {
    
        const [customer, setCustomer] = useState<ICustomer>()
        const {isLoading, error, fetchCustomerByIdHandler} = useCustomer();
        const param = useParams();
    
        useEffect (()=> {
            if(!param.id) return;
            fetchCustomerByIdHandler(+param.id).then((data)=>setCustomer(data))
        }, [])
    
        if (isLoading) return <p>Loading...</p>
        if (error) return <p>{error}</p>
    
        // See customers details. Be able to update and delete them
        return(
        <>
                <div className="object-container">
                <ul>
                <li>Customer name: {customer?.firstname} {customer?.lastname}</li>
                <li>customer id: {customer?.id}</li>
                <li>Phone: {customer?.phone}</li>
                <li>Email: {customer?.email}</li>
                <li>Street: {customer?.street_address}</li>
                <li>Postal code: {customer?.postal_code}</li>
                <li>City: {customer?.city}</li>
                <li>Country: {customer?.country}</li>
                <li>Created at: {customer?.created_at}</li>
                </ul>
                <Link to="/admin/customers">Back to customers</Link>
                </div>
        </>
        )
    }