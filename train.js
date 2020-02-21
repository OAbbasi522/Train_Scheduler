var firebaseConfig = {
    apiKey: "AIzaSyDSngc7udXWzI18zoYJESJhYJuaHJDxF0A",
    authDomain: "jan-08-class.firebaseapp.com",
    databaseURL: "https://jan-08-class.firebaseio.com",
    projectId: "jan-08-class",
    storageBucket: "jan-08-class.appspot.com",
    messagingSenderId: "147058702829",
    appId: "1:147058702829:web:7d6421eb191a3705678fe4",
    measurementId: "G-LQGERR69XY"
  };
  firebase.initializeApp(firebaseConfig)

  var trainData = firebase.database();

  $(document).on("click", "#add-train-btn", function(event){
      alert("Schedule added successfully")
      event.preventDefault()
      var trainName = $("#train-name-input").val().trim()
      var destination = $("#destination-input").val().trim()
      var firstTrain = $("#start-input").val().trim()
      var frequency = $("#frequency-input").val().trim()

var newTrainData = {
    name:trainName, 
    destination:destination,
    firstTrain:firstTrain,
    frequency:frequency
}  
console.log(newTrainData)
trainData.ref().push(newTrainData)

alert("Train was added successfully")
$("#train-name-input").val("")
$("#destination-input").val("")
$("#start-input").val("")
$("#frequency-input").val("")


  })

  trainData.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val())
    var trainTitle = childSnapshot.val().name
    var location = childSnapshot.val().destination
    var firstArrival = childSnapshot.val().firstTrain
    var rate = childSnapshot.val().frequency

    var timeArr = firstArrival.split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1])
    var maxTime = moment.max(moment(),trainTime)
    var trainMinutes;
    var trainArrival;

    if(maxTime===trainTime){
        trainArrival = trainTime.format("hh:mm A")
        trainMinutes = trainTime.diff(moment(),"minutes")
    }
    else {
    var timeDifference = moment().diff(trainTime,"minutes")
    var remainderTime = timeDifference%rate
    trainMinutes = rate-remainderTime
    trainArrival = moment().add(trainMinutes,"m").format("hh:mm A")
    }

    $("#train-table>tbody").append(
    $("<tr>").append(
        $("<td>").text(trainTitle),
        $("<td>").text(location),
        $("<td>").text(rate),
        $("<td>").text(trainArrival),
        $("<td>").text(trainMinutes),
        
    )    
    )
})