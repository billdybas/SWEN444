function createProfilePage() {
  $('.button-collapse').sideNav('hide');
  $('#profileName').html('<h4>' + state.user.name + '</h4>');
  $('#profileLoc').html('<b>' + state.user.location + '</b>');
  $('#profilePic').html('<img src="' + state.user.profilePicture + '" id="navProfilePic">');

  $('#profileSkills').html(
    '<h5>Skills: </h5' +
    state.user.skills.reduce(function(prev, next) {
      return prev + next.skillName;
    }, '') + '<br>'
  );

  $('#profileJobs').html(
    '<h5>Previous Jobs: </h5>' +
    state.user.jobs.reduce(function(prev, next) {
      var html = '' +
        '<div onclick="showSingleJob(0)" style="color: #357e35">' +
          '<b>' + next.name + '</b>' +
        '</div>' +
        '<b>Employer: </b>' +
        next.employer +
        '<br>' +
        '<b>Description: </b>' +
        next.description +
        '<br><br>';

      return prev + html;
    }, '')
  );

  $('#profileEditBtn').html(
    '<div id="editBtn" style="position: fixed; bottom: 5%; right: 0; width: 45%; height: 5%" class="waves-effect waves-light btn" onclick="createEditProfilePage()">Edit Profile</div>'
  );

  $('#profileAddJobBtn').empty();

  $('#panelView').css('display', 'none');
  $('#singleJobView').css('display', 'none');
  $('#profilePane').css('display', 'block');
  $('#addJobPane').css('display', 'none');

  showBackButton();
  $('#backButton').one('click touch', function () {
    showPanels()
  });
}

