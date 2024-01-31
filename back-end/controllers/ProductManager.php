<?php
class ProductManager
{
    /**
     * Adds a new product to the database.
     *
     * @param array $data An associative array containing product data.
     * @param Database $database The database instance to use for adding the product.
     * @return bool Returns true if the product was added successfully, false otherwise.
     */
    public function addProduct(array $data, Database $database): bool
    {
        $sku = $data['product_sku'];

        if ($this->skuExists($sku, $database)) {
            return false; // SKU already exists
        }

        $product = $this->createProductFromData($data);
        return $product->save($database);
    }

    /**
     * Checks if a product with the given SKU already exists in the database.
     *
     * @param string $sku The SKU of the product to check.
     * @param Database $database The database instance to use for checking the SKU.
     * @return bool Returns true if the SKU exists, false otherwise.
     */
    public function skuExists($sku, Database $database): bool
    {
        $conn = $database->getConnection();
        $stmt = $conn->prepare("SELECT COUNT(*) AS skuCount FROM products WHERE product_sku = ?");
        $stmt->bind_param("s", $sku);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_assoc();

        return $data['skuCount'] > 0;
    }

    /**
     * Retrieves all products from the database.
     *
     * @param Database $database The database instance to use for fetching products.
     * @return array Returns an array containing all products fetched from the database.
     */
    public function getProducts(Database $database)
    {
        $conn = $database->getConnection();
        $result = $conn->query("SELECT * FROM products");

        $products = [];

        while ($row = $result->fetch_assoc()) {
            // $product = $this->createProductFromRow($row);
            $product = $row;
            $products[] = $product;
        }

        return $products;
    }

    /**
     * Deletes products specified in the $productIds param array.
     * 
     * @param array $productIds An array containing the IDs of the products to delete.
     * @param Database $database The database instance to use for deleting products.
     * @return mixed Returns the number of deleted rows or false if nothing happened. 
     */
    public function deleteProducts(array $productIds, Database $database)
    {
        $conn = $database->getConnection();

        // Generate placeholders based on the number of product IDs
        $placeholders = implode(',', array_fill(0, count($productIds), '?'));

        // Create the SQL statement with dynamic placeholders
        $sql = "DELETE FROM products WHERE product_id IN ({$placeholders})";

        // Prepare and bind parameters
        $stmt = $conn->prepare($sql);
        $stmt->bind_param(str_repeat('i', count($productIds)), ...$productIds);

        // Execute the statement
        return $stmt->execute();
    }

    /**
     * Creates a product object from the provided data.
     *
     * @param array $data An associative array containing product data.
     * @return Product Returns an instance of the appropriate product class based on the 'product_type' key in the data array.
     */
    private function createProductFromData(array $data): Product
    {
        $productType = $data['product_type'];
        return new $productType($data);
    }
}
