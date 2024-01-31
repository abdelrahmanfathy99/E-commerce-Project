<?php
require_once '../config/config.php';

/**
 * Handles database connection and errors.
 */
class Database
{
    private $connection;

    public function __construct()
    {
        $this->connect();
    }

    private function connect()
    {
        $this->connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

        if (mysqli_connect_error()) {
            die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
        }
    }

    public function getConnection()
    {
        return $this->connection;
    }
}
