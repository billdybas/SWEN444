/**
 * Created by Brandon on 10/26/2016.
 */

var skill = {
    skillName : "Intimidation"
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

var fakeUser = {
    name: "Donald Trump",
    profilePicture: "pictures/trump.jpg",
    location: "Anywhere but the White House",
    jobs: [fakeData,fakeData,fakeData],
    skills: [skill, skill,skill],
    rating: 0.8
};

var employeeView;
var jobList = [fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData];

var jobHistory = [];

function createProfilePage(){
    $('.button-collapse').sideNav('hide');
    $("#profileName")[0].innerHTML = "<h4>" + fakeUser.name + "</h4>";
    $("#profileLoc")[0].innerHTML = "<b>" + fakeUser.location + "</b>";
    $("#profilePic")[0].innerHTML = "<img src=" + fakeUser.profilePicture + " id='navProfilePic' >";

    $("#profileSkills")[0].innerHTML = "<h5>Skills: </h5>" + fakeUser.skills.reduce(function(acc, skill) {
            return acc + skill.skillName + "<br>";
        }, "");

    $("#profileJobs")[0].innerHTML = "<h5>Prior Jobs: </h5>" + fakeUser.jobs.reduce(function(acc, job) {
            var text = "<div onclick='showSingleJob(0)' style=\"color:#357e35\"><b>" + job.jobName + "</b></div>" + "<b>Employer : </b>" + job.employerName + "<br><b>Description : </b>" + job.description + "<br><br>"
            return acc + text;
        }, "");

    $("#profileEditBtn")[0].innerHTML = "<div id='editBtn' style='position:fixed; bottom:5%; right:0;width:45%;height:5%' class='waves-effect waves-light btn' onclick='createEditProfilePage()'>Edit Profile</div>";

    $("#profileAddJobBtn")[0].innerHTML = "";

    $("#panelView")[0].style.display = "none";
    $("#singleJobView")[0].style.display = "none";
    $("#profilePane")[0].style.display = "block";
    $("#addJobPane")[0].style.display = "none";

    showBackButton();
    $("#backButton").one("click touch", function () {
        showPanels()
    });
}

function createEditProfilePage(){
    $("#profileName")[0].innerHTML = "<h4>" + fakeUser.name + "</h4>";
    $("#profileLoc")[0].innerHTML = "<b>" + fakeUser.location + "</b>";
    $("#profilePic")[0].innerHTML = "<img src=" + fakeUser.profilePicture + " id='navProfilePic' >";


    //TODO: Space AddSkill propperly
    //TODO: Create AddSkill dialog
    //TODO: Remove Skill when skill clicked
    $("#profileSkills")[0].innerHTML = "<h5>Skills: </h5>" + fakeUser.skills.reduce(function(acc, skill) {
            return acc + "<div id='skillTag' class='waves-effect waves-light btn' onclick=''>" + skill.skillName + "  <i class='material-icons'>clear</i></div>" + "<br>";
        }, "") + "<div id='skillTag' class='waves-effect waves-light btn' onclick='function() {" +
        "var skill = prompt(\'Enter a new skill\');" +
        "document.getElementById(\'profileSkillAdd\').innerHTML = skill;" +
        "}'>  Add Skill  </div>" + "<br>";

    $("#profileJobs")[0].innerHTML = "<h5>Prior Jobs: </h5>" + fakeUser.jobs.reduce(function(acc, job) {
            var text = "<div onclick='showSingleJob(0)' style='color:#357e35'><b>" + job.jobName + "</b></div>" + "<b>Employer : </b>" + job.employerName + "<br><b>Description : </b>" + job.description + "<br><br>"
            return acc + text;
        }, "");

    $("#profileEditBtn")[0].innerHTML = "<div id='editBtn' style='position:fixed; bottom:5%; right:0; width:30%; height:5%' class='waves-effect waves-light btn' onclick='createProfilePage()'>Confirm</div>";

    //TODO: Create AddJobPage
    $("#profileAddJobBtn")[0].innerHTML = "<div id='editBtn' class='waves-effect waves-light btn' onclick='createAddJobPage()'>Add Job</div><br><br>";

    $("#panelView")[0].style.display = "none";
    $("#singleJobView")[0].style.display = "none";
    $("#profilePane")[0].style.display = "block";
    $("#addJobPane")[0].style.display = "none";

    showBackButton();
    $("#backButton").one("click touch", function () {
        showPanels()
    });
}

//TODO: Get page to actually show up
function createAddJobPage(){
    $("#jobName")[0].innerHTML = "<input type='text'>Job Name</input>";
    $("#jobEmployerContact")[0].innerHTML = "<input type='text'>Employer Contact Info (Name, phone number, email, etc)</input>";
    $("#jobDescription")[0].innerHTML = "<input type='text'>Job Description</input>";
    $("#jobConfirmBtn")[0].innerHTML = "<div id='editBtn' class='waves-effect waves-light btn' onclick='createEditProfilePage()'>Confirm</div><br><br>";

    $("#panelView")[0].style.display = "none";
    $("#singleJobView")[0].style.display = "none";
    $("#profilePane")[0].style.display = "none";
    $("#addJobPane")[0].style.display = "block";
}


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
    $("#profilePane")[0].style.display = "none";
    showBackButton();
    $("#backButton").one("click touch", function () {
        showPanels();
    });
}

function showPanels() {
    $("#singleJobView")[0].style.display = "none";
    $("#panelView")[0].style.display = "block";
    $("#profilePane")[0].style.display = "none";
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

    $("#singleReviewStatus")[0].innerHTML="<b>Review Status: </b>\n" + review;
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
    $("#reviewView")[0].style.display = "none";
    $("#singleHistoryView")[0].style.display = "none";
    $("#panelView")[0].style.display = "block";
    showHamburger()
}