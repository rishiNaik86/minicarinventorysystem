<?php
class Database
{
    public function connect()
    {
        $connection = new mysqli('localhost', 'root', '', 'car_inventory');
        return $connection;
    }
    
    public function setdata($connection, $sql)
    {
        $results = mysqli_query($connection, $sql);
        return $results;
    }
    
    public function getdata($connection, $sql)
    {
        $results = mysqli_query($connection, $sql);
        return $results;
    }
    
    public function delete($connection, $sql)
    {
        $results = mysqli_query($connection, $sql);
    }
    
    public function testData($data) 
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
}
?>