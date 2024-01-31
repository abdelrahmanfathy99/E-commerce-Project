<?php

/**
 * Represents a book product.
 *
 * This class extends the Product class and adds specific properties for books.
 */
class Book extends Product
{
    private $weight;
    private $type;

    public function __construct(array $product)
    {
        parent::__construct($product);
        $this->type = $product['product_type'];
        $this->weight = $product['product_weight'];
    }

    public function save(Database $database): bool
    {
        $conn = $database->getConnection();
        $stmt = $conn->prepare("INSERT INTO products (product_sku, product_name, product_price, product_type, product_weight) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssdsd", $this->sku, $this->name, $this->price, $this->type, $this->weight);
        return $stmt->execute();
    }

    public function getWeight(): float
    {
        return $this->weight;
    }
}
