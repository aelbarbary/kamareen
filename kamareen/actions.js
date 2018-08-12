import { FETCHING_EVENTS } from './Constants'
import {Firebase, FirebaseRef} from './lib/firebase'
export function fetchEventsFromStore() {
  return (dispatch) => {

    const UID = Firebase.auth().currentUser.uid;
    if (!UID)
      return false;

    const ref = FirebaseRef.child(`events`);
    console.log(ref);
    var date = new Date();
    dateKey = formatDate(date);
    console.log(dateKey);

    return ref.on('value', (snapshot) => {

      var events = [];
      console.log(snapshot);
      snapshot.forEach(function(event) {
        console.log(event);
        eventObject = event.val();
        eventObject.key = event.key;
        var totalTime = 0;

        events.push(eventObject);
      });

      return dispatch({
        type: FETCHING_EVENTS,
        data: events,
      });
    });
  }
}


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
