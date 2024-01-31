<?php
require_once '../database/Database.php';
require_once '../models/Product.php';
require_once '../models/Book.php';
require_once '../models/Dvd.php';
require_once '../models/Furniture.php';
require_once '../controllers/ProductManager.php';

// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
header("Access-Control-Allow-Headers: *");

// Instantiate database and product manager objects
$database = new Database();
$productManager = new ProductManager();

// Get the request method
$requestMethod = $_SERVER["REQUEST_METHOD"];

// Check if the request method is OPTIONS (CORS preflight request)
if ($requestMethod === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Process the request based on the request method
switch ($requestMethod) {
    case 'GET':
        // Check if a specific SKU is provided in the query string
        $sku = isset($_GET['sku']) ? $_GET['sku'] : null;
        if ($sku !== null) {
            // Check if the SKU exists in the database
            $skuExists = $productManager->skuExists($sku, $database);
            echo json_encode(array("skuExists" => $skuExists));
        } else {
            // Get all products from the database
            $products = $productManager->getProducts($database);
            echo json_encode(array("value" => $products));
        }
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (isset($data['productIds'])) {
            $result = $productManager->deleteProducts($data['productIds'], $database);
            if ($result) {
                http_response_code(200);
                echo json_encode(array("message" => "Products deleted successfully"));
            } else {
                http_response_code(500);
                echo json_encode(array("error" => "Error deleting products"));
            }
        } else {
            $result = $productManager->addProduct($data, $database);
            if ($result === false) {
                http_response_code(409); // Conflict (SKU already exists)
                echo json_encode(array("error" => "SKU already exists"));
            } else {
                http_response_code(201);
                echo json_encode(array("message" => "Product added successfully"));
            }
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Request method not allowed"));
        break;
}
