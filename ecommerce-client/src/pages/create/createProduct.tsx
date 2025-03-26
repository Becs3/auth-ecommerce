import { FormEvent, useState } from "react";
import { useProducts } from "../../hooks/useProduct"
import { Product } from "../../models/product";
import { Link, useNavigate } from "react-router";
import "../adminObject.css"

export const CreateProduct = () => {
    
    const [product, setProduct] = useState<Product>({
        id: 0,
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "snowboard",
        image: "",
        created_at: ""
    })
    const {isLoading, error, createProductHandler} = useProducts();
    const nav = useNavigate();

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();
        
        await createProductHandler({
            id:0,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category,
            image: product.image,
            created_at: ""
        })

        nav("/admin/productItems");
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return(
        <>
        <div className="object-container">
        <h2>Add new product</h2>

        <form onSubmit = {handleSubmit}>
            <ul>
            <li><input type="text" 
            placeholder="Product name"
            value={product?.name}
            onChange={(e) => setProduct({...product, name: e.target.value})}
             /></li>
            <li><input type="text" 
             placeholder="Description"
            value={product?.description}
            onChange={(e) => setProduct({...product, description: e.target.value})}
             /></li>
            <li><input type="number" 
             placeholder="price"
            value={product?.price}
            onChange={(e) => setProduct({...product, price: +e.currentTarget.value})}
             /></li>
            <li><input type="number" 
             placeholder="stock"
            value={product?.stock}
            onChange={(e) => setProduct({...product, stock: +e.target.value})}
             /></li>
            <li><input type="text" 
             placeholder="category"
            value={product?.category}
            onChange={(e) => setProduct({...product, category: e.target.value})}
            /></li>
            <li><input type="text" 
             placeholder="image"
            value={product?.image}
            onChange={(e) => setProduct({...product, image: e.target.value})}
            /></li>
            <li><button type="submit">Add new product</button></li>
            </ul>
            <Link to="/admin/productItems">Go back to products</Link>
        </form>
        </div>
        </>
    )
}