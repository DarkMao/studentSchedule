/* global per */

//perString will be "A", "B", etc.. or "ALL"
function generateTables(perString,namesGrades,selected) {
    var periodsToGenerate = [];
    if (perString !== "ALL")
    {
        periodsToGenerate = [perString];
    } else {
        periodsToGenerate = ['A','B','C','D','E','F','G','FGrey','FRed','GGrey','GRed'];
    }
    
    //may god have mercy on our souls for this garbage
    // per ==> "A","B",etc
    // perFull = "perA","perB",etc
    periodsToGenerate.forEach(function(per){
        var perFull = 'per' + per;
        var tableHTML = "<tbody>";
        var table = $("#table" + per)[0];
        if (showPeriods[perFull]) {
            console.table(selected);
            selected.sort(function (a, b){
                var class1 = perFull in a.schedule ? a.schedule[perFull].subject : "";
                var class2 = perFull in b.schedule ? b.schedule[perFull].subject : "";
                return class1 > class2 ? 1 : -1;
            });
            console.table(selected);
            tableHTML += generateTableHead(per);
            for (var i = 0; i < selected.length; i++) {
                if (selected[i].schedule[perFull]) {
                    var key = selected[i].schedule[perFull].subject+selected[i].schedule[perFull].teacher;
                    console.log(key);
                    tableHTML += ("<tr><td scope=\"row\">" +
                        selected[i].firstname + "</td><td>" + selected[i].lastname + "</td><td>" +
                        selected[i].grade + "</td><td>"+dir[key]+"</td><td>" + selected[i].schedule[perFull].subject +
                        "</td><td>" + selected[i].schedule[perFull].teacher +
                        "</td><td><button class=\"but\" " +
                        "data-id=\"" + selected[i].id + "\">X</button></td></tr>");
                }
                // console.log(table);
                // console.log(showPeriods);
            }
        }
        table.innerHTML = tableHTML + "</tbody>";
    });
}
