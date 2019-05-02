<?php

include_once 'Database.php';

class Model
{
    public function setModel($post, $files)
    {
        $connection = new Database();
        $databaseConnection = $connection->connect();
        if (!empty($files['attachment']['name']))
        {
            $fileUpload = $this->fileUpload($files, $post);
            if ($fileUpload['status'] == 1)
            {
                $fileName = $fileUpload['message'];
                $connection->setdata($databaseConnection, "INSERT INTO upload (name) VALUES ('$fileName')");
                $lastInsertedIdUpload = mysqli_insert_id($databaseConnection);
            }
            else
            {
                echo $fileUpload['message'];
            }
        }
        $name = $connection->testData($post['name']);
        $manufacturer = $connection->testData($post['manufacturer']);
        $color = $connection->testData($post['color']);
        $manYear = $connection->testData($post['manYear']);
        $regNum = $connection->testData($post['regNum']);
        $note = $connection->testData($post['note']);
        $connection->setdata($databaseConnection, "INSERT INTO model (name, manufacturer_id, color, manufacture_year, registration_number, note) "
            . "VALUES('$name', '$manufacturer', '$color', '$manYear', '$regNum', '$note')");
        $affectedRows = mysqli_affected_rows($databaseConnection);
        $lastInsertedIdModel = mysqli_insert_id($databaseConnection);
        if (!empty($files['attachment']['name']))
        {
            $connection->setdata($databaseConnection, "INSERT INTO jnct_model_upload (model_fk, upload_fk) VALUES ('$lastInsertedIdUpload', '$lastInsertedIdModel')");
        }
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
    
    public function fileUpload($files, $post)
    {
        $target_dir = "../uploads/";
        $target_file = $target_dir . basename($files["attachment"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
            // Check if image file is a actual image or fake image
        if(isset($post["submit"])) 
        {
            $check = getimagesize($files["attachment"]["tmp_name"]);
            if($check !== false) 
            {
                //echo "File is an image - " . $check["mime"] . ".";
                $uploadOk = 1;
            } else 
            {
                //echo "File is not an image.";
                $uploadOk = 0;
            }
        }
            // Check if file already exists
        if (file_exists($target_file)) 
        {
            //echo "Sorry, file already exists.";
            $uploadOk = 0;
        }
            // Check file size
        if ($files["attachment"]["size"] > 500000) 
        {
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }
            // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) 
        {
            //echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }
            // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) 
        {
            // echo "Sorry, your file was not uploaded.";
            $message['message'] = "Sorry, your file was not uploaded.";
            $message['status'] = 0;
            return $message;
            // if everything is ok, try to upload file
        } 
        else 
        {
            if (move_uploaded_file($files["attachment"]["tmp_name"], $target_file)) 
            {
                //echo "The file ". basename( $files["attachment"]["name"]). " has been uploaded.";
                $message['message'] = $files["attachment"]["name"];
                $message['status'] = 1; 
                return $message;
            } 
            else 
            {
                //echo "Sorry, there was an error uploading your file.";
                $message['message'] = "Sorry, there was an error uploading your file.";
                $message['status'] = 0; 
                return $message;
            }
        }
    }
}

