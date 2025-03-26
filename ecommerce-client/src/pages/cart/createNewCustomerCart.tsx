import { FormEvent, useState } from "react";
import { Customer } from "../../models/costumer";
import { useCustomer } from "../../hooks/useCustomer";

type INewCustomerData = {
  CustomerData: (customer: Customer | null) => void;
};

export const NewCartCustomer = ({CustomerData}:INewCustomerData) => {

    const [message, setMessage] = useState("");
    const {isLoading, error, createCustomerHandler} = useCustomer();
    const [customer, setCustomer] = useState<Customer>({
        id: 0,
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        street_address: "",
        postal_code: "",
        city: "",
        country: "",
        created_at: ""

    })

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();

        try {   
        const newCustomer = await createCustomerHandler({
            id: 0,
            firstname: customer.firstname,
            lastname: customer.lastname,
            email: customer.email,
            password: customer.password,
            phone: customer.phone,
            street_address: customer.street_address,
            postal_code: customer.postal_code,
            city: customer.city,
            country: customer.country,
            created_at: ""
        })
        setMessage("Your information has been added");
        CustomerData(newCustomer)
        } catch(error){
            console.error("Error", error)
            setMessage("")
        }
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return(
        <>
        <div className="object-container">
            <h2>Create new customer</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                <li><input type="text"
                placeholder="firstname"
                value={customer.firstname}
                onChange={(e)=> setCustomer({...customer, firstname: e.target.value})} 
                /></li>
                <li><input type="text"
                placeholder="lastname"
                value={customer.lastname}
                onChange={(e)=> setCustomer({...customer, lastname: e.target.value})} 
                /></li>
                <li><input type="text"
                placeholder="phone"
                value={customer.phone}
                onChange={(e)=> setCustomer({...customer, phone: e.target.value})} 
                /></li>
                <li><input type="text"
                placeholder="email"
                value={customer.email}
                onChange={(e)=> setCustomer({...customer, email: e.target.value})} 
                /></li>
                <li><input type="text"
                placeholder="street"
                value={customer.street_address}
                onChange={(e)=> setCustomer({...customer, street_address: e.target.value})} 
                /></li>
                <li><input type="text"
                placeholder="postal code"
                value={customer.postal_code}
                onChange={(e)=> setCustomer({...customer, postal_code: e.target.value})} 
                /></li>
                <li><input type="text"
                placeholder="city"
                value={customer.city}
                onChange={(e)=> setCustomer({...customer, city: e.target.value})} 
                /></li>
                <li><input type="text"
                placeholder="country"
                value={customer.country}
                onChange={(e)=> setCustomer({...customer, country: e.target.value})} 
                /></li>
                <li><input type="text"
                placeholder="password"
                value={customer.password}
                onChange={(e)=> setCustomer({...customer, password: e.target.value})} 
                /></li>
                </ul>
            <button type="submit">Add new customer</button>
        </form>
        {message}
        </div>
        </>
    )
}