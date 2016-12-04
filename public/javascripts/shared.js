var jobs = [
  {
    id: 1,
    name: 'Construction Worker',
    employer: 'Happy Time Construction',
    description: 'Help us build the next big skyscraper. Any experience wanted, from concrete layer to carpenter to electrician.',
    posted: '1 day ago',
    wage: 10,
    distance: '2 miles',
    location: 'Somewhere',
    duration: '3 months',
    responsibilities: 'None',
    startDate: '11/4/2016',
    endDate: '1/5/2017',
    isOpen: chooseRandomElement([true, false]),
    applicants: [3]
  },
  {
    id: 2,
    name: 'Call Center Operator',
    employer: 'Don\'t Stop Calling',
    description: 'Call everyone you know to sell our amazing great product. Call them at all hours of the day and never leave a message.',
    posted: '2 days ago',
    wage: 5,
    distance: '1 mile',
    location: 'Somewhere',
    duration: '6 months',
    responsibilities: 'None',
    startDate: '11/4/2016',
    endDate: '5/5/2017',
    isOpen: chooseRandomElement([true, false]),
    applicants: [1, 2]
  },
  {
    id: 3,
    name: 'Cashier',
    employer: 'Grocery Store',
    description: 'Check out and bag customers\' groceries as well as stock shelves.',
    posted: '1 week ago',
    wage: 7.5,
    distance: '0.5 miles',
    location: 'Somewhere',
    duration: '4 weeks',
    responsibilities: 'None',
    startDate: '11/4/2016',
    endDate: '12/1/2016',
    isOpen: chooseRandomElement([true, false]),
    applicants: []
  },
  {
    id: 4,
    name: 'Cleaner',
    employer: 'Wash It All Alway',
    description: 'Clean apartments and houses from top to bottom. Dust, vacuum, make beds, etc.',
    posted: '3 months ago',
    wage: 15,
    distance: '7 miles',
    location: 'Somewhere',
    duration: '9 months',
    responsibilities: 'None',
    startDate: '11/4/2016',
    endDate: '7/5/2017',
    isOpen: chooseRandomElement([true, false]),
    applicants: [3, 4]
  },
  {
    id: 5,
    name: 'Warehouse Worker',
    employer: 'Large Warehouse, Inc',
    description: 'Drive a forklift to move boxes from one end of the warehouse to another.',
    posted: '9 hours ago',
    wage: 9,
    distance: '3 miles',
    location: 'Somewhere',
    duration: '2 months',
    responsibilities: 'None',
    startDate: '11/4/2016',
    endDate: '1/5/2017',
    isOpen: chooseRandomElement([true, false]),
    applicants: []
  },
  {
    id: 6,
    name: 'Construction Worker',
    employer: 'Happy Time Construction',
    description: 'Help us build the next big skyscraper. Any experience wanted, from concrete layer to carpenter to electrician.',
    posted: '1 day ago',
    wage: 10,
    distance: '2 miles',
    location: 'Somewhere',
    duration: '3 months',
    responsibilities: 'None',
    startDate: '11/4/2016',
    endDate: '11/5/2016',
    isOpen: chooseRandomElement([true, false]),
    applicants: []
  },
  {
    id: 7,
    name: 'Call Center Operator',
    employer: 'Don\'t Stop Calling',
    description: 'Call everyone you know to sell our amazing great product. Call them at all hours of the day and never leave a message.',
    posted: '2 days ago',
    wage: 5,
    distance: '1 mile',
    location: 'Somewhere',
    duration: '6 months',
    responsibilities: 'None',
    startDate: '11/4/2016',
    endDate: '11/5/2016',
    isOpen: chooseRandomElement([true, false]),
    applicants: []
  },
  {
    id: 8,
    name: 'Cashier',
    employer: 'Grocery Store',
    description: 'Check out and bag customers\' groceries as well as stock shelves.',
    posted: '1 week ago',
    wage: 7.5,
    distance: '0.5 miles',
    location: 'Somewhere',
    duration: '4 weeks',
    responsibilities: 'None',
    startDate: '11/4/2016',
    endDate: '11/5/2016',
    isOpen: chooseRandomElement([true, false]),
    applicants: []
  },
  {
    id: 9,
    name: 'Cleaner',
    employer: 'Wash It All Alway',
    description: 'Clean apartments and houses from top to bottom. Dust, vacuum, make beds, etc.',
    posted: '3 months ago',
    wage: 15,
    distance: '7 miles',
    location: 'Somewhere',
    duration: '9 months',
    responsibilities: 'None',
    startDate: '11/4/2016',
    endDate: '11/5/2016',
    isOpen: chooseRandomElement([true, false]),
    applicants: []
  },
  {
    id: 10,
    name: 'Warehouse Worker',
    employer: 'Large Warehouse, Inc',
    description: 'Drive a forklift to move boxes from one end of the warehouse to another.',
    posted: '9 hours ago',
    wage: 9,
    distance: '3 miles',
    location: 'Somewhere',
    duration: '2 months',
    responsibilities: 'None',
    startDate: '11/4/2016',
    endDate: '11/5/2016',
    isOpen: chooseRandomElement([true, false]),
    applicants: []
  }
];

