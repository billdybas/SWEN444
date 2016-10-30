/**
 * Created by Brandon on 10/26/2016.
 */
var currentView="employee";
function switchViews(){
    if (currentView=="employee"){
        $("#employeeView")[0].style.display="None";
        $("#employerView")[0].style.display="Block";
        $("#employeeSideNav")[0].style.display="None";
        $("#employerSideNav")[0].style.display="Block";
        $("#switchViews")[0].innerHTML="Change to employee";
        currentView="employer";
    }
    else{
        $("#employerView")[0].style.display="None";
        $("#employeeView")[0].style.display="Block";
        $("#employerSideNav")[0].style.display="None";
        $("#employeeSideNav")[0].style.display="Block";
        $("#switchViews")[0].innerHTML="Change to employer";
        currentView="employee";
    }
}

function showHamburger(){
    $("#hamburger")[0].style.display="Block";
    $("#backButton")[0].style.display="None";
}

function showBackButton(){
    $("#hamburger")[0].style.display="None";
    $("#backButton")[0].style.display="Block";
}