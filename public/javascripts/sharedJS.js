/**
 * Created by Brandon on 10/26/2016.
 */
var currentView="employee";
function switchViews(){
    if (currentView=="employee"){
        $("#offerPanel")[0].innerHTML="";
        createOfferPanels();
        $("#employeeView")[0].style.display="None";
        $("#employerView")[0].style.display="Block";
        $("#employeeSideNav")[0].style.display="None";
        $("#employerSideNav")[0].style.display="Block";
        $("#switchViews")[0].innerHTML="Change to employee";
        currentView="employer";
    }
    else{
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

function applyToJob(userInfo,jobIndex){
    offerList[jobIndex].applicants.push(userInfo);
    offerList[jobIndex].numApps+=1;
    applySuccess();
}