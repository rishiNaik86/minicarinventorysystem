<?php

include_once 'Database.php';

class Model
{
    public function setModel($post)
    {
        $connection = new Database();
        $databaseConnection = $connection->connect();
        $name = $connection->testData($post['name']);
        $manufacturer = $connection->testData($post['manufacturer']);
        $color = $connection->testData($post['color']);
        $manYear = $connection->testData($post['manYear']);
        $regNum = $connection->testData($post['regNum']);
        $note = $connection->testData($post['note']);
        $connection->setdata($databaseConnection, "INSERT INTO model (name, manufacturer_id, color, manufacture_year, registration_number, note) "
            . "VALUES('$name', '$manufacturer', '$color', '$manYear', '$regNum', '$note')");
        $affectedRows = mysqli_affected_rows($databaseConnection);
        if ($affectedRows == 1)
        {
            echo '<p class="alert alert-success"> Model is added.</p>';
        }
        else
        {
            echo '<p class="alert alert-danger">Something went wrong. Model is not added.</p>';
        }
    }
    
    public function listModel($get)
    {
        $connection = new Database();
        $databaseConnection = $connection->connect();
        $allModels = $connection->getdata($databaseConnection, "SELECT Model.id as modelId, Model.name as modelName, Model.count as modelCount, Manufacturer.id as manufacturerId, Manufacturer.name as manufacturerName FROM Model INNER JOIN Manufacturer ON Model.manufacturer_id = Manufacturer.id");
        $i = 1;
        $returnArray = array();
        foreach ($allModels as $model)
        {
            $serialNumber = $i;
            $manufacturerName = $model['manufacturerName'];
            $modelName = $model['modelName'];
            $modelCount = $model['modelCount'];
            $modelId = $model['modelId'];
            $returnArray[] = array("id" => $serialNumber,
                "manufacturerName" => $manufacturerName,
                "modelName" => $modelName,
                "modelCount" => $modelCount,
                "modelId" => $modelId
            );
            $i++;
        }
        echo json_encode($returnArray);       
    }
    
    public function updateModel($post)
    {
        $connection = new Database();
        $databaseConnection = $connection->connect();
        $modelId = $connection->testData($post['id']);
        $singleModel = $connection->getdata($databaseConnection, "SELECT * FROM model WHERE id = $modelId");
        $row = mysqli_fetch_assoc($singleModel);
        $count = $row['count'] + 1;
        $updateModel = $connection->setdata($databaseConnection, "UPDATE model SET count = $count WHERE id = $modelId");
        $affectedRows = mysqli_affected_rows($databaseConnection);
        if ($affectedRows == 1)
        {
            echo '<p class="alert alert-success"> Model count is updated.</p>';
        }
        else
        {
            echo '<p class="alert alert-danger">Something went wrong. Model count is not updated.</p>';
        }
    }
}

