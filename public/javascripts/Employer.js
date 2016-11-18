function createOfferPanels() {
  $('#offerPanel').empty();
  state.offers.map(function(offer) {
    $html = renderSingleOfferPanel(offer);
    $('#offerPanel').append($html.on('click touch', function() {
      showSingleOffer(offer.id);
    }));
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

function showSingleOffer(id) {
  var offer = state.offers.filter(function(offer) {
    return offer.id === id;
  })[0];

  $('#singleOfferTitle').html(offer.name);
  $('#singleOfferPosted').html(offer.posted);
  $('#singleOfferLocation').html(offer.location);
  $('#singleOfferResponsibilities').html(offer.responsibilities);
  $('#singleOfferDescription').html(offer.description);
  $('#singleOfferTiming').html(offer.startDate + ' - ' + offer.endDate);
  $('#singleOfferPayRate').html(offer.wage);

  $('#offerPanel').css('display', 'none');
  $('#singleOfferView').css('display', 'block');
  showBackButton();
  $('#backButton').one('click touch', function() {
    showOffers();
  });
}

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

function showOffers() {
  $('#offerPanel').css('display', 'block');
  $('#reviewNewJob').css('display', 'none');
  $('#singleOfferView').css('display', 'none');
  $('#createJob').css('display', 'none');
  showHamburger();
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
    createOfferPanels();
    showOffers();
  });
}
