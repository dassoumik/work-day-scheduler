var currentRow = $(".initial");
var timeBlock  = $(".time-block");
var textArea   = $(".current");
var saveButton = $(".saveBtn");
var DateTime = luxon.DateTime;
var hourInt = DateTime.local().toFormat("H");
var hourMer = DateTime.local().toFormat("ha");
var meridien = DateTime.local().toFormat("a");
timeBlock.text(hourMer);

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
    for (let j = 0; j < 4; j++) {
hourMer = DateTime.local().plus({hours: - (4 - j)}).toFormat("ha"); 
console.log(timeBlock);
$(timeBlock[j]).text(hourMer);
$(textArea[j]).removeClass("present");
$(textArea[j]).addClass("past");
    }
    for (let j = timeBlock.length; j > 4; j--) {
        hourMer = DateTime.local().plus({hours: + (j - 4)}).toFormat("ha"); 
        console.log(timeBlock);
        $(timeBlock[j]).text(hourMer);
        $(textArea[j]).removeClass("present");
        $(textArea[j]).addClass("future");
            }
  }  
} while (i > 1);