var users = [
  {
    id: 1,
    name: 'Donald Trump',
    profilePicture: 'pictures/trump.jpg',
    location: 'Anywhere but the White House',
    jobs: [jobs[0], jobs[1]],
    skills: [
      {skillName: 'Intimidation'},
      {skillName: 'Business'},
      {skillName: 'Wrestling'}
    ],
    rating: 'sentiment_dissatisfied'
  },
  {
    id: 2,
    name: 'John Green',
    profilePicture: 'pictures/green.jpg',
    location: 'Indiana',
    jobs: [jobs[2]],
    skills: [
      {skillName: 'Writing'},
      {skillName: 'Video Making'},
      {skillName: 'Speaking'}
    ],
    rating: 'sentiment_very_satisfied'
  },
  {
    id: 3,
    name: 'Jane Doe',
    profilePicture: 'pictures/jane.jpg',
    location: 'Bangalore',
    jobs: [jobs[3]],
    skills: [
      {skillName: 'Cleaning'},
      {skillName: 'Gardening'}
    ],
    rating: 'sentiment_neutral'
  },
  {
    id: 4,
    name: 'Pablo Sancez',
    profilePicture: 'pictures/pablo.jpeg',
    location: 'Mexico',
    jobs: [jobs[4]],
    skills: [
      {skillName: 'Baseball'},
      {skillName: 'Running'}
    ],
    rating: 'sentiment_very_dissatisfied'
  }
];

state = {
  currentView: 'login',
  user: users.filter(function(user) {
    return user.id === 1;
  })[0],
  jobs: jobs,
  history: [jobs[1]],
  offers: jobs
};

function switchViews(){
    if (state.currentView === 'login') {
        showEmployeeView();

        // Show Navigation
        $('#hamburger').css('display', 'block');
        $('#search').css('display', 'block');
        $('#menu').css('display', 'block');

        // Hide the Login Page
        $('#loginView').css('display', 'none');
    } else if (state.currentView === 'employee'){
        $('#offerPanel').empty();

        createOfferPanels();

        showEmployerView();
    } else if (state.currentView === 'employer'){
        $('#panelView').empty();

        createJobPanels();

        showEmployeeView();
    }
}

function chooseRandomElement(list) {
  return list[Math.floor(Math.random() * list.length)];
}


function showEmployeeView() {
  // Don't show the Employer View
  $('#employerView').css('display', 'none');
  $('#employerSideNav').css('display', 'none');

  // Show the Employee View
  $('#employeeView').css('display', 'block');
  $('#employeeSideNav').css('display', 'block');

  $('#switchViews').html('Change to Employer');

  $('#currentPage').html('Job Listings');

  state.currentView = 'employee';
}

function showEmployerView() {
  // Show the Employer View
  $('#employerView').css('display', 'block');
  $('#employerSideNav').css('display', 'block');

  // Don't show the Employee View
  $('#employeeView').css('display', 'none');
  $('#employeeSideNav').css('display', 'none');

  $('#switchViews').html('Change to Employee');

  $('#currentPage').html('Job Postings');

  state.currentView = 'employer';
}


function showHamburger(){
    $('#hamburger').css('display', 'block');
    $('#backButton').css('display', 'none');
}

function showBackButton(){
  $('#hamburger').css('display', 'none');
  $('#backButton').css('display', 'block');
}


function applySuccess(returnPage){
    $('#backButton').off('click touch');

    $('#successOverlay').css('display', 'flex');

    setTimeout(function(){
        returnPage();
        $('#successOverlay').css('display', 'none');
    }, 1300);
}

function showJobs(){
    $('#panelView').empty();

    createJobPanels();

    showEmployeeView();
}