function createEditProfilePage(){
  $('#profileName').html('<h4>' + state.user.name + '</h4>');
  $('#profileLoc').html('<b>' + state.user.location + '</b>');
  $('#profilePic').html('<img src="' + state.user.profilePicture + '" id="navProfilePic">');

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

  $('#panelView').css('display', 'none');
  $('#singleJobView').css('display', 'none');
  $('#profilePane').css('display', 'block');
  $('#addJobPane').css('display', 'none');

  showBackButton();
  $('#backButton').one('click touch', function () {
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


//////////////////
// Job Listings //
//////////////////

// Creates all the individual list elements and adds click event on them
function createJobPanels() {
  state.jobs.map(function(job) {
    $html = renderSingleJobPanel(job);
    $('#panelView').append($html.on('click touch', function() {
      showSingleJob(job.id);
    }));
  });
}

// How an individual job should be shown once it's list element has been clicked
function showSingleJob(id) {
  // Find the job that was clicked
  var job = state.jobs.filter(function(job) {
    return job.id === id;
  })[0];

  $('#singleJobView').empty().append(renderSingleJob(job)).css('display', 'block');
  $('#panelView').css('display', 'none');
  $('#profilePane').css('display', 'none');

  $('#applyButton').one('click touch', function() {
    applyToJob(state.user, job);
  });

  showBackButton();
  $('#backButton').one('click touch', function() {
    showPanels();
  });
}

// What happens when the 'Apply' button is clicked
function applyToJob(user, job) {
  state.offers.map(function(offer) {
    if (offer.id === job.id) {
      offer.applicants.push(user);
      state.history.unshift(offer);
    }
  });

  applySuccess(showPanels);
}

// How an individual job panel should be rendered
function renderSingleJobPanel(data) {
  return $('' +
    '<div class="jobPanel row">' +
      '<div class="col s12">' +
        '<h5 class="jobName left">' + data.name + '</h5>' +
          '<div class="jobDetails right">' +
            '<div class="jobPosted">Posted ' + data.posted + '</div>' +
            '<div class="jobWage right">$' + data.wage + ' / hr</div>' +
          '</div>' +
      '</div>' +
      '<div class="col s12">' +
        '<div class="jobEmployer">' + data.employer + '</div>' +
        '<p class="jobDescription">' + data.description + '</p>' +
      '</div>' +
    '</div>');
}

function renderSingleJob(data) {
  return $('' +
  '<div class="singleJobPanel row">' +
    '<div class="col s12">' +
      '<h5 class="jobName left">' + data.name + '</h5>' +
      '<div class="jobDetails right">' +
        '<div class="jobPosted">Posted ' + data.posted + '</div>' +
        '<div class="jobWage right">$' + data.wage + ' / hr</div>' +
      '</div>' +
    '</div>' +
    '<div class="col s12">' +
      '<p class="jobEmployer"><b>Employer: </b>' + data.employer + '</p>' +
      '<p class="jobLocation"><b>Location: </b>' + data.location + '</p>' +
      '<p class="jobDistance"><b>Distance: </b>' + data.distance + '</p>' +
      '<p class="jobDuration"><b>Duration: </b>' + data.duration + '</p>' +
      '<p class="jobTime"><b>Start: </b>' + data.startDate + '</p>' +
      '<p class="jobTime"><b>End: </b>' + data.endDate + '</p>' +
      '<p class="jobDescription">' + data.description + '</p>' +
    '</div>' +
    '<div class="col s12">' +
      '<a class="waves-effect waves-light btn bottomButton green darken-0" id="applyButton"><i class="material-icons left">done</i>Apply</a>' +
    '</div>' +
  '</div>');
}

function showPanels() {
  $('#panelView').css('display', 'block');
  $('#singleJobView').css('display', 'none');
  $('#profilePane').css('display', 'none');
  showHamburger();
}

//////////////////
// Job History  //
//////////////////

function showHistory() {
  $('#offerPanel').empty();
  $('#panelView').empty();

  if (state.history.length) {
    state.history.map(function(job) {
      $html = renderSingleJobPanel(job);
      $('#panelView').append($html.on('click touch', function() {
        showSingleHistory(job.id);
      }));
    });
  } else {
    $('#panelView').html('<h4 style="text-align:center; margin-top:35%;">Oh No! No Past Jobs</h4>');
  }

  showEmployeeView();
}

function showSingleHistory(id) {
  var job = state.jobs.filter(function(job) {
    return job.id === id;
  })[0];

  $('#singleHistoryView').empty().append(renderSingleHistory(job)).css('display', 'block');
  $('#panelView').css('display', 'none');
  $('#reviewView').css('display', 'none');

  $("#reviewButton").one('click touch', function(){
      $('#reviewView').empty().append(renderReview(job)).css('display', 'block');
      highlightFace();

      showBackButton();
      $('#backButton, #cancelButton').one('click touch', function () {
          showSingleHistory(job.id);
      });

      $('#singleHistoryView').css('display', 'none');
      $('#panelView').css('display', 'none');

      $('#submitReviewButton').one('click touch', function() {
        job.review = {
          text: $('#reviewArea').val(),
          rating: $('.face.selected').html(),
        };
        showSingleHistory(job.id);
      });
  });

  showBackButton();
  $('#backButton').one('click touch', function () {
      showHistoryPanels();
  });
}

function renderSingleHistory(data) {
  return $('' +
  '<div class="singleJobPanel row">' +
    '<div class="col s12">' +
      '<h5 class="jobName left">' + data.name + '</h5>' +
      '<div class="jobDetails right">' +
        '<div class="jobPosted">Posted ' + data.posted + '</div>' +
        '<div class="jobWage right">$' + data.wage + ' / hr</div>' +
      '</div>' +
    '</div>' +
    '<div class="col s12">' +
      '<p class="jobEmployer"><b>Employer: </b>' + data.employer + '</p>' +
      '<p class="jobLocation"><b>Location: </b>' + data.location + '</p>' +
      '<p class="jobDistance"><b>Distance: </b>' + data.distance + '</p>' +
      '<p class="jobDuration"><b>Duration: </b>' + data.duration + '</p>' +
      '<p class="jobTime"><b>Start: </b>' + data.startDate + '</p>' +
      '<p class="jobTime"><b>End: </b>' + data.endDate + '</p>' +
      '<p class="jobDescription">' + data.description + '</p>' +
      (data.review ?
        '<h5><b>Review:</b></h5>' +
        '<p>' + data.review.text + '</p>' +
        '<i class="material-icons center face large">' + data.review.rating + '</i>'
        : '') +
    '</div>' +
    '<div class="col s12">' +
      '<button id="reviewButton" class="waves-effect waves-light btn bottomButton blue darken-0"' + (data.review ? 'disabled' : '') + '>Review</button>' +
    '</div>' +
  '</div>');
}

function showHistoryPanels() {
  $('#reviewView').css('display', 'none');
  $('#singleHistoryView').css('display', 'none');
  $('#panelView').css('display', 'block');
  showHamburger();
}

//////////////////
// Review Job   //
//////////////////

function renderReview(data) {
  return $('' +
  '<div class="reviewPanel row">' +
    '<div class="col s12">' +
      '<h5><b>Reviewing: </b><em>' + data.employer + '</em></h5>' +
    '</div>' +
    '<div class="col s12">' +
      '<p>Describe your experience:</p>' +
      '<textarea id="reviewArea"></textarea>' +
      '<p>Rate your employer:</p>' +
      '<div style="text-align:center;">' +
        '<a><i class="material-icons center face large">sentiment_very_dissatisfied</i></a>' +
        '<a><i class="material-icons center face large">sentiment_dissatisfied</i></a>' +
        '<a><i class="material-icons center face large">sentiment_neutral</i></a>' +
        '<a><i class="material-icons center face large">sentiment_satisfied</i></a>' +
        '<a><i class="material-icons center face large">sentiment_very_satisfied</i></a>' +
      '</div>' +
    '</div>' +
    '<div class="col s12" style="position:fixed; bottom:0;">' +
      '<a id="cancelButton" class="waves-effect waves-light btn red halfButton"><i class="material-icons left">cancel</i>Cancel</a>' +
      '<a id="submitReviewButton" class="waves-effect waves-light btn green darken-0 halfButton"><i class="material-icons left">check_circle</i>Submit</a>' +
    '</div>' +
  '</div>');
}

function highlightFace() {
  $('.face').click(function() {
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
  });
}
