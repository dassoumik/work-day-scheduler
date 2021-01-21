$(document).ready(function() {
var textChanged = false;    
var currentRow = $(".initial");
var timeBlock  = $(".time-block");
var textArea   = $(".current");
var DateTime = luxon.DateTime;
var hourMer = DateTime.local().toFormat("ha");
var hourVal = DateTime.local().toFormat("H");
var currDate = DateTime.local().toLocaleString(DateTime.DATE_FULL);
timeBlock.text(hourMer);
$("#currentDay").text(currDate);


var notesInputs = {"date": "", "12AM": "", "1AM": "", "2AM": "", "3AM": "", "4AM": "", "5AM": "",
                   "6AM": "", "7AM": "", "8AM": "", "9AM": "", "10AM": "", "11AM": "", 
                   "12PM": "", "1PM": "", "2PM": "", "3PM": "", "4PM": "", "5PM": "",
                   "6PM": "", "7PM": "", "8PM": "", "9PM": "", "10PM": "", "11PM": ""};
var notesTemp = JSON.parse(localStorage.getItem("notesInputsLS"));
if ((notesTemp != null) && (notesTemp.date === currDate)) {
    notesInputs = notesTemp;
} else {
    notesInputs.date = currDate;
} 

switch (hourVal) {
    case (0) :
        i = 10;
        j = 0;
}

var i = 5;
do  {
var newRow = currentRow.clone();
var newRowAfter = currentRow.clone();

i--
currentRow.before(newRow);
currentRow.after(newRowAfter);
if (i === 1) {
timeBlock  = $(".time-block");
textArea   = $(".current");
textValue  = $(".text-area");
    for (let j = 0; j < 4; j++) {
hourMer = DateTime.local().plus({hours: - (4 - j)}).toFormat("ha"); 
$(timeBlock[j]).text(hourMer);
var textBlkData = $(timeBlock[j]).text();
$(textArea[j]).removeClass("present");
$(textArea[j]).addClass("past");
$(textValue[j]).val(notesInputs[textBlkData]);    
    }
    for (let j = timeBlock.length; j > 4; j--) {
        hourMer = DateTime.local().plus({hours: + (j - 4)}).toFormat("ha"); 
        $(timeBlock[j]).text(hourMer);
        var textBlkData = $(timeBlock[j]).text();
        $(textArea[j]).removeClass("present");
        $(textArea[j]).addClass("future");
        $(textValue[j]).val(notesInputs[textBlkData]);    
    }
   var  textBlkData = $(timeBlock[4]).text();   
   $(textValue[4]).val(notesInputs[textBlkData]);  
   timeBlock = $(".time-block");  
   $(".time-block").first().attr("style", "border-top: solid; border-top-width: 2px; border-top-color: lightgrey;");
   $(".time-block").last().attr("style", "border-bottom-width: 2px;");
  }  
} while (i > 1);

function saveAction() {
    var textData = $(".text-area");
    var timeData = $(".time-block");
    for (i = 0; i < textData.length; i++){   
        var prop = timeData[i];
        prop = prop.textContent; 
        var data = textData[i];
        notesInputs[prop] = data.value;
    }; 
    localStorage.setItem("notesInputsLS", JSON.stringify(notesInputs));
    textChanged = false;
}

function saveReminder() {
    textChanged = true;
}

function alertDataNotSaved () {
    if (textChanged) {
        return '';
    }
}

function addPrevHour () {
    var firstHour = $(".time-block").first().text();
    firstHourMer = firstHour.match(/\D/g).join("");
    firstHour = firstHour.split(firstHourMer).slice(0).join("");
    if (firstHour == 12 && firstHourMer == "AM") {
        firstHour = 23;
        return;
    } else if (firstHour == 12 && firstHourMer == "PM") {
        firstHour = 11;    
    } else if (firstHour == 1 && firstHourMer == "PM") {
        firstHour = 12;    
    } else if (firstHour != 1 && firstHourMer == "AM") {
        firstHour = firstHour - 1;    
    } else if (firstHour != 1 && firstHourMer == "PM") {
        firstHour = parseInt(firstHour) + 11;    
    } else if (firstHour == 1 && firstHourMer == "AM") {
        firstHour = 0;    
    }

    prevHA = DateTime.local().toObject();
    prevHA.hour = firstHour; 
    prevHA = DateTime.fromObject(prevHA); 
    prevHA = prevHA.toFormat("ha");
    
   var prevHourRow = $(".initial").first().clone();
   ($(".initial").first()).before(prevHourRow);
   if (firstHour == DateTime.local().toFormat("H")) {
        $(".current").first().addClass("present");
        $(".current").first().removeClass("past");
        $(".current").first().removeClass("future");
   } else if (firstHour < DateTime.local().toFormat("H")) {
        $(".current").first().addClass("past");
        $(".current").first().removeClass("present");
        $(".current").first().removeClass("future");
   } else if (firstHour > DateTime.local().toFormat("H")) {
        $(".current").first().addClass("future");
        $(".current").first().removeClass("past");
        $(".current").first().removeClass("present");
   }
   $(".initial").last().remove();
   $(".time-block").first().text(prevHA); 
   $(".text-area").first().val(notesInputs[prevHA]);
   $(".saveBtn").on("click", saveAction);
}

function addNextHour () {
    var lastHour = $(".time-block").last().text();
    lastHourMer = lastHour.match(/\D/g).join("");
    lastHour = lastHour.split(lastHourMer).slice(0).join("");
    if (lastHour == 11 && lastHourMer == "AM") {
        lastHour = 12;
        lastHourMer = "PM";  
    } else if (lastHour == 11 && lastHourMer == "PM") {
        lastHour = 0;  
        lastHourMer = "AM"; 
        return; 
    } else if (lastHour != 12 && lastHourMer == "AM") {
        lastHour = parseInt(lastHour) + 1;    
    } else if (lastHour != 12 && lastHourMer == "PM") {
        lastHour = parseInt(lastHour) + 13;    
    } else if (lastHour == 12 && lastHourMer == "AM") {
        lastHour = 1;
    } else if (lastHour == 12 && lastHourMer == "PM") {
        lastHour = 13;
    }
    nextHA = DateTime.local().toObject();
    nextHA.hour = lastHour; 
    nextHA = DateTime.fromObject(nextHA); 
    nextHA = nextHA.toFormat("ha");
    
    var nextHourRow = $(".initial").last().clone();
    $(".initial").last().after(nextHourRow);
    if (nextHA === DateTime.local().toFormat("ha")) {
        $(".current").first().addClass("present");
        $(".current").first().removeClass("past");
        $(".current").first().removeClass("future");
   } else if (nextHA < DateTime.local().toFormat("ha")) {
        $(".current").first().addClass("past");
        $(".current").first().removeClass("present");
        $(".current").first().removeClass("future");
   } else if (nextHA > DateTime.local().toFormat("ha")) {
        $(".current").first().addClass("future");
        $(".current").first().removeClass("past");
        $(".current").first().removeClass("present");
   }
    $(".initial").first().remove();
    $(".time-block").last().text(nextHA); 
    $(".text-area").last().val(notesInputs[nextHA]);
    $(".saveBtn").on("click", saveAction);
 }

$(".saveBtn").on("click", saveAction);
$("#up-arrow").on("click", addPrevHour);
$("#down-arrow").on("click", addNextHour);
$(document).on("keyup", ".text-area", saveReminder);
$(window).on("beforeunload", alertDataNotSaved);

});