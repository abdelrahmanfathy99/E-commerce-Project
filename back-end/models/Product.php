<?php

/**
 * Represents a product.
 *
 * This abstract class defines the basic properties and methods that all products share.
 */
abstract class Product
{
    protected $sku;
    protected $name;
    protected $price;

    public function __construct(array $product)
    {
        $this->sku = $product['product_sku'];
        $this->name = $product['product_name'];
        $this->price = $product['product_price'];
    }

    /**
     * Save the products to the database.
     * will be redeclared in each product type.
     *
     * @return bool
     */
    abstract public function save(Database $database): bool;

    public function getSku(): string
    {
        return $this->sku;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getPrice(): float
    {
        return $this->price;
    }
}
