import { ChangeEvent, useEffect, useState } from "react"
import { useCustomer } from "../../hooks/useCustomer"
import { NewCartCustomer } from "./createNewCustomerCart";
import { Customer} from "../../models/costumer";

type ICustomerData = {
  CustomerData: (customer: Customer | null) => void;
};

export const CartCustomerDetails = ({CustomerData}: ICustomerData) => {
    const [customerEmail, setCustomerEmail] = useState("")
    const {fetchCustomersHandler, fetchCustomerByEmailHandler}=useCustomer();
    const [isCustomer, setIsCustomer] = useState<boolean>(true)
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchCustomersHandler();
    }, [])

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setCustomerEmail(email)
    }

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if(!customerEmail) return
        
    try{
        
        const customerFound = await fetchCustomerByEmailHandler(customerEmail)

    if (customerFound) {
        setIsCustomer(true);
        setMessage("You have an account, proceed to checkout")
        CustomerData(customerFound)
      } else {
        setIsCustomer(false);
      }

    } catch(error) {
        console.log("error", error),
        setMessage("an error occurred please try again")
    }
}

    const newCustomer = (customer: Customer | null) => {
        CustomerData(customer)
        setIsCustomer(true);
        setMessage("Your account has been created! Proceed to checkout.");
    }

    return(
        <>
        <div>
            {isCustomer ? (
        <form onSubmit={handleSubmit}>
        <p>Already a customer:</p>
        <input type="text"
        placeholder="email" 
        value={customerEmail}
        onChange={handleChange}/>
        <button type="submit">Check</button>
        {message}
        </form>
        ):
        (
            <>
            <NewCartCustomer CustomerData = {newCustomer} />
            </>

        )
        }
        </div>
        
        </>
    )
}