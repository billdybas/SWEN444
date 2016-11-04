/**
 * Created by Brandon on 10/26/2016.
 */


var fakeData = {
    jobName: "BEST JOBEVER",
    employerName: "Employer Name",
    description: "These are the deatils for the best job ever.  It's the best job you'll ever get.  Let me tell you, nobody knows jobs like I do.  I know all of the best jobs and the best places to get jobs.  And that's why I should be president of the United States.  And I'll stop ISIS.  If she could do that, She would've done it.  But she didn't.  And everybody should use TEMPiN.",
    postTime: "5 hours ago",
    salary: "5",
    location: "2 miles away",
    responsibilities:"you don't need any",
    startDate:"11/4/2016",
    endDate:"11/5/2016",
    isOpen:true,
    applicants:[]
};

var otherData = {
    jobName: "BEST JOBEVER",
    employerName: "Employer Name",
    description: "These are the deatils for the best job ever.  It's the best job you'll ever get.  Let me tell you, nobody knows jobs like I do.  I know all of the best jobs and the best places to get jobs.  And that's why I should be president of the United States.  And I'll stop ISIS.  If she could do that, She would've done it.  But she didn't.  And everybody should use TEMPiN.",
    postTime: "5 hours ago",
    salary: "5",
    location: "2 miles away",
    responsibilities:"None",
    startDate:"11/4/2016",
    endDate:"11/5/2016",
    isOpen:true,
    applicants:[]
};

var offerList = [fakeData, otherData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData, fakeData];

function createOfferPanels() {
    $("#offerPanel")[0].innerHTML="";
    offerList.forEach(createSingleOffer);
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
    numApps.classList = "offerEmployerName";
    numApps.innerHTML = data.applicants.length + " Applications Submitted";
    bottomLine.appendChild(numApps);
    //creating openClose button on right of offer panel
    var openClose = document.createElement("div");
    openClose.id="openCloseOffer";
    openClose.style.float="right";
    //creating vertical dropdown
    var dropdown = document.createElement("a");
    dropdown.style.color="#000000";
    dropdown.href="#";
    dropdown.classList="offerDropdown dropdown-button";
    var dots = document.createElement("i");
    dots.classList="material-icons offerDots";
    dots.innerHTML="more_vert";
    dropdown.appendChild(dots);
    openClose.appendChild(dropdown);
    //creating open/closed tag
    var open = document.createElement("div");
    open.classList="offerOpenClosed";
    if(data.isOpen){
        open.innerHTML='<div style="float:right">Open</div> <i class="material-icons" style="font-size:20px; color:green;">check</i>';
    }
    else{
        open.innerHTML='<div style="float:right">Closed</div> <i class="material-icons" style="font-size:20px; color:red">close</i>';
    }
    openClose.appendChild(open);

    bottomLine.appendChild(openClose);
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
    var singleOffer = offerList[index];
    $("#singleOfferTitle")[0].innerHTML=singleOffer.jobName;
    $("#singleOfferPosted")[0].innerHTML=singleOffer.postTime;
    $("#singleOfferLocation")[0].innerHTML=singleOffer.location;
    $("#singleOfferResponsibilities")[0].innerHTML=singleOffer.responsibilities;
    $("#singleOfferDescription")[0].innerHTML=singleOffer.description;
    $("#singleOfferTiming")[0].innerHTML=singleOffer.startDate + " - " + singleOffer.endDate;
    $("#singleOfferPayRate")[0].innerHTML=singleOffer.salary;

    $("#offerPanel")[0].style.display = "none";
    $("#singleOfferView")[0].style.display = "block";
    showBackButton();
    $("#backButton").one("click touch", function () {
        showOffers();
    });
}

function showCreateJob(){
    $("#offerPanel")[0].style.display="none";
    $("#reviewNewJob")[0].style.display="none";
    $("#singleOfferView")[0].style.display="none";
    $("#createJob")[0].style.display="block";
    showBackButton();
    $("#backButton").one("click touch", function () {
        showOffers();
    });
}

function showReviewNewJob(){
    $("#reviewJobTitle")[0].innerHTML=$("#newJobName")[0].value;
    $("#reviewJobLocation")[0].innerHTML=$("#newJobLocation")[0].value;
    $("#reviewJobResponsibilities")[0].innerHTML=$("#newJobResponsibilities")[0].value;
    $("#reviewJobDescription")[0].innerHTML=$("#newJobDescription")[0].value;
    $("#reviewJobPayRate")[0].innerHTML=$("#newJobPay")[0].value;
    $("#reviewJobTiming")[0].innerHTML=$("#newJobStartDate")[0].value +" - " + $("#newJobEndDate")[0].value;
    $("#createJob")[0].style.display="none";
    $("#reviewNewJob")[0].style.display="block";
    $("#backButton").one("click touch", function () {
        showCreateJob();
    });
}
function showOffers() {
    $("#createJob")[0].style.display = "none";
    $("#reviewNewJob")[0].style.display="none";
    $("#singleOfferView")[0].style.display="none";
    $("#offerPanel")[0].style.display = "block";
    showHamburger();
}

function submitNewJob(){
    var newJobInfo ={};
    newJobInfo.jobName=$("#newJobName")[0].value;
    newJobInfo.employerName="The Trump Train";
    newJobInfo.location=$("#newJobLocation")[0].value;
    newJobInfo.responsibilities=$("#newJobResponsibilities")[0].value;
    newJobInfo.description=$("#newJobDescription")[0].value;
    newJobInfo.postTime="1 minute ago";
    newJobInfo.salary=$("#newJobPay")[0].value;
    newJobInfo.startDate=$("#newJobStartDate")[0].value;
    newJobInfo.endDate=$("#newJobEndDate")[0].value;
    newJobInfo.isOpen=true;
    newJobInfo.applicants=[];
    offerList.unshift(newJobInfo);

    var callback=function(){
        createOfferPanels();
        showOffers();
    };
    applySuccess(callback);
}