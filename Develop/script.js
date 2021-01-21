$(document).ready(function() {
var currentRow = $(".initial");
var timeBlock  = $(".time-block");
var textArea   = $(".current");
var saveButton = $(".saveBtn");
var DateTime = luxon.DateTime;
var hourInt = DateTime.local().toFormat("H");
var hourMer = DateTime.local().toFormat("ha");
var meridien = DateTime.local().toFormat("a");
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
   console.log(timeBlock.first().text());
  }  
} while (i > 1);

function saveAction() {
    console.log("In save action");
    var textData = $(".text-area");
    var timeData = $(".time-block");
    for (i = 0; i < textData.length; i++){   
        var prop = timeData[i];
        prop = prop.textContent; 
        var data = textData[i];
        console.log(data);  
        notesInputs[prop] = data.value;
    }; 
    localStorage.setItem("notesInputsLS", JSON.stringify(notesInputs));
}

$(".saveBtn").on("click", saveAction);


});