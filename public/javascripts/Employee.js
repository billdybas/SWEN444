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
