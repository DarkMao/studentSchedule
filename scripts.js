/* global $ */
function generateTableHead(per) {
    var title = ['First Name', 'Last Name', 'Grade', 'Room', 'Class', 'Teacher', 'Remove'];
    var width = ["15", "15", "10", "10", "25", "25"];
    var html = `<tr class="thead-inverse"><th rowspan="100%" id="rowSpanper" style="vertical-align:middle;">${per}</th>`;
    for (var x = 0; x < title.length; x++) {
        html += `<th style="width:${width[x]}%;">${title[x]}</th>`;
    }
    html += ""
    return html;
}

function removeStudent() {
    console.log(this)
}

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
$.getJSON('data.json', function(data) {
    var namesGrades = [];
    var selected = [];
    $('#studentName').keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var studentNameGrade = document.getElementById('studentName').value;
            var studentObj = data.filter(entry => entry.id === studentNameGrade)[0];

            if (studentObj && $.inArray(studentObj, selected) < 0) {
                selected.push(studentObj);
                // event.preventDefault();
            } else {
                console.warn(`Warning: ${studentNameGrade} already exists or not found`);
            }
            $('#studentName').val("");
            console.log(selected);
            generateTables("ALL",namesGrades,selected);
        }
    });
    
    $('body').on('click', '.but', function() {
        var idToDelete = $(this).data('id');
        selected = selected.filter(s => s.id !== idToDelete);
        console.log(selected);
        generateTables("ALL",namesGrades,selected);
    });
        
    //autocomplete
    for (var i = 0; i < data.length; i++) {
        namesGrades.push(data[i].firstname + " " + data[i].lastname + " " + data[i].grade);
    }

    $("#studentName").autocomplete({
        source: namesGrades, // fixed so that auto focuses first element on pressing enter
        autoFocus: true,

    });


    $(".period").click(function() {
        var d = $(this).data('tag'); //represents perA etc
        $(this).toggleClass("clicked");
        showPeriods[d] = !showPeriods[d];
        var perString = d.replace('per', '');
        generateTables(perString,namesGrades,selected);
        // var tableHTML = "<tbody>";
        // var table = $("#table" + perString)[0];

        // generateTables(perString);

        // if (showPeriods[d]) {
        //     tableHTML += generateTableHead(perString);
        //     for (var i = 0; i < selected.length; i++) {
        //         if (selected[i].schedule[d]) {
        //             tableHTML += ("<tr><th scope=\"row\">" +
        //                 selected[i].firstname + "</th><th>" + selected[i].lastname + "</th><th>" +
        //                 selected[i].grade + "</th><th></th><th>" + selected[i].schedule[d].subject +
        //                 "</th><th>" + selected[i].schedule[d].teacher +
        //                 "</th><th><button class=\"but\" " +
        //                 "data-id=\"" + selected[i].id + "\">X</button></th></tr>");
        //         }
        //         console.log(table);
        //         console.log(showPeriods);
        //     }
        // }

        // var deleteButtons = Array.prototype.slice.call(document.querySelectorAll('.but'));
        // deleteButtons.forEach(button => {
        //     console.log(this);
        // })

        // table.innerHTML = tableHTML + "</tbody>";

    });
});


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
    end: [1, 05]
}, {
    per: "D",
    start: [1, 06],
    end: [1, 52]
}, {
    per: "E",
    start: [1, 53],
    end: [2, 39]
}, {
    per: "F",
    start: [9, 58],
    end: [10, 44]
}, {
    per: "G",
    start: [11, 31],
    end: [12, 18]
}];
var d = new Date();
var day = d.getDay() - 1;
var temp = times[4].per;
times[4].per = times[day].per;
times[day].per = temp;
console.log(times);