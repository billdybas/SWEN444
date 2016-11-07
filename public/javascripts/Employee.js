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

function createJobPanels() {
  state.jobs.map(function(job) {
    $html = renderSingleJobPanel(job);
    $('#panelView').append($html.on('click touch', function() {
      showSingleJob(job.id);
    }));
  });
}

function renderSingleJobPanel(data) {
  return $('' +
    '<div class="jobPanel col s12">' +
      '<div class="panelRow">' +
        '<div class="panelJobName">' + data.name + '</div>' +
        '<div class="panelPostTime">Posted ' + data.posted + '</div>' +
      '</div>' +
      '<div class="panelRow panelRowMiddle">' +
        '<div class="panelEmployerName">' + data.employer + '</div>' +
        '<div class="panelSalary">$' + data.wage + ' / hr</div>' +
      '</div>' +
      '<div class="panelRow panelRowBottom">' +
        '<div class="panelDescription">' + data.description + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="divider" style="width: 100%;"></div>');
}

function showSingleJob(id) {
  var job = state.jobs.filter(function(job) {
    return job.id === id;
  })[0];

  $('#singleJobTitle').html(job.name);
  $('#singleJobPay').html('$' + job.wage + ' / hr');
  $('#singleJobEmployer').html(job.employer);
  $('#singleJobDistance').html('<b>Distance: </b>' + job.distance);
  $('#singleJobDuration').html('<b>Duration: </b>' + job.duration);
  $('#singleJobTime').html('<b>Posted: </b>' + job.posted);
  $('#singleJobDescription').html('<b>Description: </b><br>' + job.description);

  $('#panelView').css('display', 'none');
  $('#singleJobView').css('display', 'block');
  $('#profilePane').css('display', 'none');

  $('applyButton').one('click touch', function() {
    applyToJob(state.user, job);
  });

  showBackButton();
  $('#backButton').one('click touch', function() {
    showPanels();
  });
}

function applyToJob(user, job) {
  // TODO: Make this work
  state.offers.map(function(offer) {
    if (offer.id === job.id) {
      offer.applicants.push(user);
      state.history.unshift(offer);
    }
  });

  applySuccess(showPanels);
}

function showPanels() {
  $('#panelView').css('display', 'block');
  $('#singleJobView').css('display', 'none');
  $('#profilePane').css('display', 'none');
  showHamburger();
}

function showHistory() {
  $('#offerPanel').empty();
  $('#panelView').empty();

  state.history.map(function(job) {
    $html = renderSingleJobPanel(job);
    $('#panelView').append($html.on('click touch', function() {
      showSingleHistory(data.id);
    }));
  });

  showEmployeeView();
}

function showSingleHistory(id) {
  var job = state.jobs.filter(function(job) {
    job.id === id;
  });

  $('#singleHistoryTitle').html(job.name);
  $('#singleHistoryPay').html('$' + job.wage + ' / hr');
  $('#singleHistoryEmployer').html(job.employer);
  $('#singleHistoryDistance').html('<b>Distance: </b>' + job.distance);
  $('#singleHistoryDuration').html('<b>Duration: </b>' + job.duration);
  $('#singleHistoryTime').html('<b>Posted: </b>' + job.posted);
  $('#singleHistoryDescription').html('<b>Description: </b><br>' + job.description);

  $('#panelView').css('display', 'none');
  $('#singleHistoryView').css('display', 'block');

  $('#singleReviewStatus').html('<b>Review Status: </b><br>' + review);
  $("#reviewButton").one('click touch',function(){
      showBackButton();
      $('#backButton').one('click touch', function () {
          showHistoryPanels();
      });

      $('#reviewView').css('display', 'block');
      $('#singleHistoryView').css('display', 'none');
      $('#panelView').css('display', 'none');

      $('#employer').html(job.employer);
  });

  showBackButton();
  $('#backButton').one('click touch', function () {
      showHistoryPanels();
  });
  $('#cancelButton').one('click touch', function () {
      showHistoryPanels();
  });
}

function showHistoryPanels() {
  $('#reviewView').css('display', 'none');
  $('#singleHistoryView').css('display', 'none');
  $('#panelView').css('display', 'block');
  showHamburger();
}

function highlightFace() {
  $('.face').click(function () {
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
  });
}

var review = '';
function submitReview() {
  review = $('#reviewArea').val();
  showHistoryPanels();
}
