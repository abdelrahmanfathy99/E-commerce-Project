import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import Footer from '../Footer/Footer.jsx';
import axios from 'axios';
import DOMPurify from 'dompurify';

function ProductAdd() {
    // States to manage form inputs.
    const [selectedProduct, setSelectedProduct] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [showSkuExistsMessage, setShowSkuExistsMessage] = useState(false);
    const navigate = useNavigate();

    // Handle Form Submission.
    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = document.getElementById('product_form');

        // Collect form data.
        const product = {
            product_sku: sanitizeInput(document.getElementById('sku').value),
            product_name: sanitizeInput(document.getElementById('name').value),
            product_price: sanitizeInput(document.getElementById('price').value),
            product_type: sanitizeInput(document.getElementById('productType').value),
            product_size: sanitizeInput(document.getElementById('size')?.value || null),
            product_weight: sanitizeInput(document.getElementById('weight')?.value || null),
            product_height: sanitizeInput(document.getElementById('height')?.value || null),
            product_width: sanitizeInput(document.getElementById('width')?.value || null),
            product_length: sanitizeInput(document.getElementById('length')?.value || null)
        }

        // Validate form inputs and submit if valid.
        if (form) {
            if (validateInputs(form)) {
                // Check Sku Existence in the database.
                const skuExists = await checkSkuExists(product.product_sku);
                if (!skuExists) {
                    setShowSkuExistsMessage(false);

                    try {
                        const response = await axios.post('http://localhost/CRUDProject/public/index.php', product, {
                            headers: { 'Content-Type': 'application/json' },
                        });

                        console.log('Product added successfully:', response.data);
                        // form.reset();
                        navigate("/");
                    } catch (error) {
                        console.error('Error adding product:', error);
                    }
                }
                else {
                    console.log("sku is already exists");
                }
            } else {
                // If any input is invalid, set the form to be validated
                setFormValid(true);
            }
        }

    };

    // Validate Form inputs if there is any missing inputs.
    const validateInputs = (form) => {
        // check sku for every form submission
        handleSku();
        for (let i = 0; i < form.elements.length; i++) {
            const element = form.elements[i];

            if (element.tagName.toLowerCase() !== 'button' && !element.checkValidity()) {
                return false;
            }
        }
        return true;
    };

    // Check SKU  existence in database and display message accordingly.
    async function checkSkuExists(sku) {
        try {
            const response = await axios.get(`http://localhost/CRUDProject/public/index.php?sku=${sku}`);
            return response.data.skuExists;
        } catch (error) {
            console.error(error);
            return true; // Return true if there's an error to prevent adding the product
        }
    }

    // Handle product type selection.
    function handleProductType(event) {
        setSelectedProduct(event.target.value);
    }

    // Handle change of the SKU field to change the visibility of the Notification messages based on selected product type.
    function handleSku() {
        const skuVal = document.getElementById('sku').value;
        setShowSkuExistsMessage(skuVal !== '');
    }

    // Handle name field value validation, it allows only letters and numbers.
    const handleNameChange = (e) => {
        const { value } = e.target;
        const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, ''); // Remove any character that is not a letter or a number
        e.target.value = sanitizedValue; // Update the input value
    };

    // Sanitize input to prevent XSS attacks
    const sanitizeInput = (input) => {
        return DOMPurify.sanitize(input);
    };

    return (
        <>
            <Container>
                <Row style={{ marginTop: '10px' }}>
                    <Col md={8} xs={12} className="text-center text-md-start">
                        <h3>Product Add</h3>
                    </Col>
                    <Col md={4} xs={12} className="d-flex justify-content-md-end justify-content-center">
                        <Button variant="outline-dark" className="me-4 custom-border" onClick={handleSubmit}>
                            <span className='main-button'>Save</span>
                        </Button>
                        <Link to="/">
                            <Button variant="outline-dark" className="custom-border">
                                <span className='main-button'>Cancel</span>
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
            <Container>
                <hr className='custom-hr' />
                <Form noValidate validated={formValid} id='product_form'>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column lg='1' md='2' sm='2'>SKU</Form.Label>
                        <Col lg={4} md={6} sm={8}>
                            <Form.Control required type='text' id='sku' placeholder='Enter The SKU of the product' isInvalid={showSkuExistsMessage}></Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {showSkuExistsMessage ? 'This SKU already exists' : 'Please enter the sku.'}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column lg='1' md='2' sm='2'>Name</Form.Label>
                        <Col lg={4} md={6} sm={8}>
                            <Form.Control required type='text' onChange={handleNameChange} id='name' placeholder='Name of the product'></Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                Please enter the product name.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-5'>
                        <Form.Label column lg='1' md='2' sm='2'>Price ($)</Form.Label>
                        <Col lg={4} md={6} sm={8}>
                            <InputGroup>
                                <Form.Control required type='number' id='price' placeholder='Price of the product' step='any'></Form.Control>
                                <InputGroup.Text>$</InputGroup.Text>
                                <InputGroup.Text>0.00</InputGroup.Text>
                                <Form.Control.Feedback type='invalid'>Please provide the product price.</Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column lg='2' md='3' sm='3'>Type Switcher</Form.Label>
                        <Col lg={4} md={6} sm={8}>
                            <Form.Control required as="select" id='productType' type='select' onChange={handleProductType}>
                                <option value="" id=''>choose the product type</option>
                                <option value="Book" id='Book'>Book</option>
                                <option value="DVD" id='DVD'>DVD</option>
                                <option value="Furniture" id='Furniture'>Furniture</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>Please choose the product type.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    {selectedProduct == 'Book' && (
                        <div>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column lg='2' md='3' sm='3'>Weight (KG)</Form.Label>
                                <Col lg={4} md={6} sm={8}>
                                    <Form.Control required type='number' id='weight' placeholder='Enter The Book Weight' step='any'></Form.Control>
                                    <Form.Control.Feedback type='invalid'>Please enter the Book Weight.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <p className='product-desc'>* Please provide the Book Weight in KG *</p>
                        </div>
                    )}
                    {selectedProduct == 'DVD' && (
                        <div>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column lg='2' md='3' sm='3'>Size (MB)</Form.Label>
                                <Col lg={4} md={6} sm={8}>
                                    <Form.Control required type='number' id='size' placeholder='Enter The DVD Size' step='any'></Form.Control>
                                    <Form.Control.Feedback type='invalid'>Please enter the DVD Size.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <p className='product-desc'>* Please provide the DVD size in MB *</p>
                        </div>
                    )}
                    {selectedProduct == 'Furniture' && (
                        <div>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column lg='2' md='3' sm='3'>Height (CM)</Form.Label>
                                <Col lg={4} md={6} sm={8}>
                                    <Form.Control required type='number' id='height' placeholder='Enter The Furniture height' step='any'></Form.Control>
                                    <Form.Control.Feedback type='invalid'>Please enter the Furniture height.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column lg='2' md='3' sm='3'>Width (CM)</Form.Label>
                                <Col lg={4} md={6} sm={8}>
                                    <Form.Control required type='number' id='width' placeholder='Enter The Furniture Width' step='any'></Form.Control>
                                    <Form.Control.Feedback type='invalid'>Please enter the Furniture Width.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column lg='2' md='3' sm='3'>Length (CM)</Form.Label>
                                <Col lg={4} md={6} sm={8}>
                                    <Form.Control required type='number' id='length' placeholder='Enter The Furniture Length' step='any'></Form.Control>
                                    <Form.Control.Feedback type='invalid'>Please enter the Furniture Length.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <p className='product-desc'>* Please provide the Furniture dimensions in HxWxL Format *</p>
                        </div>
                    )}
                </Form>
                <hr className='custom-hr' style={{ marginTop: '100px' }} />
            </Container>
            <Footer />
        </>
    );
}

export default ProductAdd;