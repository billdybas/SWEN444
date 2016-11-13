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
    '<div class="jobPanel col s12">' +
      '<div class="panelRow">' +
        '<div class="panelJobName">' + data.name + '</div>' +
        '<div class="panelPostTime">Posted ' + data.posted + '</div>' +
      '</div>' +
      '<div class="panelRow">' +
        '<div class="offerEmployerName">' + data.applicants.length + ' Applications Submitted</div>' +
        '<div id="openCloseOffer" style="float: right;">' +
          '<a style="color: #000000;" href="#" class="offerDropdown dropdown-button"><i class="material-icons offerDots">more_vert</i></a>' +
          '<div class="offerOpenClosed">' +
            (data.isOpen ?
              '<div style="float:right">Open</div> <i class="material-icons" style="font-size:20px; color:green;">check</i>' :
              '<div style="float:right">Closed</div> <i class="material-icons" style="font-size:20px; color:red">close</i>'
            ) +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="divider" style="width: 100%;"></div>');
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
