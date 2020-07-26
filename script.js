

var currentTime = document.getElementById("currentDay");
currentTime.innerHTML = moment().format("dddd[,] MMMM Do[,] YYYY");


var hour12 = moment().format("h");
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
    timeDisp.attr("class", "timebox");

    var hourDisp = 0;
    var pm = "";

    if (hour>12){
        hourDisp = hour - 12;
        pm = "pm"
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
    activity.attr("class", "dailyPlan");
    // activity.val(planArray[index]);

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

//This function is to set the row colors based on the time of day. I didn't code this out until the day before the due date, so I only have one shot at making sure this works correctly. If the hour is in the past, the color should be greyed out, if it's in the future, it should be blue and if it's the present hour, it should be pink.

function rowColor (rowEl, hour) { 
    if (hour < hour24) {
      rowEl.css("background-color", "lightgrey")
    } else if ( hour > hour24) {
      rowEl.css("background-color", "skyblue")
    } else {
      rowEl.css("background-color", "pink")
    }
  };

//Here is where we finally store the inputs into the input textarea of the row. 


$(document).on("click", "i", function(event) {
    event.preventDefault();
    var $index = $(this).attr("save-id");

    var inputId = "#textarea-"+$index;
    var $value = $(inputId).val();

    planArray[$index] = $value;


    localStorage.setItem("savedPlans", JSON.stringify(planArray));
    localStorage.setItem($index, $value);
});

var storedPlans = JSON.parse(localStorage.getItem("savedPlans"));
  if (storedPlans !== null) {
   planArray = storedPlans;
  }else{
      planArray = new Array(9);
      planArray[4] = "Test";
  
  };
