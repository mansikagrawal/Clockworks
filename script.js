let timerObj = {
    minutes: 0,
    seconds: 0,
    timerId: 0,
}



function soundalarm() {


    let amount = 3;
    let audio = new Audio("Timer_Sound_Effect.mp3");

    function playsound() {
        audio.pause();
        audio.currentTime = 0;
        audio.play();

    }

    for (let i = 0; i < amount; i++) {
        setTimeout(playsound, 1200 * i);
    }
}




function updatevalue(key, value) {
    if (value < 0) {
        value = 0;
        console.log("Positive number only ");
    }


    if (key == "seconds") {
        if (value < 10) {
            value = "0" + value;
        }
        if (value > 59) {
            value = 59;
        }
    }



    $("#" + key).html(value || 0)
    timerObj[key] = value

    console.log("Min", timerObj.minutes)
    console.log("Sec", timerObj.seconds);


}


(function detectChanges(key) {
    console.log("Detect changes");



    let inputs = "#" + key + "-input";
    $(inputs).change(function() {
        updatevalue(key, $(inputs).val());

    });


    $(inputs).keyup(function() {
        updatevalue(key, $(inputs).val());


    });

    return arguments.callee;

})("minutes")("seconds");


function startTimer() {

    buttonManager(["start", false], ["pause", true], ["stop", true]);
    freezeInput();

    timerObj.timerId = setInterval(function() {
        timerObj.seconds--;

        if (timerObj.seconds < 0) {
            if (timerObj.minutes == 0) {
                soundalarm();
                return stopTimer();
            }

            timerObj.seconds = 59;
            timerObj.minutes--;
        }

        updatevalue("minutes", timerObj.minutes);
        updatevalue("seconds", timerObj.seconds);

    }, 1000);
}

function stopTimer() {
    clearInterval(timerObj.timerId);
    buttonManager(["start", true], ["pause", false], ["stop", false]);
    unfreezeInput();
    updatevalue("minutes", $("#minutes-input").val());
    let seconds = $("#seconds-input").val();
    if (seconds < 10)
        seconds = "0" + seconds;

    updatevalue("seconds", seconds);


}

function pauseTimer() {
    buttonManager(["start", true], ["pause", false], ["stop", true]);
    clearInterval(timerObj.timerId);

}



function buttonManager(...buttonsArray) {

    for (let i = 0; i < buttonsArray.length; i++) {

        let button = "#" + buttonsArray[i][0] + "-button";

        if (buttonsArray[i][1]) {
            $(button).removeAttr("disabled");
        } else {

            $(button).attr("disabled", "disabled");
        }



    }

}



function freezeInput() {

    $("#minutes-input").attr("disabled", "disabled");
    $("#seconds-input").attr("disabled", "disabled");

}

function unfreezeInput() {

    $("#minutes-input").removeAttr("disabled");
    $("#seconds-input").removeAttr("disabled");

}