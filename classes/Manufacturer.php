<?php

include_once 'Database.php';

class Manufacturer
{
    public function setManufacturer($post)
    {
        $connection = new Database();
        $databaseConnection = $connection->connect();
        $name = $connection->testData($post['name']);
        $checkIfNameExists = $connection->getdata($databaseConnection, "SELECT * FROM manufacturer WHERE name = '$name'");
        if ($checkIfNameExists->num_rows == 0)
        {
            $connection->setdata($databaseConnection, "INSERT INTO manufacturer (name) VALUES('$name')");
            $affectedRows = mysqli_affected_rows($databaseConnection);
            if ($affectedRows == 1)
            {
                echo '<p class="alert alert-success"> Manufacturer is added.</p>';
            }
            else
            {
                echo '<p class="alert alert-danger">Something went wrong. Manufacturer is not added.</p>';
            }
        }
        else
        {
            echo '<p class="alert alert-danger">Manufacturere name already exists.</p>';
        }
    }
}