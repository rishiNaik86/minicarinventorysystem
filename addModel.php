<?php

include_once 'classes/Database.php';

$connection = new Database();
$databaseConnection = $connection->connect();
$manufacturers = $connection->getdata($databaseConnection, "SELECT * FROM manufacturer WHERE 1");
?>
<div>
    <h2>Add Model Form</h2>
</div>
<div>
    <div id="response"></div>
    <form id="addModel">
        <div class="row">
        <div class="form-group col-xs-6">
            <label for="name">Name*</label>
            <input type="text" name="name" id="name" class="form-control" placeholder="Name">
        </div>
        <div class="form-group col-xs-6">
            <label for="manufacturer">Manufacturer*</label>
            <select id="manufacturer" name="manufacturer" class="form-control">
                <?php foreach($manufacturers as $manufacturer) {?>
                <option value="<?php echo $manufacturer['id']; ?>"><?php echo $manufacturer['name']; ?></option>
                <?php } ?>
                </select>
            </div>
        <div class="form-group col-xs-12">
            <label for="color">Color</label>
            <input type="text" name="color" id="color" class="form-control" placeholder="Color">
        </div>
        <div class="form-group col-xs-12">
            <label for="manYear">Manufacturing Year*</label>
            <select id="manYear" name="manYear" class="form-control">
                <?php for($i = 2000; $i <= date('Y'); $i++) { ?>
                <option value="<?php echo $i; ?>"><?php echo $i; ?></option>
                <?php } ?>
            </select>
        </div>
        <div class="form-group col-xs-12">
            <label for="regNum">Regisration Number*</label>
            <input type="text" name="regNum" id="regNum" class="form-control" placeholder="Registration Number">
        </div>
        <div class="form-group col-xs-12">
            <label for="note">Note</label>
            <textarea name="note" id="note" class="form-control" placeholder="Note" rows="5" cols="40"></textarea>
        </div>
        <div class="form-group col-xs-12">
            <label for="uploadFiles">Upload Picture</label>
            <input type="file" id="myfile1" name="attachment">
        </div>
        <div class="form-group col-xs-12">
        <input type="submit" class="btn btn-default" value="Submit" name="submit">
        </div>
        </div>
    </form>
</div>
<script type="text/javascript">
    $(function() {
        $("#addModel").validate({
            rules: {
                name: "required",
                manYear: "required",
                regNum: {
                    required: true,
                    number: true,
                    rangelength: [4, 8]
                }
            },
            messages: {
                name: "Please enter model name",
                manYear: "Please enter manufacturing year",
                regNum: {
                    required: "Please enter registration number",
                    number: "Entered value must be number",
                    rangelength: "Number should be between 4 to 8 digits"
                }
            },
            submitHandler: function(form) {
                var $form = $(form);
                $.ajax({
                    type: 'post',
                    url: "controller/modelController.php",
                    //data: $form.serialize(),
                    data: new FormData(form),
                    mimeType: "multipart/form-data",
                    cache: false,
                    contentType: false,
                    processData: false, 
                    success: function(response)
                    {
                        $('#response').html(response);
                        $('#addModel')[0].reset();
                    }
                });
            }
        });
    });
</script>