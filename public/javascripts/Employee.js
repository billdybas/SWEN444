function createProfilePage() {
  $('.button-collapse').sideNav('hide');
  $('#profileName').html('<h3>' + state.user.name + '</h3>');
  $('#profileLoc').html('<b>' + state.user.location + '</b>');
  $('#profilePic').html('<img src="' + state.user.profilePicture + '" id="navProfilePic" class="profilePic">');

  $('#profileSkills').html(
    '<h4>Skills: </h4>' +
    state.user.skills.reduce(function(prev, next) {
      return prev + next.skillName + '<br>';
    }, '')
    + '<br>'
  );

  $('#profileJobs').html(
    '<h4>Previous Jobs: </h4>' +
    state.user.jobs.reduce(function(prev, next) {
      var html = '' +
        '<h5 style="color: #357e35">' +
          '<b>' + next.name + '</b>' +
        '</h5>' +
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
    '<button id="editBtn" style="position: fixed; bottom: 5%; right: 5%;" class="waves-effect waves-light btn-floating btn-large"><i class="material-icons">edit</i></div>'
  ).one('click touch', function() {
    createEditProfilePage();
  });

  $('#profileAddJobBtn').empty();

  $('#panelView').css('display', 'none');
  $('#singleJobView').css('display', 'none');
  $('#profilePane').css('display', 'block');
  $('#addJobPane').css('display', 'none');
  $('#currentPage').html('Profile');

  showBackButton();
  $('#backButton').one('click touch', function () {
    showPanels()
  });
}

function createEditProfilePage(){
  $('#profileName').html('<h4>' + state.user.name + '</h4>');
  $('#profileLoc').html('<b>' + state.user.location + '</b>');
  $('#profilePic').html('<img src="' + state.user.profilePicture + '" id="navProfilePic" class="profilePic">');

  $("#profileSkills").html(
    "<h5>Skills: </h5>" +
    state.user.skills.reduce(function(prev, next) {
      return prev + "<div class='waves-effect waves-light btn'>" + next.skillName + "  <i class='material-icons'>clear</i></div>" + "<br>";
    }, '') +
    "<div id='skillTag' class='waves-effect waves-light btn' >  Add Skill  </div>" + "<br>"
  );

  $('#skillTag').on('click touch', function() {
    var skill = prompt('Enter a new skill');
    state.user.skills.push({skillName: skill});
    $('#skillTag').before("<div class='waves-effect waves-light btn'>" + skill + "  <i class='material-icons'>clear</i></div>" + "<br>");
  });

  $("#profileJobs").html(
    "<h5>Past Jobs: </h5>" +
    state.user.jobs.reduce(function(prev, next) {
      var job = state.jobs.filter(function(job) {
        return job.id == next.id;
      })[0];

      var text = "<div onclick='showSingleJob' style='color:#357e35'><b>" + job.name + "</b></div>" + "<b>Employer : </b>" + job.employer + "<br><b>Description : </b>" + job.description + "<br><br>";
      return prev + text;
    }, '')
  );

  $('#profileEditBtn').html(
    '<button id="editBtn" style="position: fixed; bottom: 5%; right: 5%;" class="waves-effect waves-light btn-floating btn-large"><i class="material-icons">check</i></div>'
  ).one('click touch', function() {
    applySuccess(showPanels);
  });

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
  $('#panelView').empty();
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
  $('#currentPage').html(job.name);

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
      offer.applicants.push(user.id);
      state.history.unshift(offer);
    }
  });

  applySuccess(function() {
    showPanels();
    createJobPanels();
  });
}

// How an individual job panel should be rendered
function renderSingleJobPanel(data) {
  return $('' +
    '<div class="jobPanel row ' + (data.applicants.filter(function(applicant) { return applicant === state.user.id }).length ? 'lime lighten-5' : '') + '">' +
      '<div class="col s12">' +
        '<div class="jobName left" style="font-size:22px;">' + data.name + '</div>' +
          '<div class="jobDetails right">' +
            '<div class="jobPosted">Posted ' + data.posted + '</div>' +
          '</div>' +
      '</div>' +
      '<div class="col s12" style="margin-top:-7px">' +
        '<div class="jobWage right">$' + data.wage + ' / hr</div>' +
        '<div class="jobEmployer">' + data.employer + '</div>' +
        '<p class="jobDescription">' + data.description + '</p>' +
      '</div>' +
    '</div>');
}

function renderSingleJob(data) {
  return $('' +
  '<div class="singleJobPanel row">' +
    '<div class="col s12">' +
      '<div class="jobName left">' + data.name + '</div>' +
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
      '<button class="waves-effect waves-light btn bottomButton green darken-0" id="applyButton"' + (data.applicants.filter(function(applicant) { return applicant === state.user.id }).length ? 'disabled' : '') + '><i class="material-icons left">done</i>Apply</button>' +
    '</div>' +
  '</div>');
}

function showPanels() {
  $('#currentPage').html('Job Listings');
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
  $('#currentPage').html('Past Jobs');
}

function showSingleHistory(id) {
  var job = state.jobs.filter(function(job) {
    return job.id === id;
  })[0];

  $('#singleHistoryView').empty().append(renderSingleHistory(job)).css('display', 'block');
  $('#panelView').css('display', 'none');
  $('#reviewView').css('display', 'none');
  $('#currentPage').html(job.name);

  $("#reviewButton").one('click touch', function(){
      $('#reviewView').empty().append(renderReview(job)).css('display', 'block');
      highlightFace();

      showBackButton();
      $('#backButton, #cancelButton').one('click touch', function () {
          showSingleHistory(job.id);
      });

      $('#singleHistoryView').css('display', 'none');
      $('#panelView').css('display', 'none');
      $('#currentPage').html('Review');

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
  $('#currentPage').html('Past Jobs');
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
      '<br/>'+
      '<br/>'+
      '<br/>'+
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
