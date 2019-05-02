<div>
    <h2>Add Manufacturer Form</h2>
</div>
<div>
    <div id="response"></div>
    <form id="addManufacturer">
        <div class="form-group">
            <label for="name">Name*</label>
            <input type="text" name="name" id="name" class="form-control" placeholder="Name">
        </div>
        <input type="submit" class="btn btn-default" value="Submit" name="submit">
    </form>
</div>
<script type="text/javascript">
    $(function() {
        $('#addManufacturer').submit(function(){
            var name = $('#name').val();
            if (name == "") 
            {
                $('#response').html("<p class='alert alert-danger'>Name cannot be empty.</p>");
                return false;
            }
            else
            {
                $('#response').html("<b>Loading response...</b>");
                $.ajax({
                    type: 'post',
                    url: "controller/manufacturerController.php",
                    data: $(this).serialize(),
                    success: function(response)
                    {
                        $('#response').html(response);
                        $('#name').val('');
                    }
                });
                return false;
            }
        });
    });
</script>