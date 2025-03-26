import { useEffect } from "react"
import { Link, useNavigate } from "react-router";
import { useProducts } from "../../hooks/useProduct";
import "../adminList.css"
import { AdminHeader } from "../../components/admin-header";

export const ProductItems = () => {

    const {products, isLoading, error, fetchProductsHandler, deleteProductHandler } = useProducts();
    const nav = useNavigate();
    
        useEffect(() => {
            fetchProductsHandler();
        }, [])

        const deleteProd = async(id:number) => {
            
            await deleteProductHandler(id);
            nav("/admin/productItems");
        }
    
        if (isLoading) return <p>Loading...</p>
        if (error) return <p>{error}</p>

    return(
    <>
    <AdminHeader />
    <div className="list-container">
    <h2> Products </h2>
    <div>
        <Link to="createProduct">Add new product</Link>
    </div>
    <div>
        <section>
            {products.map((p) => (
                <div key={p.id} className="list-section">
                    <p>Product name: {p.name}</p>
                    <p>Price: {p.price}</p>
                    <p>Stock: {p.stock}</p>
                    <ul>
                    <li><a onClick={() => {deleteProd(p.id)}}>Delete product </a></li>
                    <li><Link to ={`/updateProductPage/${p.id}`}>Update Product </Link></li>
                    <li><Link to={`/admin/productItems/productItem/${p.id}`}> Product details</Link></li>
                    </ul>
                </div>
                
            ))}
        </section>
    </div>
    </div>
    </>
    )
}