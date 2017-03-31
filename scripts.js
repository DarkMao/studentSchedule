/* global $ */
/* global barrel*/
/*global swal */
/*global showPeriods*/
/**/
function generateTableHead(per) {
    var title = ['First Name', 'Last Name', 'Grade', 'Room', 'Class', 'Teacher', 'Remove'];
    var width = ["15", "15", "10", "10", "25", "25"];
    var html = `<tr class="thead-inverse"><th rowspan="100%" class="rowSpanper" id="span${per}"style="vertical-align:middle;"><div class="period-header" id="head${per}">${per}</div></th>`;
    for (var x = 0; x < title.length; x++) {
        html += `<th style="width:${width[x]}%;">${title[x]} </th>`;
    }
    html += ""
    return html;
}

var periods = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'FGrey', 'FRed', 'GGrey', 'GRed'];
var showPeriods = {
    perA: false,
    perB: false,
    perC: false,
    perD: false,
    perE: false,
    perF: false,
    perG: false,
    perFGrey: false,
    perFRed: false,
    perGGrey: false,
    perGRed: false
};

var dir;
var namesGrades = [];
var selected = [];

$.getJSON('directoryfinal.json', function(data) {
    dir = data;
});
// console.log(selected);

function barrel() {
    var css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = `
    @keyframes roll {
        100% {transform:rotate(360deg)}
    }
    @-moz-keyframes roll{100%25
        {-moz-transform:rotate(360deg);}}
        @-o-keyframes roll{100%25{-o-transform:rotate(360deg);}}
        @-webkit-keyframes roll{100%25{-webkit-transform:rotate(360deg);}moz}
        body{
            -moz-animation-name:roll;
            -moz-animation-duration:4s;
            -moz-animation-iteration-count:1;
            -o-animation-name:roll;
            -o-animation-duration:4s;
            -o-animation-iteration-count:1;
            -webkit-animation-name:roll;
            -webkit-animation-duration:4s;
            -webkit-animation-iteration-count:1;}`;
    document.getElementsByTagName('head')[0].appendChild(css)
    return css.innerHTML;
}

function tableglow(per) {
    var css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = `@-webkit-keyframes greenPulse {
    from { background-color: #39a393;}
    50% { background-color: #5ef2dc;}
    to { background-color: #39a393;}
    } 
    #span${per},#head${per}{  
    -webkit-animation-name: greenPulse;
    -webkit-animation-duration:1s;
    -webkit-animation-iteration-count: 2;
    -moz-animation-name: greenPulse;
    -moz-animation-duration:1s;
    -moz-animation-iteration-count: 2
    }`;
    document.getElementsByTagName('body')[0].appendChild(css)
    return css.innerHTML;
}
var wasjeff = false;
$.getJSON('data.json', function(data) {
    $('#studentName').keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var studentNameGrade = document.getElementById('studentName').value;
            var studentObj = data.filter(entry => entry.id === studentNameGrade)[0];
            // console.log(studentNameGrade);
            if (studentNameGrade == "creator" || studentNameGrade == "Creator" || studentNameGrade == "Who is the creator" || studentNameGrade == "who is the creator") {
                swal({
                    title: "Jeffrey Richiez!",
                    text: "Made on Feb 2017",
                    html: true
                });

            }
            if (studentNameGrade === "Jeffrey Richiez 12" && wasjeff == false || studentNameGrade == "richiez" || studentNameGrade == "Richiez") {
                swal({
                    title: "Added Creator",
                    text: "",
                    timer: 4000,
                    showConfirmButton: false
                });
                barrel();
                wasjeff = true;
            }
            if (studentObj && $.inArray(studentObj, selected) < 0) {
                selected.push(studentObj);
                // event.preventDefault();
            }
            else {
                console.warn(`Warning: ${studentNameGrade} already exists or not found`);
            }
            $('#studentName').val("");
            // console.log(selected);
            generateTables("ALL", namesGrades, selected, dir);
            
            // console.log(marginedit());
        }
    });

    $('body').on('click', '.but', function() {
        var idToDelete = $(this).data('id');
        selected = selected.filter(s => s.id !== idToDelete);
        console.log(selected);
        generateTables("ALL", namesGrades, selected);
    });
    //autocomplete
    for (var i = 0; i < data.length; i++) {
        namesGrades.push(data[i].firstname + " " + data[i].lastname + " " + data[i].grade);
    }

    $("#studentName").autocomplete({
        source: namesGrades, // fixed so that auto focuses first element on pressing enter
        autoFocus: true,
        delay: 0,
        minLength: 2
    });

    $(".period").click(function() {
        var d = $(this).data('tag'); //represents perA etc
        $(this).toggleClass("clicked");
        showPeriods[d] = !showPeriods[d];
        var perString = d.replace('per', '');
        generateTables(perString, namesGrades, selected);
    });
});

function resetTimes(){
    var times = [{
        per: "A",
        start: [8, 25],
        end: [9, 10]
    }, {
        per: "B",
        start: [9, 11],
        end: [9, 57]
    }, {
        per: "C",
        start: [12, 19],
        end: [13, 05]
    }, {
        per: "D",
        start: [13, 06],
        end: [13, 52]
    }, {
        per: "E",
        start: [13, 53],
        end: [14, 39]
    }, {
        per: "F",
        start: [9, 58],
        end: [10, 44]
    }, {
        per: "G",
        start: [11, 31],
        end: [12, 18]
    }];
    return times;
}

$('#per-now').click(function() {
    var times = resetTimes();
    var now = new Date();
    var day = now.getDay()-1;
    console.log("day" + day);
    var temp = times[4].per;
    times[4].per = times[day].per;
    times[day].per = temp;
    var currentPeriods = [];
    console.log(times);
    times.forEach(function(time) {
        var nowMin = now.getMinutes();
        var nowHours = now.getHours();
                // var nowMin = 30;
                // var nowHours = 14;
        var nowTime = nowHours * 60 + nowMin;
        var perStart = time.start[0] * 60 + time.start[1];
        var perEnd = time.end[0] * 60 + time.end[1];
        console.log(nowMin + " " + nowHours)

        // if (time.start[0] <= nowHours && nowHours <= time.end[0] &&
        // time.start[1] <= nowMin && nowMin <= time.end[1]){
        if (perStart <= nowTime && nowTime <= perEnd) {
            if (time.per === "F") {
                currentPeriods.push("FRed");
                currentPeriods.push("FGrey");
                tableglow("FRed");
                tableglow("FGrey");
            }
            if (time.per === "G") {
                currentPeriods.push("GRed");
                currentPeriods.push("GGrey");
                tableglow("GRed");
                tableglow("GGrey");
            }
            currentPeriods.push(time.per);
            tableglow(time.per);
        }

    });
    currentPeriods.forEach(function(per) {
        console.log(per);
        $('#per-' + per).addClass('clicked');
        showPeriods['per' + per] = true;
        console.log(showPeriods);
        generateTables(per, namesGrades, selected);
    })
});
// ===== Scroll to Top ==== 
$(window).scroll(function() {
    if ($(this).scrollTop() >= 80) { // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200); // Fade in the arrow
    }
    else {
        $('#return-to-top').fadeOut(200); // Else fade out the arrow
    }
});
$('#return-to-top').click(function() { // When arrow is clicked
    $('body,html').animate({
        scrollTop: 0 // Scroll to top of body
    }, 500);
});
$('body').on('click', '#nuke', function() {
    if (confirm('Delete all students in the table?')) {
        selected = [];
    }
    else {
    }
});