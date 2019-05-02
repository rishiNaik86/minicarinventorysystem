<?php

include_once '../classes/Model.php';
include_once '../classes/Database.php';

if (isset($_POST['name'])) 
{
    $model = new Model();
    $status = $model->setModel($_POST, $_FILES);
    return $status;
}

if (isset($_GET['action']))
{
    $model = new Model();
    $status = $model->listModel($_GET);
    return $status;
}

if (isset($_POST['action']))
{
    if ($_POST['action'] == 2) 
    {
        $model = new Model();
        $status = $model->updateModel($_POST);
        return $status;
    }
}

