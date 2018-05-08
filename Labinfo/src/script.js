var CLIENT_ID = '762821302777-qnmve11eus0mi14nkmeh1oekh4de7a2f.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDeUxC15oSdo_ZLt0DxiOd8S96yJWEZy08';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
var fullscreenButton = document.getElementById('fullscreen-button');
var smallscreenButton = document.getElementById('smallscreen-button');

console.log('check1');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  console.log('check2');
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  console.log('check3');
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    console.log('check4');
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  console.log('check5');
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listUpcomingEvents();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */

function appendPre(date, time, title) {
  var pre = document.getElementById('schedule_list');
  var newtag = document.createElement("li");
  newtag.classList.add('z-depth-2');

  var datetag = document.createElement('span');
  datetag.classList.add('date');
  datetag.innerHTML = date;

  var plantag = document.createElement('span');
  plantag.classList.add('plan_title');
  plantag.innerHTML = title;

  newtag.appendChild(datetag);

  if(time) {
    var timetag = document.createElement('span');
    timetag.classList.add('time');
    timetag.innerHTML = time;
    newtag.appendChild(timetag);
  }

  newtag.appendChild(plantag);
  pre.appendChild(newtag);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'yoshida.shinichi.kochi@gmail.com',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;

        if (when)  {

          var dt = new Date(event.start.dateTime);

          var date = moment(dt);
          var day = date.format("M/D");
          var time = date.format("HH:mm");
          var title = event.summary;

          appendPre(day, time, title);
        }

        if (!when) {
          when = event.start.date;
          var dt = new Date(when);
          console.log(dt);
          var date = moment(dt);
          var day = date.format("M/D");
          var time = null;
          var title = event.summary;
          appendPre(day, time, title);
        }
      }
    } else {
      appendPre('No upcoming events found.');
    }
  });
}

function DoFullScreen() {
  if (document.body.webkitRequestFullScreen) {
    document.body.webkitRequestFullScreen();
    fullscreenButton.style.display = 'none';
    smallscreenButton.style.display = 'block';
  }
  else if (document.body.mozRequestFullScreen) {
    document.body.mozRequestFullScreen();
    fullscreenButton.style.display = 'none';
    smallscreenButton.style.display = 'block';
  }
  else {
    alert("not found");
  }
}

function DoSmallScreen() {
  if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
  else if (document.body.mozRequestFullScreen) {
    document.body.mozCancelFullScreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }

  fullscreenButton.style.display = 'block';
  smallscreenButton.style.display = 'none';
}

// function ReloadProfessor() {
// 
//   var img = new Image();
//   img.src = "http://www.lab.kochi-tech.ac.jp/yoshilab/camera/yoshiroom2.jpg";
//   $(img).bind("load", function () {
//     $("div#content1").html($(img));
//   });
//
//   var yoshiroom = document.getElementById('yoshiroom');
// }
