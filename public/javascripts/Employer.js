/**
 * Created by Brandon on 10/26/2016.
 */

var fakeData = {
    jobName: "BEST JOBEVER",
    employerName: "Employer Name",
    description: "These are the deatils for the best job ever.  It's the best job you'll ever get.  Let me tell you, nobody knows jobs like I do.  I know all of the best jobs and the best places to get jobs.  And that's why I should be president of the United States.  And I'll stop ISIS.  If she could do that, She would've done it.  But she didn't.  And everybody should use TEMPiN.",
    postTime: "5 hours ago",
    salary: "5",
    isOpen:true,
    numApps:"2"
};

var employerView;
var jobList = [fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData];

function createOfferPanels() {
    employerView = $("#employeeView")[0];
    jobList.forEach(createSingleOffer);
}

function createSingleOffer(data,index){
    var panel = document.createElement("div");
    panel.classList = "jobPanel col s12";
    $(panel).on("click touch", function () {
        showSingleOffer(index);
    });

    //creating top line
    var topLine = document.createElement("div");
    topLine.classList = "panelRow";
    //creating and adding jobName
    var jobName = document.createElement("div");
    jobName.classList = "panelJobName";
    jobName.innerHTML = data.jobName;
    topLine.appendChild(jobName);
    //creating and adding postTime
    var postTime = document.createElement("div");
    postTime.classList = "panelPostTime";
    postTime.innerHTML = "Posted " + data.postTime;
    topLine.appendChild(postTime);

    //creating bottom line
    var bottomLine = document.createElement("div");
    bottomLine.classList = "panelRow";
    //creating description
    var numApps = document.createElement("div");
    numApps.classList = "panelEmployerName";
    numApps.innerHTML = data.numApps + " Applications Submitted";
    bottomLine.appendChild(numApps);
    //creating vertical dropdown
    var dropdown = document.createElement("a");
    dropdown.style.color="#000000";
    dropdown.href="#";
    dropdown.classList="offerDropdown dropdown-button";
    var dots = document.createElement("i");
    dots.classList="material-icons offerDots";
    dots.innerHTML="more_vert";
    dropdown.appendChild(dots);
    bottomLine.appendChild(dropdown);
    //creating open/closed tag
    var open = document.createElement("div");
    open.classList="offerOpenClosed";
    if(data.isOpen){
        open.innerHTML='<i class="material-icons">check</i> Open';
    }
    else{
        open.innerHTML='<i class="material-icons">close</i> Closed';
    }
    bottomLine.appendChild(open);

    //putting panel together
    panel.appendChild(topLine);
    panel.appendChild(bottomLine);

    var offerPanel = $("#offerPanel")[0];
    //adding panel
    offerPanel.appendChild(panel);

    //adding divider
    var divider = document.createElement("div");
    divider.classList.add("divider");
    divider.style.width = "100%";
    offerPanel.appendChild(divider);
}

function showSingleOffer(index){
    console.log(index);
}