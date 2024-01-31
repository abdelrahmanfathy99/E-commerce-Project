import { Card, Col } from "react-bootstrap";
function Dvd({ product }) {
    const {
        product_id,
        product_name,
        product_sku,
        product_price,
        product_size
    } = product;

    return (
        <Col xs={7}>
            <Card className="info-card">
                <div>
                    <input type="checkbox" productid={product_id} className="delete-checkbox" />
                </div>
                <div className="product-content">
                    <p>{product_sku}</p>
                    <p>{product_name}</p>
                    <p>{product_price} $</p>
                    <p style={{ marginBottom: '20px' }}>{product_size} MB</p>
                </div>
            </Card>
        </Col>
    );
}

export default Dvd;