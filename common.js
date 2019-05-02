// JavaScript Document
$(document).ready(function() {
        // logout functionality
    $("#logout a").click(function() 
    {
        localStorage.clear();
        location.href = "login.html";
    });
        // to add the username after login in template
    if(localStorage.getItem('user_name') !== null)
    {
        var username = localStorage.getItem("user_name");
        $('.dropdown-toggle span').html(username);
    }
});

// URL For PHP Server to connect
var serverPhpUrl = 'http://localhost/aviationVersion1/php/';
var serverHtmlUrl = 'http://localhost/aviationVersion1/template/';

//======================Login Authentication=============================================
function loginUser(){
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if($('#signin-username').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter valid username.</div>");
        return false;
    }
    else if($('#signin-password').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter valid password.</div>");
        return false;
    }
    else {
        $('.login_btn').text("please wait....");
        $('.modal').show();
        $.ajax({
            type: "POST",
            url: serverPhpUrl + "auth.php",
            data:{ username : $('#signin-username').val(),
                pass : $('#signin-password').val()
            },
            dataType: 'html', 
            cache: false,
            success: function(data) 
            {
                var arr = $.parseJSON(data);
                if(arr[0] == 'true')
                {
                    $('.login_btn').prop('disabled', false);
		    localStorage.setItem("userid_sess", arr[1]);
                    localStorage.setItem("userid_role", arr[2]);
                    localStorage.setItem("user_name", arr[3]);
                    localStorage.setItem("role_name", arr[4]);
                    location.href = serverHtmlUrl + "dashboard.html";
                    $('.modal').hide();
                }
                else
                {
                    $('.login_btn').text("LOGIN");
                    $('.login_btn').prop('disabled',false);
                    $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter correct username and password.</div>");
                    $('.modal').hide();
                }
            },
            error: function(error)
            {
                alert("No internet connection");
                $('.modal').hide();
            }
        });
    }
}

//=============reset password==================================
function resetUserPassword(){
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var username = $('#signin-username').val();
    if(username == "")
    {
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter your username.</div>");
        return false;
    }
    else{
        $('#resetPassword').text("please wait....");
        $('#resetPassword').prop('disabled', true);
        $('.modal').show();
        $.ajax({
            type: "POST",
            url: serverPhpUrl + "recoverPassword.php",
            data:{ username : username
            },
            dataType: 'html', 
            cache: false,
            success: function(data) 
            {
                $('#resetPassword').text("Reset password");
                $('#resetPassword').prop('disabled', false);
                //$('.error_label').text(data);
                $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> " + data + ".</div>");
                $('.modal').hide();
            },
            error: function(error)
            {
                alert('No internet Connection');
                $('.modal').hide();
            }
        });
    }
}

//=================show dashboard for a specific role===================
function showDashboard()
{
    if (localStorage.getItem('userid_sess') != null)
    {
        if (localStorage.getItem('role_name') != null)
        {
            $.ajax({
                type: "POST",
                url: serverPhpUrl + "logo.php",
                data:{ userId : localStorage.getItem('userid_sess')
                },
                dataType: 'html', 
                cache: false,
                success: function(data) 
                {
                    $(".brand").html(data);
                },
                error: function(error)
                {
                    alert('No internet Connection');
                 }
             });
             
            $.ajax({
                type: "POST",
                url: serverPhpUrl + "leftMenu.php",
                data:{ roleName : localStorage.getItem('role_name')
                },
                dataType: 'html', 
                cache: false,
                success: function(data) 
                {
                    $(".replace-sidebar").html(data);
                },
                error: function(error)
                {
                    alert('No internet Connection');
                }
            });
             
            $.ajax({
                type: "POST",
                url: serverPhpUrl + "usersDashboard.php",
                data:{ roleName : localStorage.getItem('role_name')
                },
                dataType: 'html', 
                cache: false,
                success: function(data) 
                {
                    $(".replace-container").html(data);
                    $('body').addClass('layout-fullwidth');
                    $('body').removeClass('offcanvas-active');
                },
                error: function(error)
                {
                    alert('No internet Connection');
                }
            });
        }
        else
        {
            location.href = "login.html";
        }
    }
    else
    {
        location.href = "login.html";
    }
}

