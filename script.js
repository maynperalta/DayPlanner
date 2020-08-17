//Get items from local storage

var storedPlans = JSON.parse(localStorage.getItem("savedPlans"));
if (storedPlans !== null) {
 planArray = storedPlans;
}else{
    planArray = new Array(9);
};

// MomentJS for date display

var currentTime = document.getElementById("currentDay");
currentTime.innerHTML = moment().format("dddd[,] MMMM Do[,] YYYY");

var hour24 = moment().format("H");

//HTML element selector

var scheEl = $("schedule");

scheEl.empty();

//for loop to display time blocks and dynamically created elements

for (var hour = 9; hour <= 17; hour ++){
    var index = hour - 9;

    var rowEl = $("<div>");
    rowEl.addClass("row scheRow");
    rowEl.attr("hour-index", hour);

    var timeEl = $("<div>");
    timeEl.addClass("col-md-2 timeCol");

    var timeDisp = $("<span>");

    var hourDisp = 0;
    var pm = "";

//convert 24 hour clock to 12 hour a.m./p.m. clock

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

// Input for time blocks

    timeDisp.text(`${hourDisp} ${pm}`);
    rowEl.append(timeEl);
    timeEl.append(timeDisp);

    var activity = $("<textarea>");
    activity.attr("id", `input-${index}`);
    activity.attr("hour-index", index);
    activity.attr("type", "text");
    activity.val(planArray[index]);

    var colEl = $("<div>");
    colEl.addClass("col-md-9 planned");
    rowEl.append(colEl);
    colEl.append(activity);

    var saveEl = $("<div>");
    saveEl.addClass("col-md-1 saveCol");

//Font Awesome save icon   

    var saveIcon = $("<i>");
    saveIcon.attr("class", "fa fa-save saveIcon");
    saveIcon.attr("save-id", index);
    saveIcon.attr("id", `saveid-${index}`);

    rowEl.append(saveEl);
    saveEl.append(saveIcon);

    rowColor(rowEl, hour);

    $('#schedule').append(rowEl);
};

//Time block color indication for past, present, and future.

function rowColor (rowEl, hour) { 
    if (hour < hour24) {
      rowEl.css("background-color", "#d3d3d3")
    } else if ( hour > hour24) {
      rowEl.css("background-color", "#77dd77")
    } else {
      rowEl.css("background-color", "#ff6961")
    }
  };

//Save input text to local storage.


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