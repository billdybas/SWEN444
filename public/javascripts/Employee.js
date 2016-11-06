                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        /**
 * Created by Brandon on 10/26/2016.
 */

var fakeUser = {
    name: "Donald Trump",
    profilePicture: "pictures/trump.jpg"
};

var fakeData = {
    jobName: "BEST JOBEVER",
    employerName: "Employer Name",
    description: "These are the deatils for the best job ever.  It's the best job you'll ever get.  Let me tell you, nobody knows jobs like I do.  I know all of the best jobs and the best places to get jobs.  And that's why I should be president of the United States.  And I'll stop ISIS.  If she could do that, She would've done it.  But she didn't.  And everybody should use TEMPiN.",
    postTime: "5 hours ago",
    salary: "5",
    distance:"1.2 Miles",
    duration:"3 Hours"
};

var employeeView;
var jobList = [fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData];

var jobHistory = [];

function createJobPanels() {
    employeeView = $("#employeeView")[0];
    jobList.forEach(createSingleJobPanel);
}

function createJobHistory(){
    employeeView = $("#employeeView")[0];
    jobHistory.forEach(createHistoryPanel);
}

function showHistory(){
    $("#offerPanel")[0].innerHTML="";
    $("#panelView")[0].innerHTML="";
    createJobHistory();
    $("#employeeView")[0].style.display="Block";
    $("#employerView")[0].style.display="None";
    $("#employeeSideNav")[0].style.display="Block";
    $("#employerSideNav")[0].style.display="None";
    $("#switchViews")[0].innerHTML="Change to employer";
}

function createSingleJobPanel(jobData, index) {
    //creating panel
    var panel = document.createElement("div");
    panel.classList = "jobPanel col s12";
    $(panel).on("click touch", function () {
        showSingleJob(index)
    });

    //creating top line
    var topLine = document.createElement("div");
    topLine.classList = "panelRow";
    //creating and adding jobName
    var jobName = document.createElement("div");
    jobName.classList = "panelJobName";
    jobName.innerHTML = jobData.jobName;
    topLine.appendChild(jobName);
    //creating and adding postTime
    var postTime = document.createElement("div");
    postTime.classList = "panelPostTime";
    postTime.innerHTML = "Posted " + jobData.postTime;
    topLine.appendChild(postTime);


    //creating middle line
    var middleLine = document.createElement("div");
    middleLine.classList = "panelRow panelRowMiddle";
    //creating and adding employerName
    var employerName = document.createElement("div");
    employerName.classList = "panelEmployerName";
    employerName.innerHTML = jobData.employerName;
    middleLine.appendChild(employerName);
    //creating and adding salary
    var salary = document.createElement("div");
    salary.classList = "panelSalary";
    salary.innerHTML = "$" + jobData.salary + "/hr";
    middleLine.appendChild(salary);

    //creating bottom line
    var bottomLine = document.createElement("div");
    bottomLine.classList = "panelRow panelRowBottom";
    //creating description
    var description = document.createElement("div");
    description.classList = "panelDescription";
    description.innerHTML = jobData.description;
    bottomLine.appendChild(description);

    //putting panel together
    panel.appendChild(topLine);
    panel.appendChild(middleLine);
    panel.appendChild(bottomLine);

    var panelView = $("#panelView")[0];
    //adding panel
    panelView.appendChild(panel);

    //adding divider
    var divider = document.createElement("div");
    divider.classList.add("divider");
    divider.style.width = "100%";
    panelView.appendChild(divider);
}

function showSingleJob(index) {
    var jobInfo=jobList[index];
    $("#singleJobTitle")[0].innerHTML=jobInfo.jobName;
    $("#singleJobPay")[0].innerHTML="$"+jobInfo.salary+"/hr";
    $("#singleJobEmployer")[0].innerHTML=jobInfo.employerName;
    $("#singleJobDistance")[0].innerHTML="<b>Distance: </b>"+jobInfo.distance;
    $("#singleJobDuration")[0].innerHTML="<b>Duration: </b>"+jobInfo.duration;
    $("#singleJobTime")[0].innerHTML="<b>Posted: </b>"+jobInfo.postTime;
    $("#singleJobDescription")[0].innerHTML="<b>Description: </b>\n"+jobInfo.description;
    $("#applyButton").one('click touch',function(){
        applyToJob(fakeUser,index);
    });
    $("#panelView")[0].style.display = "none";
    $("#singleJobView")[0].style.display = "block";
    showBackButton();
    $("#backButton").one("click touch", function () {
        showPanels();
    });
}

