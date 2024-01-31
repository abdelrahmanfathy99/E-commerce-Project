<?php

/**
 * Represents a Furniture product.
 *
 * This class extends the Product class and adds specific properties for Furniture.
 */
class Furniture extends Product
{
    private $height;
    private $width;
    private $length;
    private $type;

    public function __construct(array $product)
    {
        parent::__construct($product);
        $this->type = $product['product_type'];
        $this->height = $product['product_height'];
        $this->width = $product['product_width'];
        $this->length = $product['product_length'];
    }

    public function save(Database $database): bool
    {
        $conn = $database->getConnection();
        $stmt = $conn->prepare("INSERT INTO products (product_sku, product_name, product_price, product_type, product_height, product_width, product_length) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssdsddd", $this->sku, $this->name, $this->price, $this->type, $this->height, $this->width, $this->length);
        return $stmt->execute();
    }

    public function getHeight(): float
    {
        return $this->height;
    }

    public function getWidth(): float
    {
        return $this->width;
    }

    public function getLength(): float
    {
        return $this->length;
    }
}