//=================list company===================
function listCompany()
{
    $('.modal').show();
    $.ajax({
        type: "GET",
        url: serverPhpUrl + "company.php",
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.sidemenu li a.active').removeClass('active');
            $(this).addClass('active');
            $('body').addClass('layout-fullwidth');
            $('body').removeClass('offcanvas-active');
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================add company form===================
function addCompanyForm()
{
    $('.modal').show();
    $.ajax({
        type: "GET",
        url: serverPhpUrl + "addCompanyForm.php",
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================add company details in database===========
function addCompany()
{
    if($('#name').val() == '')
    {
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter name.</div>");
        return false;
    }
    else if($('#description').val() == '')
    {
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter description.</div>");
        return false;
    } 
    //var formData = new FormData($('#addCompanyDetails')[0]);
    var formData = new FormData(document.getElementById('addCompanyDetails'));
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "company.php",
        data: formData,
        mimeType: "multipart/form-data",
        cache: false,
        contentType: false,
        processData: false, 
        dataType:'html',
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================delete company record====================
function activateCompanyRecord($recordId, $tabel, $flag) 
{
    if(!confirm('Are you sure?')){
        return false;
    }
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "company.php",
        data:{ recordId : $recordId,
            table : $tabel,
            flag : $flag,
            from : 2
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
    return true;
}

//=================edit company form====================
function editCompanyForm($recordId) 
{
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "editCompanyForm.php",
        data:{ recordId : $recordId
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================edit company details in database===========
function editComapany()
{
    if($('#name').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter name.</div>");
        return false;
    }
    else if($('#description').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter description.</div>");
        return false;
    }
    var formData = new FormData(document.getElementById('editCompanyDetails'));
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "company.php",
        data: formData,
        mimeType: "multipart/form-data",
        cache: false,
        contentType: false,
        processData: false, 
        dataType:'html',
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================update company logo form===================
function updateCompanyLogoForm($recordId)
{
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "updateCompanyLogo.php",
        data:{ recordId : $recordId
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================update company logo details in database===========
function updateCompanyLogo()
{
    if($('#logo').val() == '')
    {
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please choose logo.</div>");
        return false;
    }
    var formData = new FormData($('#updateCompanyLogo')[0]);
    //var formData = new FormData(document.getElementById('addCompanyDetails'));
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "company.php",
        data: formData,
        mimeType: "multipart/form-data",
        cache: false,
        contentType: false,
        processData: false, 
        dataType:'html',
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================list role===================
function listRole()
{
    $('.modal').show();
    $.ajax({
        type: "GET",
        url: serverPhpUrl + "role.php",
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.sidemenu li a.active').removeClass('active');
            $(this).addClass('active');
            $('body').addClass('layout-fullwidth');
            $('body').removeClass('offcanvas-active');
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
} 

//=================add role form===================
function addRoleForm()
{
    $('.modal').show();
    $.ajax({
        type: "GET",
        url: serverPhpUrl + "addRoleForm.php",
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}


//=================add roles in database===========
function addRole()
{
    if($('#name').val() == 0){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please select role.</div>");
        return false;
    }
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "role.php",
        data:{ name : $('#name').val(),
            from : 1
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}


//=================delete role====================
function deleteRoleRecord($recordId, $tabel) 
{
    if(!confirm('Are you sure?')){
        return false;
    }
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "role.php",
        data:{ recordId : $recordId,
            table : $tabel,
            from : 2
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
    return true;
}


//=================edit role form====================
function editRoleForm($recordId) 
{
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "editRoleForm.php",
        data:{ recordId : $recordId
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================edit role details in database===========
function editRole()
{
    if($('#name').val() == 0){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please select role.</div>");
        return false;
    }
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "role.php",
        data:{ name : $('#name').val(),
            recordId : $('#roleId').val(),
            from : 3
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================list countries===================
function listCountry()
{
    $('.modal').show();
    $.ajax({
        type: "GET",
        url: serverPhpUrl + "country.php",
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.sidemenu li a.active').removeClass('active');
            $(this).addClass('active');
            $('body').addClass('layout-fullwidth');
            $('body').removeClass('offcanvas-active');
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
} 


//=================add country form===================
function addCountryForm()
{
    $('.modal').show();
    $.ajax({
        type: "GET",
        url: serverPhpUrl + "addCountryForm.php",
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}


//=================add country in database===========
function addCountry()
{
    if($('#name').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter country name.</div>");
        return false;		
    }
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "country.php",
        data:{ name : $('#name').val(),
            from : 1
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}


//=================delete country====================
function deleteCountryRecord($recordId, $tabel) 
{
    if(!confirm('Are you sure?')){
        return false;
    }
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "country.php",
        data:{ recordId : $recordId,
            table : $tabel,
            from : 2
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
    return true;
}


//=================edit country form====================
function editCountryForm($recordId) 
{
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "editCountryForm.php",
        data:{ recordId : $recordId
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================edit country details in database===========
function editCountry()
{
    if($('#name').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter country name.</div>");
        return false;
    }
   
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "country.php",
        data:{ name : $('#name').val(),
            recordId : $('#countryId').val(),
            from : 3
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//==============add all countries in database===========
function addAllCountry()
{
	$('.modal').show();
	$.ajax({
	type: "POST",
        url:serverPhpUrl + "country.php",
	data:{ from : 5
           },
	datatype: 'html',
	cache: false,
	success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================list users===================
function listUsers()
{
    $('.modal').show();
    var userId = localStorage.getItem("userid_sess");
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "user.php",
        data:{ userId : localStorage.getItem("userid_sess"),
            roleName : localStorage.getItem("role_name"),
            from : 5
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.sidemenu li a.active').removeClass('active');
            $(this).addClass('active');
            $('body').addClass('layout-fullwidth');
            $('body').removeClass('offcanvas-active');
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================add user form===================
function addUserForm()
{
    var roleName = localStorage.getItem("role_name");
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "addUserForm.php",
        data:{ role : roleName,
            userId : localStorage.getItem("userid_sess")
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $("#loggedInUser").val(localStorage.getItem('userid_sess'));
            $("#userId").val(localStorage.getItem('userid_sess'));
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================add user details in database===========
function addUser()
{
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var usernameValidation = /^[A-Za-z0-9_$]{8,15}$/;
    var password = $('#password').val();
    var repeatPassword = $('#repeatPassword').val();
    var roleName = localStorage.getItem("role_name");
    if($('#firstName').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter first name.</div>");
        return false;
    }
    else if($('#lastName').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter last name.</div>");
        return false;
    }
    else if($('#dateOfBirth').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter date of birth.</div>");
        return false;
    }
    else if (!usernameValidation.test($('#username').val())) {
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter valid username.</div>");
        return false;
    }
    else if (!filter.test($('#email').val())) {
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter valid email address.</div>");
        return false;
    }
    else if($('#gender').val() == 0){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please select gender.</div>");
        return false;
    }
    else if(password == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter password.</div>");
        return false;
    } 
    else if(repeatPassword == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter repeat password.</div>");
        return false;
    } 
    else if (password != repeatPassword) {
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Password and repeat password should have same value.</div>");
        return false;
    }
    else if($('#role').val() == 0){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please select role.</div>");
        return false;
    }
    else if($('#company').val() == 0){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please select company.</div>");
        return false;
    }
    else if($('#instructor').val() == 0){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please select instructor.</div>");
        return false;
    }
    else if($('#country').val() == 0){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please select country.</div>");
        return false;
    }
    var formData = new FormData(document.getElementById('addUserDetails'));
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "user.php",
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================delete user====================
function activateUserRecord($recordId, $tabel, $flag) 
{
    if(!confirm('Are you sure?')){
        return false;
    }
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "user.php",
        data:{ recordId : $recordId,
            table : $tabel,
            flag: $flag,
            userId : localStorage.getItem("userid_sess"),
            roleName : localStorage.getItem("role_name"),
            from : 2
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
    return true;
}

//=================edit user form====================
function editUserForm($recordId, $back) 
{
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "editUserForm.php",
        data:{ recordId : $recordId,
            roleName : localStorage.getItem("role_name"),
            back : $back
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
            $("#loggedInUser").val(localStorage.getItem('userid_sess'));
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================edit user details in database===========
function editUser()
{
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if($('#firstName').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter first name.</div>");
        return false;
    }
    else if($('#lastName').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter last name.</div>");
        return false;
    }
    else if($('#dateOfBirth').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter date of birth.</div>");
        return false;
    }
    else if (!filter.test($('#email').val())) {
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter valid email address.</div>");
        return false;
    }
    else if($('#country').val() == 0){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please select country.</div>");
        return false;
    }
    var formData = new FormData(document.getElementById('editUserDetails'));
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "user.php",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        dataType:'html',
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

////=================list aircraft===================
function listAircraft()
{
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "aircraft.php",
        data:{ userId : localStorage.getItem("userid_sess"),
            roleName : localStorage.getItem("role_name"),
            from : 5
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.sidemenu li a.active').removeClass('active');
            $(this).addClass('active');
            $('body').addClass('layout-fullwidth');
            $('body').removeClass('offcanvas-active');
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
} 

////=================add aircraft form===================
function addAircraftForm()
{
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "addAircraftForm.php",
        data:{ role : localStorage.getItem("role_name")
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

////=================add aircraft details in database===========
function addAircraft()
{
    if (localStorage.getItem('userid_sess') != null)
    {
    //var regexp1 = /[^0-9]/;
    if($('#name').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter name.</div>");
        return false;
    }
//    else if (regexp1.test($('#plateNumber').val())) {
//        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter number.</div>");
//        return false;
//    }
    else if($('#description').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter description.</div>");
        return false;	
    } 
    else if($('#company').val() == 0){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please select company.</div>");
        return false;
    }
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "aircraft.php",
        data:{ name : $('#name').val(),
            description : $('#description').val(),
            plateNumber : $('#plateNumber').val(),
            company: $('#company').val(),
	    user : localStorage.getItem('userid_sess'),
            userId : localStorage.getItem("userid_sess"),
            roleName : localStorage.getItem("role_name"),
            from : 1
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
	}
}

//=================delete Aircraft record====================
function deleteAircraftRecord($recordId, $tabel, $flag) 
{
    if(!confirm('Are you sure?')){
        return false;
    }
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "aircraft.php",
        data:{ recordId : $recordId,
            table : $tabel,
            flag: $flag,
            userId : localStorage.getItem("userid_sess"),
            roleName : localStorage.getItem("role_name"),
            from : 2
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
    return true;
}

//=================edit aircraft form====================
function editAircraftForm($recordId) 
{
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "editAircraftForm.php",
        data:{ recordId : $recordId,
            role : localStorage.getItem("role_name")
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================edit aircraft details in database===========
function editAircraft()
{
    if($('#name').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter name.</div>");
        return false;
    }
    else if($('#description').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter description.</div>");
        return false;
    }
    else if($('#company').val() == 0){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please select company.</div>");
        return false;
    }
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "aircraft.php",
        data:{ name : $('#name').val(),
            description : $('#description').val(),
            plateNumber : $('#plateNumber').val(),
            company: $('#company').val(),
            recordId : $('#aircraftId').val(),
            userId : localStorage.getItem("userid_sess"),
            roleName : localStorage.getItem("role_name"),
            from : 3
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

////=================list activity===================
function listActivity()
{
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "activitytype.php",
        data:{ userId : localStorage.getItem("userid_sess"),
            roleName : localStorage.getItem("role_name"),
            from : 5
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.sidemenu li a.active').removeClass('active');
            $(this).addClass('active');
            $('body').addClass('layout-fullwidth');
            $('body').removeClass('offcanvas-active');
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

////=================add activity form===================
function addActivityForm()
{
    $('.modal').show();
    $.ajax({
        type: "GET",
        url: serverPhpUrl + "addActivitytypeForm.php",
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

////=================add activity details in database===========
function addActivity()
{
     if($('#name').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter name.</div>");
        return false;
    }
  
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "activitytype.php",
        data:{ name : $('#name').val(),
            loggedInUserId : localStorage.getItem("userid_sess"),
            userId : localStorage.getItem("userid_sess"),
            roleName : localStorage.getItem("role_name"),
            from : 1
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================delete Activity record====================
function deleteActivityRecord($recordId, $tabel) 
{
    if(!confirm('Are you sure?')){
        return false;
    }
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "activitytype.php",
        data:{ recordId : $recordId,
            table : $tabel,
            userId : localStorage.getItem("userid_sess"),
            roleName : localStorage.getItem("role_name"),
            from : 2
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
    return true;
}

//=================edit aircraft form====================
function editActivityForm($recordId) 
{
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "editActivitytypeForm.php",
        data:{ recordId : $recordId
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================edit aircraft details in database===========
function editActivity()
{
    if($('#name').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter name.</div>");
        return false;
    }
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "activitytype.php",
        data:{ name : $('#name').val(),
            recordId : $('#activityId').val(),
            userId : localStorage.getItem("userid_sess"),
            roleName : localStorage.getItem("role_name"),
            from : 3
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

////=================list reservation===================
function listReservation()
{
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "reservation.php",
        data : {
            loggedInUserId: localStorage.getItem("userid_sess"),
            roleName: localStorage.getItem("role_name"),
            from: 5
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.sidemenu li a.active').removeClass('active');
            $(this).addClass('active');
            $('body').addClass('layout-fullwidth');
            $('body').removeClass('offcanvas-active');
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

////=================add reservation form===================
function addReservationForm()
{
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "addReservationForm.php",
        data : {
            loggedInUserId : localStorage.getItem("userid_sess"),
            roleName: localStorage.getItem("role_name")
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================add reservation details in database===========
function addReservation()
{
    if($('#comment').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter comment.</div>");
        return false;
    }
    else if($('#startDate').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter start date.</div>");
        return false;
    }
    else if($('#endDate').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter end date.</div>");
        return false;
    }
    else if($('#activityType').val() == 0){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please select activity type.</div>");
        return false;
    }
    else if($('#userId').val() == 0){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please select student.</div>");
        return false;
    }
    else if($('#instructorId').val() == 0){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please select instructor.</div>");
        return false;
    }
//    else if ($('#startTime').val() >= ($('#endTime').val())){
//        $('.error_label').text('End time should be greater than start time.');
//        return false;
//    }
    var formData = new FormData(document.getElementById('addReservationDetails'));
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "reservation.php",
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================delete country====================
function deleteReservationRecord($recordId, $tabel)
{
    if(!confirm('Are you sure?')){
        return false;
    }
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "reservation.php",
        data:{ recordId : $recordId,
            table : $tabel,
            loggedInUserId : localStorage.getItem("userid_sess"),
            roleName: localStorage.getItem("role_name"),
            from : 2
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
    return true;
}

//=================coming soon===================
function comingSoon()
{
    $('.modal').show();
    $.ajax({
        type: "GET",
        url: serverPhpUrl + "comingSoon.php",
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.sidemenu li a.active').removeClass('active');
            $(this).addClass('active');
            $('body').addClass('layout-fullwidth');
            $('body').removeClass('offcanvas-active');
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//===============user info================
function userProfile()
{
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "userProfile.php",
        data:{ 
            user : localStorage.getItem('userid_sess'),
            from : 1
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//===============change instructor form================
function changeInstructorForm($updateUserId, $instructorId, $companyId)
{
    var roleName = localStorage.getItem("role_name");
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "changeInstructorForm.php",
        data:{ role : roleName,
            updateUserId : $updateUserId,
            instructorId : $instructorId,
            companyId : $companyId
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================change instructor===========
function changeInstructor()
{
    if($('#instructor').val() == 0){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please select instructor.</div>");
        return false;
    }
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "user.php",
        data:{ instructorId : $('#instructor').val(),
            updateUserId : $('#updateUserId').val(),
            from : 7,
            userId : localStorage.getItem("userid_sess"),
            roleName : localStorage.getItem('role_name')
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================change profile password form==================
function changePasswordForm()
{
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "changePassword.php",
        data:{ 
            userId : localStorage.getItem('userid_sess'),
            from : 1
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.sidemenu li a.active').removeClass('active');
            $(this).addClass('active');
            $('body').addClass('layout-fullwidth');
            $('body').removeClass('offcanvas-active');
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

//=================change profile password form==================
function changePassword()
{
    var password = $('#newPassword').val();
    var repeatPassword = $('#repeatNewPassword').val();
    if($('#oldPassword').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter old password.</div>");
        return false;
    }
    else if($('#newPassword').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter new password.</div>");
        return false;
    }
    else if($('#repeatNewPassword').val() == ''){
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter repeat new password.</div>");
        return false;
    }
    else if (password != repeatPassword) {
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> New password and repeat new password should have same value.</div>");
        return false;
    }
    var formData = new FormData(document.getElementById('changePassword'));
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "changePassword.php",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        dataType:'html',
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.sidemenu li a.active').removeClass('active');
            $(this).addClass('active');
            $('body').addClass('layout-fullwidth');
            $('body').removeClass('offcanvas-active');
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

////=================add hobbs form===================
function addHobbForm($reservationId)
{
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "addHobb.php",
        data : {
            reservationId : $reservationId,
            loggedInUserId : localStorage.getItem("userid_sess"),
            roleName: localStorage.getItem("role_name")
        },
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}

////=================add hobbs in database===================
function addHobb()
{
    //var filter = /^(\d*\.)?\d+$/;
    var filter = /^[0-9]\d{0,9}(\.\d{1,2})?%?$/;
    if (!filter.test($('#startHobb').val())) {
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter decimal number of 2 digts after decimal.</div>");
        return false;
    }
    else if (!filter.test($('#endHobb').val())) {
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Please enter decimal number of 2 digts after decimal.</div>");
        return false;
    }
    else if ($('#startHobb').val() > $('#endHobb').val()) {
        $('.error_label').html("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><i class=\"fa fa-times-circle\"></i> Start hobb should be less than end hobb.</div>");
        return false;
    }
    var formData = new FormData(document.getElementById('addHobbDetails'));
    $('.modal').show();
    $.ajax({
        type: "POST",
        url: serverPhpUrl + "reservation.php",
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'html', 
        cache: false,
        success: function(data)
        {
            $(".replace-container").html(data);
            $('.modal').hide();
        },
        error: function(error)
        {
            alert('No internet Connection');
            $('.modal').hide();
        }
    });
}