function showPanels() {
    $("#singleJobView")[0].style.display = "none";
    $("#panelView")[0].style.display = "block";
    showHamburger()
}

function applyToJob(userInfo,jobIndex){
    offerList[jobIndex].applicants.push(userInfo);
    offerList[jobIndex].numApps+=1;

    jobHistory.unshift(offerList[jobIndex]);

    applySuccess(showPanels);
}



function createHistoryPanel(jobData, index) {
    //creating panel
    var panel = document.createElement("div");
    panel.classList = "jobPanel col s12";
    $(panel).on("click touch", function () {
        showSingleHistory(index)
    });
    //creating top line
    var topLine = document.createElement("div");
    topLine.classList = "panelRow";
    //creating and adding jobName
    var jobName = document.createElement("div");
    jobName.classList = "panelJobName";
    jobName.innerHTML = jobData.jobName;
    topLine.appendChild(jobName);
    //creating and adding postTime
    var postTime = document.createElement("div");
    postTime.classList = "panelPostTime";
    postTime.innerHTML = "Posted " + jobData.postTime;
    topLine.appendChild(postTime);

    //creating middle line
    var middleLine = document.createElement("div");
    middleLine.classList = "panelRow panelRowMiddle";
    //creating and adding employerName
    var employerName = document.createElement("div");
    employerName.classList = "panelEmployerName";
    employerName.innerHTML = jobData.employerName;
    middleLine.appendChild(employerName);
    //creating and adding salary
    var salary = document.createElement("div");
    salary.classList = "panelSalary";
    salary.innerHTML = "$" + jobData.salary + "/hr";
    middleLine.appendChild(salary);

    //creating bottom line
    var bottomLine = document.createElement("div");
    bottomLine.classList = "panelRow panelRowBottom";
    //creating description
    var description = document.createElement("div");
    description.classList = "panelDescription";
    description.innerHTML = jobData.description;
    bottomLine.appendChild(description);

    //putting panel together
    panel.appendChild(topLine);
    panel.appendChild(middleLine);
    panel.appendChild(bottomLine);
    var reviewView = $("#panelView")[0];
    //adding panel
    reviewView.appendChild(panel);
    //adding divider
    var divider = document.createElement("div");
    divider.classList.add("divider");
    divider.style.width = "100%";
    reviewView.appendChild(divider);
}

function showSingleHistory(index) {
    var jobInfo=jobHistory[index];
    $("#singleHistoryTitle")[0].innerHTML=jobInfo.jobName;
    $("#singleHistoryPay")[0].innerHTML="$"+jobInfo.salary+"/hr";
    $("#singleHistoryEmployer")[0].innerHTML=jobInfo.employerName;
    $("#singleHistoryDistance")[0].innerHTML="<b>Distance: </b>"+jobInfo.distance;
    $("#singleHistoryDuration")[0].innerHTML="<b>Duration: </b>"+jobInfo.duration;
    $("#singleHistoryTime")[0].innerHTML="<b>Posted: </b>"+jobInfo.postTime;
    $("#singleHistoryDescription")[0].innerHTML="<b>Description: </b>\n"+jobInfo.description;

    $("#singleReviewStatus")[0].innerHTML="<b>Review Status: ";
    $("#reviewButton").one('click touch',function(){
        reviewing(index);
    });
    $("#panelView")[0].style.display = "none";
    $("#singleHistoryView")[0].style.display = "block";
    showBackButton();
    $("#backButton").one("click touch", function () {
        showHistoryPanels();
    });
    $("#cancelButton").one("click touch", function () {
        showHistoryPanels();
    });
}
function showHistoryPanels() {
    $("#singleHistoryView")[0].style.display = "none";
    $("#panelView")[0].style.display = "block";
    showHamburger()
}