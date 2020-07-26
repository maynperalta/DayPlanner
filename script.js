//Starting off the JavaScript is the variable that will allow us to retrieve our plans from local storage. I had this at the bottom where I coded it last until I was informed that it wouldn't function unless it was here due to when variables are declared. This bit of code allows our input to stay in place after it's been entered, even if the screen is refreshed.

var storedPlans = JSON.parse(localStorage.getItem("savedPlans"));
if (storedPlans !== null) {
 planArray = storedPlans;
}else{
    planArray = new Array(9);
};

//The assignment required us to read up on, and implement, MomentJS in order to show times and dates. I started with a variable in order to have something to input the date into the "jumbotron" of the HTML file. I also created a variable for a 24 hour clock in MomentJS which will help the time display properly when I created my elements.

var currentTime = document.getElementById("currentDay");
currentTime.innerHTML = moment().format("dddd[,] MMMM Do[,] YYYY");

var hour24 = moment().format("H");

//The scheEl variable is what I used in order to dynamically create the HTML elements we'll need for the schedule. This variable is tied to the "#schedule" ID of the index.html page. Just to be safe and avoid any bugs down the road, I also put in some code to ensure that it's empty before writing our "for" loop. 

var scheEl = $("schedule");

scheEl.empty();

//Here I have a "for" loop that will create our rows and columns that will make up our schedule. The assignment requested that it be for normal working hours (9-5) so the loop will start at 9 a.m. and loop until 5 p.m. (or, 1700 military time). Since it's an 8 hour window, it loops until we have an input for every hour increment from 9:00 a.m. until 5:00 p.m. The index variable is also specified in order to prevent problems arising from the for loop. 

for (var hour = 9; hour <= 17; hour ++){
    var index = hour - 9;

//The loop creates <div> elements that in turn create rows and columns. The assignment has us using bootstrap, so I had to also include bootstrap-specific classes in order to get the layout to show properly. There are also attributes which will show the time and index for each row. 

    var rowEl = $("<div>");
    rowEl.addClass("row scheRow");
    rowEl.attr("hour-index", hour);

    var timeEl = $("<div>");
    timeEl.addClass("col-md-2 timeCol");

    var timeDisp = $("<span>");

    var hourDisp = 0;
    var pm = "";

//My day job uses military time (0000-2359), but people commonly use "a.m./p.m." when referencing the time. Here I have an if/else statement that will display the time in traditional "a.m./p.m." style. 

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

// The rest of this code is a continuation of the elements being created from the "for" loop. These include the text area where the plans will be input and the save icon for saving them to local storage.

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

//because the HTML we were provided included a link to the FontAwesome cdn, I decided to use a FontAwesome save icon. Unfortunately, the .saveBtn class we were provided with in the CSS didn't work as I had hoped, so I searched online to find a FontAwesome save icon I could use. When all of this has finally been generated, it is appended to the HTML.    

    var saveIcon = $("<i>");
    saveIcon.attr("class", "fa fa-save saveIcon");
    saveIcon.attr("save-id", index);
    saveIcon.attr("id", `saveid-${index}`);

    rowEl.append(saveEl);
    saveEl.append(saveIcon);

    rowColor(rowEl, hour);

    $('#schedule').append(rowEl);
};

//This function is to set the row colors based on the time of day. I didn't code this out until the day before the due date, so I only have one shot at making sure this works correctly. There were classes provided in the CSS, but I couldn't get them to work correctly here in JavaScript. Instead, I pulled the colors to indicate if the hour is in the past, present, or future.

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