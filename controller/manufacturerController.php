<?php

include_once '../classes/Manufacturer.php';

if (isset($_POST['name']))
{
    $manufacturer = new Manufacturer();
    $status = $manufacturer->setManufacturer($_POST);
    return $status;
}

