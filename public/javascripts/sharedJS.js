/**
 * Created by Brandon on 10/26/2016.
 */
var currentView="login";
function switchViews(){
    if (currentView=="login") {
        $("#employerView")[0].style.display="None";
        $("#employeeView")[0].style.display="Block";
        $("#employerSideNav")[0].style.display="None";
        $("#employeeSideNav")[0].style.display="Block";

        $("#hamburger")[0].style.display="Block";
        $("#search")[0].style.display="Block";
        $("#menu")[0].style.display="Block";
        $("#loginView")[0].style.display="None";

        $("#switchViews")[0].innerHTML="Change to employer";
        currentView="employee";
    }
    else if (currentView=="employee"){
        $("#offerPanel")[0].innerHTML="";
        createOfferPanels();
        $("#employeeView")[0].style.display="None";
        $("#employerView")[0].style.display="Block";
        $("#employeeSideNav")[0].style.display="None";
        $("#employerSideNav")[0].style.display="Block";
        $("#switchViews")[0].innerHTML="Change to employee";
        currentView="employer";
    }
    else if (currentView=="employer"){
        $("#panelView")[0].innerHTML="";
        createJobPanels();
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


function applySuccess(returnPage){
    $("#backButton").off("click touch");
    $("#successOverlay")[0].style.display="flex";
    setTimeout(function(){
        returnPage();
        $("#successOverlay")[0].style.display="none";
    },1300);
}