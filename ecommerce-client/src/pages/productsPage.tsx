import { useEffect, useState } from "react"
import { Link } from "react-router";
import { useProducts } from "../hooks/useProduct";
import "../style/productPageStyle.css"
import CategorySearch from "../components/searchCategory";

export const ProductsPage = () => {
    const {products, isLoading, error, fetchProductsHandler } = useProducts();
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        fetchProductsHandler();
    }, [])

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    const categories = ["snowboard", "ski", "accesories"];
  
    const handleSearch = (search: string) => {    
    if (search.trim() === "") {
        setFilteredProducts(products);
    } else {
        setFilteredProducts(products.filter((p) => p.category.toLowerCase() === search.toLowerCase()));
    }
};

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <>
            <div className="products-container">
                <h2>Our Products</h2>
                <CategorySearch searchCategory={handleSearch} categories={categories}/>
    
                <section className="product-container">
                    {filteredProducts.map((product) => (
                        <article key={product.id}>
                            <div className="article-style">
                                <div className="img-container">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <h3>{product.name} - {product.price}kr </h3>
                                <Link to={`/products/${product.id}`}>{product.name} Details</Link>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </>
    )
}