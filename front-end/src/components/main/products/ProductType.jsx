import Book from "./Book";
import Dvd from "./Dvd";
import Furniture from "./Furniture";

function ProductType({ product }) {
    const type = product.product_type;
    
    return (
        <>
            {type === "Book" && <Book product={product} />}
            {type === "DVD" && <Dvd product={product} />}
            {type === "Furniture" && <Furniture product={product} />}
        </>
    );
}

export default ProductType;