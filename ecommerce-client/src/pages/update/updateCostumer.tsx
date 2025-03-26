import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ICustomer } from "../../models/costumer";
import { useCustomer } from "../../hooks/useCustomer";
import "../update/customerUpdate.css"

export const UpdateCustomerPage = () => {
    
        const [customer, setCustomer] = useState<ICustomer>()
        const {isLoading, error, fetchCustomerByIdHandler, updateCustomerHandler } = useCustomer();
        const params = useParams();
        const navigate = useNavigate();
    
        useEffect(()=> {
            if(!params.id) return;
            fetchCustomerByIdHandler(+params.id).then((data) => setCustomer(data))
        }, [])
        
        const handleChange = (e:FormEvent<HTMLInputElement>) => {

            if(!customer) return;
            const target = e.currentTarget

            if(target.name === "firstname")
                setCustomer({...customer, firstname: e.currentTarget.value})
            if(target.name === "lastname")
                setCustomer({...customer, lastname: e.currentTarget.value})
            if(target.name === "phone")
                setCustomer({...customer, phone: e.currentTarget.value})
            if(target.name === "email")
                setCustomer({...customer, email: e.currentTarget.value})
            if(target.name === "street_address")        
                setCustomer({...customer, street_address: e.currentTarget.value})
            if(target.name === "postal_code")
                setCustomer({...customer, postal_code: e.currentTarget.value})
            if(target.name === "city")
                setCustomer({...customer, city: e.currentTarget.value})
            if(target.name === "country")
                setCustomer({...customer, country: e.currentTarget.value})
        }

        
        const handleSubmit = async (e:FormEvent) => {
            e.preventDefault();    
            if(!customer) return;
    
            await updateCustomerHandler(customer.id, {...customer, 
                firstname: customer.firstname,
                lastname: customer.lastname,
                email: customer.email,
                phone: customer.phone,
                street_address: customer.street_address,
                postal_code: customer.postal_code,
                city: customer.city,
                country: customer.country,});
            navigate("/admin/customers")       
        }
    
        if (isLoading) return <p>Loading..</p>
        if (error) return <p>{error}</p>
    
        return(
            <>
            
            <div className="object-container">
            <p>Customer Id: {customer?.id}</p>
            <form onSubmit={handleSubmit}>
                <p>name:</p>
                <input type="string"
                name="firstname"
                value={customer?.firstname} 
                onChange={handleChange}
                />
                <input type="string"
                name="lastname"
                value={customer?.lastname} 
                onChange={handleChange}
                />
                <p>phone:</p>
                <input type="string"
                name="phone"
                value={customer?.phone} 
                onChange={handleChange}
                />
                "email:"
                <input type="string"
                name="email"
                value={customer?.email} 
                onChange={handleChange}
                />
                "address"
                <input type="string"
                name="street_address"
                value={customer?.street_address} 
                onChange={handleChange}
                />
                <input type="string"
                name="postal_code"
                value={customer?.postal_code} 
                onChange={handleChange}
                />
                <input type="string"
                name="city"
                value={customer?.city} 
                onChange={handleChange}
                />
                <input type="string"
                name="country"
                value={customer?.country} 
                onChange={handleChange}
                />
                <button type="submit">Update Customer</button>
            </form>
            <Link to="/admin/customers">Back to customers</Link>
            </div>
            </>
        )
    }