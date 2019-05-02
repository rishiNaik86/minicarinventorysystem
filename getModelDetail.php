<?php

include_once 'classes/Database.php';

if (isset($_GET['id']))
{
    $connection = new Database();
    $databaseConnection = $connection->connect();
    $id = $connection->testData($_GET['id']);
    $singleModel = $connection->getdata($databaseConnection, "SELECT Model.id as modelId, Model.name as modelName, Model.count as modelCount, Model.color as modelColor, Model.manufacture_year as modelManYear, Model.registration_number as modelRegNumber, Model.note as modelNote, Manufacturer.id as manufacturerId, Manufacturer.name as manufacturerName FROM Model INNER JOIN Manufacturer ON Model.manufacturer_id = Manufacturer.id WHERE Model.id = '$id'");
    $row = mysqli_fetch_assoc($singleModel);
    //var_dump($row);
?>
<div class="container">
    <div class="form-group">
        <label>Model Name:</label>
        <?php echo $row['modelName']; ?>
    </div>
    <div class="form-group">
        <label>Manufacturer Name:</label>
        <?php echo $row['manufacturerName']; ?>
    </div>
    <div class="form-group">
        <label>Color:</label>
        <?php echo $row['modelColor']; ?>
    </div>
    <div class="form-group">
        <label>Manufacturing Year:</label>
        <?php echo $row['modelManYear']; ?>
    </div>
    <div class="form-group">
        <label>Registration Number:</label>
        <?php echo $row['modelRegNumber']; ?>
    </div>
    <div class="form-group">
        <label>Note:</label>
        <?php echo $row['modelNote']; ?>
    </div>
    <div class="form-group">
        <label>Count:</label>
        <?php echo $row['modelCount']; ?>
    </div>
</div>
<?php
}
