

var currentTime = document.getElementById("currentDay");
currentTime.innerHTML = moment().format("dddd[,] MMMM Do[,] YYYY");


var hour12 = moment().format("h");
var hour24 = moment().format("H");

var scheEl = $("schedule");

scheEl.empty();
for (var hour=9; hour <= 17; hour ++){
    var index=hour-9;

    var rowEl = $("<div>");
    rowEl.addClass("row");
    rowEl.addClass("scheRow");

    var timeEl = $("<div>");
    timeEl.addClass("col-md-2 timeRow");

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
    activity.attr("type", "text")
    activity.attr("class", "dailyPlan");

    var colEl = $("<div>");
    colEl.addClass("col-md-9 planned");
    rowEl.append(colEl);
    colEl.append(activity);

    var saveEl = $("<div>");
    saveEl.addClass("col-md-1 saveRow");

    var saveIcon = $("<i>");
    saveIcon.attr("class", "fa fa-save saveIcon");

    rowEl.append(saveEl);
    saveEl.append(saveIcon);

    rowColor(rowEl, hour);

    $('#schedule').append(rowEl);
};

function rowColor (hourEl, hour) { 


    if ( hour < Hour24) {
      hourEl.css("background-color", "lightgrey")
    } else if ( hour > nowHour24) {
      hourEl.css("background-color", "skyblue")
    } else {
      hourEl.css("background-color", "pink")
    }
  };
