<!DOCTYPE html>
<html lang="en">
    <head>
	<title>Mini Car Inventory System</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>-->
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.0/dist/jquery.validate.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css" />
        <script src="js/script.js"></script>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body onload="addManufacturerForm()">
        <div class="container">
            <div class="menu">
                <ul>
                    <li><a href="#" onclick="addManufacturerForm()" title="Add Manufacturer">Page 1</a></li>
                    <li><a href="#" onclick="addModelForm()" title="Add Model">Page 2</a></li>
                    <li><a href="#" onclick="listModels()" title="Inventory">Page 3</a></li>
                </ul>
            </div>
            <div id="replace">
                
            </div>
        </div>
    </body>
</html>

