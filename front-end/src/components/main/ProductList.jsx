import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Footer from '../Footer/Footer.jsx';
import ProductType from './products/ProductType.jsx';
import axios from 'axios';


function ProductList() {
    // State to store the list of products
    const [products, setProducts] = useState([]);

    // Fetch data from the API when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost/CRUDProject/public/index.php');
            const data = response.data;

            if (data.value) {
                setProducts(data.value);
            } else if (data.error) {
                console.error("API Error:", data.error);
            } else {
                console.error("Unexpected API Response:", data);
            }
        } catch (error) {
            console.error("Fetch Error :", error);
        }
    };

    // Remove products that are selected for deletion
    const deleteProduct = async () => {
        const currentProducts = document.getElementsByClassName('delete-checkbox');
        const productsIds = [];

        for (const item of currentProducts) {
            if (item.checked === true) {
                productsIds.push(parseInt(item.getAttribute('productid')));
            }
        }

        if (productsIds.length > 0) {
            try {
                const response = await axios.post('http://localhost/CRUDProject/public/index.php', {
                    productIds: productsIds,
                }, {
                    headers: { 'Content-Type': 'application/json' },
                });

                // Refresh the product list after deletion
                fetchData();
                console.log('Products deleted:', response.data);

                // Reset checkbox state after deletion
                for (const item of currentProducts) {
                    item.checked = false;
                }

            } catch (error) {
                console.error('Error deleting products:', error);
            }
        }
    };

    return (
        <>
            <Container>
                <Row style={{ marginTop: '10px' }}>
                    <Col md={4} xs={12} className="text-center text-md-start">
                        <h3>Product List</h3>
                    </Col>
                    <Col md={8} xs={12} className="d-flex justify-content-md-end justify-content-center">
                        <Link to="/add-product">
                            <Button variant="outline-dark" className="me-4 custom-border">
                                <span className='main-button'>ADD</span>
                            </Button>
                        </Link>
                        <Button variant="outline-dark" id='delete-product-btn' className="custom-border" onClick={deleteProduct}>
                            <span className='main-button'>MASS DELETE</span>
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Container>
                <hr className='custom-hr' style={{ marginBottom: '25px' }} />
                <Row xs={1} sm={2} md={3} lg={4} className="justify-content-center">
                    {products.length > 0 ?
                        products.map((product, index) => (
                            <ProductType key={index} product={product} />
                        ))
                        : <Col xs={12} className='text-center'><p style={{ fontWeight: '500' }}>No Products</p></Col>
                    }
                </Row>
                <hr className='custom-hr' />
            </Container>
            <Footer />
        </>
    );
}

export default ProductList;