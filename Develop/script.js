$(document).ready(function () {
    var textChanged = false;
    var prev0, prev1, prev2, prev3, prev4, next0, next1, next2, next3, next4 = false;
    var currentRow = $(".initial");
    var timeBlock = $(".time-block");
    var textArea = $(".current");
    var DateTime = luxon.DateTime;

    var hourMer = DateTime.local().toFormat("ha");
    var hourVal = DateTime.local().toFormat("H");
    var currDate = DateTime.local().toLocaleString(DateTime.DATE_FULL);
    timeBlock.text(hourMer);
    $("#currentDay").text(currDate);

    var notesInputs = {
        "date": "",
        "12AM": "",
        "1AM": "",
        "2AM": "",
        "3AM": "",
        "4AM": "",
        "5AM": "",
        "6AM": "",
        "7AM": "",
        "8AM": "",
        "9AM": "",
        "10AM": "",
        "11AM": "",
        "12PM": "",
        "1PM": "",
        "2PM": "",
        "3PM": "",
        "4PM": "",
        "5PM": "",
        "6PM": "",
        "7PM": "",
        "8PM": "",
        "9PM": "",
        "10PM": "",
        "11PM": ""
    };
    var notesTemp = JSON.parse(localStorage.getItem("notesInputsLS"));
    if ((notesTemp != null) && (notesTemp.date === currDate)) {
        notesInputs = notesTemp;
    } else {
        notesInputs.date = currDate;
    }

    var i;
    var k;
    switch (parseInt(hourVal)) {
        case (0):
            i = 8;
            k = 0;
            prev0 = true;
            break;
        case (1):
            i = 8;
            k = 1;
            prev1 = true;
            break;
        case (2):
            i = 8;
            k = 2;
            prev2 = true;
            break;
        case (3):
            i = 8;
            k = 3;
            prev3 = true;
            break;
        case (23):
            i = 8;
            k = 8;
            next0 = true;
            break;
        case (22):
            i = 8;
            k = 7;
            next1 = true;
            break;
        case (21):
            i = 8;
            k = 6;
            next2 = true;
            break;
        case (20):
            i = 8;
            k = 5;
            next3 = true;
            break;
        default:
            i = 4;
            k = 4;
            prev4 = true;
            next4 = true;
            break;
    }

    do {
        var newRow = currentRow.clone();
        var newRowAfter = currentRow.clone();


        if ((prev1 && i > 7) || (prev2 && i > 6) || (prev3 && i > 5) || (prev4) || next0 || (next1 && i > 1) || (next2 && i > 2) || (next3 && i > 3)) {
            currentRow.before(newRow);
        }

        if ((next1 && i > 7) || (next2 && i > 6) || (next3 && i > 5) || (next4) || prev0 || (prev1 && i > 1) || (prev2 && i > 2) || (prev3 && i > 3)) {

            currentRow.after(newRowAfter);
        }
        i--

        if (i === 0) {
            timeBlock = $(".time-block");
            textArea = $(".current");
            textValue = $(".text-area");
            for (let j = 0; j < k; j++) {
                hourMer = DateTime.local().plus({
                    hours: -(k - j)
                }).toFormat("ha");
                $(timeBlock[j]).text(hourMer);
                var textBlkData = $(timeBlock[j]).text();
                $(textArea[j]).removeClass("present");
                $(textArea[j]).addClass("past");
                $(textValue[j]).val(notesInputs[textBlkData]);
            }
            for (let j = timeBlock.length; j > k; j--) {
                hourMer = DateTime.local().plus({
                    hours: +(j - (k))
                }).toFormat("ha");

                $(timeBlock[j]).text(hourMer);
                var textBlkData = $(timeBlock[j]).text();
                $(textArea[j]).removeClass("present");
                $(textArea[j]).addClass("future");
                $(textValue[j]).val(notesInputs[textBlkData]);
            }
            var textBlkData = $(timeBlock[k]).text();
            $(textValue[k]).val(notesInputs[textBlkData]);
            timeBlock = $(".time-block");
            $(".time-block").first().attr("style", "border-top: solid; border-top-width: 2px; border-top-color: lightgrey;");
            $(".time-block").last().attr("style", "border-bottom-width: 2px;");
        }
    } while (i > 0);

    function saveAction() {
        var textData = $(".text-area");
        var timeData = $(".time-block");
        for (i = 0; i < textData.length; i++) {
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

    function alertDataNotSaved() {
        if (textChanged) {
            return '';
        }
    }

    function addPrevHour() {
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

    function addNextHour() {
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
        if (lastHour == DateTime.local().toFormat("H")) {
            $(".current").last().addClass("present");
            $(".current").last().removeClass("past");
            $(".current").last().removeClass("future");
        } else if (lastHour < DateTime.local().toFormat("H")) {
            $(".current").last().addClass("past");
            $(".current").last().removeClass("present");
            $(".current").last().removeClass("future");
        } else if (lastHour > DateTime.local().toFormat("H")) {
            $(".current").last().addClass("future");
            $(".current").last().removeClass("past");
            $(".current").last().removeClass("present");
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