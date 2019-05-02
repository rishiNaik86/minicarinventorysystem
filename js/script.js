$(document).ready(function(){
    
});

    // to display manufacturer form
function addManufacturerForm()
{
    $.ajax({
        type: 'post',
        url: "addManufacturer.php",
        cache: false,
        contentType: false,
        processData: false,
        dataType:'html',
        success: function(response)
        {
            $('#replace').html(response);
        }
    });
}

    // to display model form
function addModelForm()
{
    $.ajax({
        type: 'post',
        url: "addModel.php",
        cache: false,
        contentType: false,
        processData: false,
        dataType:'html',
        success: function(response)
        {
            $('#replace').html(response);
        }
    });
}

    // to display all models
function listModels()
{
    $.ajax({
        type: 'post',
        url: "listModels.php",
        cache: false,
        contentType: false,
        processData: false,
        dataType:'html',
        success: function(response)
        {
            $('#replace').html(response);
            getModelList();
        }
    });
}

function getModelList()
{
    $.ajax({
        type: 'get',
        url: "controller/modelController.php",
        dataType: 'JSON',
        data: { action: 1},
        success: function(response)
        {
            var len = response.length;
            for(var i=0; i<len; i++)
            {
                var modelId = response[i].modelId;
                var serialNumber = response[i].id;
                var manufacturerName = response[i].manufacturerName;
                var modelName = response[i].modelName;
                var count = response[i].modelCount;
                tr_str = "<tr id = '" + modelId + "' onclick = 'getModelDetail(" + modelId + ")'>" +
                    "<td align='center'>" + serialNumber + "</td>" +
                    "<td align='center'>" + manufacturerName + "</td>" +
                    "<td align='center'>" + modelName + "</td>" +
                    "<td align='center'>" + count + "</td>" +
                    "</tr>";
                $("#listModelTable tbody").append(tr_str);
            }
        }
    });
}

function getModelDetail(id) {
    var options = {
        modal: true,
        height: 500,
        width: 800,
        title: 'Model Detail',
        buttons: {
            'Sold': function() {
                $.ajax({
                    type: 'post',
                    url: "controller/modelController.php",
                    dataType: 'html',
                    data: { action: 2, id: id},
                    success: function(response)
                    {
                        $('#response').html(response);
                        $("table#listModelTable tr#" + id).remove();
                    }
                });
                $(this).dialog('close');
            }
      }
    };
    $('#singleModel').load('getModelDetail.php?id='+id).dialog(options).dialog('open');
}