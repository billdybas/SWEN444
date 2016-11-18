function createOfferPanels() {
  $('#offerPanel').empty();
  state.offers.map(function(offer) {
    $html = renderSingleOfferPanel(offer);
    $('#offerPanel').append($html.on('click touch', function() {
      showSingleOffer(offer.id);
    }));
  });
}

// TODO: Fix Bugs With Back Button Listeners
function showSingleOffer(id) {
  var offer = state.offers.filter(function(offer) {
    return offer.id === id;
  })[0];

  $('#offerPanel').css('display', 'none');
  $('#singleOfferView').empty().append(renderSingleOffer(offer)).css('display', 'block');

  $('#applicantsButton').on('click touch', function() {
    $('#singleOfferView').css('display', 'none');
    $('#offerPanel').css('display', 'none');

    $('#offerApplicants').empty();
    offer.applicants.map(function(id) {
      var applicant = users.filter(function(user) {
        return user.id == id;
      })[0];

      $html = renderApplicant(applicant);
      $('#offerApplicants').append($html.on('click touch', function() {
        $('#offerApplicants').css('display', 'none');
        $('#offerApplicant').empty().append(renderApplicantProfile(applicant)).css('display', 'block');

        $('#rejectButton, #hireButton').one('click touch', function() {
          offer.applicants = offer.applicants.filter(function(a) {
            return a !== applicant.id;
          });
          createOfferPanels();
          applySuccess(showOffers);
        });

        showBackButton();
        $('#backButton').on('click touch', function () {
          $('#offerApplicant, #singleOfferView').css('display', 'none');
          $('#offerApplicants').css('display', 'block');
        });
      }));
    });
    $('#offerApplicants').css('display', 'block');

    showBackButton();
    $('#backButton').on('click touch', function () {
        $('#offerApplicants').css('display', 'none');
        showSingleOffer(offer.id);
    });
  });

  showBackButton();
  $('#backButton').on('click touch', function() {
    showOffers();
  });
}

function renderSingleOfferPanel(data) {
  return $('' +
    '<div class="jobPanel row">' +
      '<div class="col s12">' +
        '<h5 class="jobName left">' + data.name + '</h5>' +
        '<div class="jobDetails right">' +
          '<div class="jobPosted">Posted ' + data.posted + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="col s12">' +
        '<div class="left">' + data.applicants.length + ' Applications Submitted</div>' +
        '<div id="jobStatus" class="right" style="position:relative">' +
          (data.isOpen ?
            '<i class="material-icons small" style="color:green; position:absolute; bottom:3px; left:-25px;">check</i><div style="display:inline">Open</div>' :
            '<i class="material-icons small" style="color:red; position:absolute; bottom:3px; left:-25px;">close</i><div style="display:inline">Closed</div>'
          ) +
        '</div>' +
      '</div>' +
    '</div>');
}

function renderSingleOffer(data) {
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
        '<p class="jobLocation"><b>Location: </b>' + data.location + '</p>' +
        '<p class="jobDuration"><b>Date Range: </b>' + data.startDate + '-' + data.endDate + '</p>' +
        '<p class="jobDescription"><b>Description: </b>' + data.description + '</p>' +
      '</div>' +
      '<div class="col s12">' +
        '<button id="applicantsButton" class="waves-effect waves-light btn bottomButton blue darken-0"' + (data.applicants.length ? '' : 'disabled') + '>View Applications</button>' +
      '</div>' +
    '</div>');
}

function renderApplicant(data) {
  return $('' +
    '<div class="jobPanel row">' +
      '<div class="col s3">' +
        '<img src="' + data.profilePicture + '" class="profilePic">' +
      '</div>' +
      '<div class="col s6">' +
        '<h4 style="text-align:center">' + data.name + '</h4>' +
      '</div>' +
      '<div class="col s3">' +
        '<i class="material-icons center large">' + data.rating + '</i>' +
      '</div>' +
    '</div>');
}

function renderApplicantProfile(data) {
  return $('' +
  '<div class="row">' +
    '<div class="col s3">' +
      '<img src="' + data.profilePicture + '" class="profilePic" style="cursor:none">' +
    '</div>' +
    '<div class="col s6">' +
      '<h4 style="text-align:center;font-weight:bold;">' + data.name + '</h4>' +
      '<h5 style="text-align:center;">' + data.location + '</h5>' +
    '</div>' +
    '<div class="col s3">' +
      '<i class="material-icons center large">' + data.rating + '</i>' +
    '</div>' +
    '<div class="col s12">' +
      '<h4>Skills</h4>' +
      (
        data.skills.reduce(function(prev, next) {
          return prev + '<p>' + next.skillName + '</p>';
        }, '')
      ) +
      '<h4>Past Jobs</h4>' +
      (
        data.jobs.reduce(function(prev, next) {
          return prev + '<p>' + next.name + '</p>';
        }, '')
      ) +
    '</div>' +
    '<div class="col s12" style="position:fixed; bottom:0;">' +
      '<button id="rejectButton" class="waves-effect waves-light btn halfButton red">Reject</button>' +
      '<button id="hireButton" class="waves-effect waves-light btn halfButton green darken-0">Hire</button>' +
    '</div>' +
  '</div>');
}

function showOffers() {
  $('#offerPanel').css('display', 'block');
  $('#singleOfferView, #offerApplicants, #offerApplicant').css('display', 'none');
  showHamburger();
}



// TODO: Clean This Up
function showCreateJob() {
  $('#offerPanel').css('display', 'none');
  $('#reviewNewJob').css('display', 'none');
  $('#singleOfferView').css('display', 'none');
  $('#createJob').css('display', 'block');
  showBackButton();
  $('#backButton').one('click touch', function() {
    showOffers();
  });
}

function showReviewNewJob(){
  $('#reviewJobTitle').html($('#newJobName').val());
  $('#reviewJobLocation').html($('#newJobLocation').val());
  $('#reviewJobResponsibilities').html($('#newJobResponsibilities').val());
  $('#reviewJobDescription').html($('#newJobDescription').val());
  $('#reviewJobPayRate').html($('#newJobPay').val());
  $('#reviewJobTiming').html($('#newJobStartDate').val() + ' - ' + $('#newJobEndDate').val());

  $('#reviewNewJob').css('display', 'block');
  $('#createJob').css('display', 'none');

  $('#backButton').one('click touch', function() {
    showCreateJob();
  });
}

function submitNewJob() {
  var newJobInfo = {
    id: state.offers.length + 1,
    name: $('#newJobName').val(),
    employer: 'The Trump Train',
    location: $('#newJobLocation').val(),
    description: $('#newJobDescription').val(),
    posted: 'just now',
    wage: $('#newJobPay').val(),
    distance: '3 miles',
    duration: '2 months',
    responsibilities: $('#newJobResponsibilities').val(),
    startDate: $('#newJobStartDate').val(),
    endDate: $('#newJobEndDate').val(),
    isOpen: true,
    applicants: []
  };

  state.offers.unshift(newJobInfo);
  applySuccess(function() {
    $('#reviewNewJob').css('display', 'none');
    $('#createJob').css('display', 'none');
    createOfferPanels();
    showOffers();
  });
}
