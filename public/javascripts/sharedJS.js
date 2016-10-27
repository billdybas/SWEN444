/**
 * Created by Brandon on 10/26/2016.
 */
var currentView="employee";
function switchViews(){
    if (currentView=="employee"){
        $("#employeeView")[0].style.display="None";
        $("#employerView")[0].style.display="Block";
    }
    else if(currentView=="employer"){
        $("#employerView")[0].style.display="None";
        $("#employeeView")[0].style.display="Block";
    }
    else{
        $("#employerView")[0].style.display="None";
        $("#employeeView")[0].style.display="Block";
    }
}