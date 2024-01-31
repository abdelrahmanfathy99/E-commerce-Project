<?php

/**
 * Represents a DVD product.
 *
 * This class extends the Product class and adds specific properties for DVD.
 */
class Dvd extends Product
{
    private $size;
    private $type;

    public function __construct(array $product)
    {
        parent::__construct($product);
        $this->type = $product['product_type'];
        $this->size = $product['product_size'];
    }

    public function save(Database $database): bool
    {
        $conn = $database->getConnection();
        $stmt = $conn->prepare("INSERT INTO products (product_sku, product_name, product_price, product_type, product_size) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssdsd", $this->sku, $this->name, $this->price, $this->type, $this->size);
        return $stmt->execute();
    }

    public function getSize(): float
    {
        return $this->size;
    }
}
