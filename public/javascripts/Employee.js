/**
 * Created by Brandon on 10/26/2016.
 */

var fakeUser = {
    name: "Donald Trump",
    profilePicture: "pictures/trump.jpg"
}

var fakeData = {
    jobName: "BEST JOBEVER",
    employerName: "Employer Name",
    description: "These are the deatils for the best job ever.  It's the best job you'll ever get.  Let me tell you, nobody knows jobs like I do.  I know all of the best jobs and the best places to get jobs.  And that's why I should be president of the United States.  And I'll stop ISIS.  If she could do that, She would've done it.  But she didn't.  And everybody should use TEMPiN.",
    postTime: "5 hours ago",
    salary: "5"
};

var employeeView;
var jobList = [fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData];

function createJobPanels() {
    employeeView = $("#employeeView")[0]
    jobList.forEach(createSingleJobPanel);
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
    middleLine.classList = "panelRow";
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
    bottomLine.classList = "panelRow";
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
    $("#panelView")[0].style.display = "none";
    $("#singleJobView")[0].style.display = "block";
    showBackButton();
    $("#backButton").one("click touch", function () {
        showPanels()
    });
}

function showPanels() {
    $("#singleJobView")[0].style.display = "none";
    $("#panelView")[0].style.display = "block";
    showHamburger()
}