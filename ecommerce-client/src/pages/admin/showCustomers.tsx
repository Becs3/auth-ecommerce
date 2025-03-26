import { useEffect } from "react"
import { Link, useNavigate } from "react-router";
import { useCustomer } from "../../hooks/useCustomer";
import "../adminList.css"
import { AdminHeader } from "../../components/admin-header";

export const ShowCustomers = () => {

    const {customers, isLoading, error, fetchCustomersHandler, deleteCustomerHandler } = useCustomer();
    const nav = useNavigate();
    
        useEffect(() => {
            fetchCustomersHandler();
        }, [])

        const deleteCust = async(id:number|null) => {
            if(!id) return; 

            await deleteCustomerHandler(id);
            nav("/admin/customers");
        }
    
        if (isLoading) return <p>Loading...</p>
        if (error) return <p>{error}</p>

    return(
    <>
    <AdminHeader />
    <div className="list-container">
    <h2> Customers </h2>
    <div>
        <Link to="createCustomer">Add new customer</Link>
    </div>
    <div>
        <section >
            {customers.map((c) => (
                <div key={c.id} className="list-section">
                    <p>Customer name: {c.firstname} {c.lastname} </p>
                    <p>Phone: {c.phone}</p>
                    <p>Email: {c.email}</p>
                    <ul>
                    <li><a onClick={() => {deleteCust(c.id)}}>Delete customer </a> </li>
                    <li><Link to ={`/updateCustomerPage/${c.id}`}>Update customer </Link></li>
                    <li><Link to={`/admin/showCustomers/customerPage/${c.id}`}> Customer details</Link></li>
                    </ul>
                </div>
                
            ))}
        </section>
    </div>
    </div>
    </>
    )
}