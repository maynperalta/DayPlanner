
var storedPlans = JSON.parse(localStorage.getItem("savedPlans"));
if (storedPlans !== null) {
 planArray = storedPlans;
}else{
    planArray = new Array(9);
};


var currentTime = document.getElementById("currentDay");
currentTime.innerHTML = moment().format("dddd[,] MMMM Do[,] YYYY");


var hour24 = moment().format("H");

var scheEl = $("schedule");

scheEl.empty();
for (var hour = 9; hour <= 17; hour ++){
    var index = hour - 9;

    var rowEl = $("<div>");
    rowEl.addClass("row scheRow");
    rowEl.attr("hour-index", hour);

    var timeEl = $("<div>");
    timeEl.addClass("col-md-2 timeCol");

    var timeDisp = $("<span>");
    // timeDisp.attr("class", "timebox");

    var hourDisp = 0;
    var pm = "";

    if (hour>12){
        hourDisp = hour - 12;
        pm = "pm"
    }else if (hour === 12){
        hourDisp = hour;
        pm = "pm";
    }else{
        hourDisp = hour;
        pm = "am";
    }

    timeDisp.text(`${hourDisp} ${pm}`);
    rowEl.append(timeEl);
    timeEl.append(timeDisp);

    var activity = $("<textarea>");
    activity.attr("id", `input-${index}`);
    activity.attr("hour-index", index);
    activity.attr("type", "text");
    // activity.attr("class", "dailyPlan");
    activity.val(planArray[index]);

    var colEl = $("<div>");
    colEl.addClass("col-md-9 planned");
    rowEl.append(colEl);
    colEl.append(activity);

    var saveEl = $("<div>");
    saveEl.addClass("col-md-1 saveCol");

    var saveIcon = $("<i>");
    saveIcon.attr("class", "fa fa-save saveIcon");
    saveIcon.attr("save-id", index);
    saveIcon.attr("id", `saveid-${index}`);

    rowEl.append(saveEl);
    saveEl.append(saveIcon);

    rowColor(rowEl, hour);

    $('#schedule').append(rowEl);
};

//This function is to set the row colors based on the time of day. I didn't code this out until the day before the due date, so I only have one shot at making sure this works correctly. There was a class provided in the CSS, but I couldn't get it to work correctly here in JavaScript. Instead, I pulled the colors to indicate if the hour is in the past, present, or future.

function rowColor (rowEl, hour) { 
    if (hour < hour24) {
      rowEl.css("background-color", "#d3d3d3")
    } else if ( hour > hour24) {
      rowEl.css("background-color", "#77dd77")
    } else {
      rowEl.css("background-color", "#ff6961")
    }
  };

//Here is where we finally store the inputs into the input textarea of the row. There is an event listener waiting for a click on the FontAwesome save icon, which is given the <i> syntax above. Once that is clicked, we have a couple of variables that will connect the event listener to the text area of the row that was defined above. Also, it will save the input in the corresponding array index as a string.


$(document).on("click", "i", function(event) {
    event.preventDefault();
    var $index = $(this).attr("save-id");
    console.log($index);

    var $value = $(this).parent().parent().find("textarea").val();
    console.log(planArray);

    planArray[$index] = $value;
    console.log(planArray);

    localStorage.setItem("savedPlans", JSON.stringify(planArray));
    localStorage.setItem($index, $value);
});
