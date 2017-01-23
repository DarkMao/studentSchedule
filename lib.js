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
            tableHTML += generateTableHead(per);
            for (var i = 0; i < selected.length; i++) {
                if (selected[i].schedule[perFull]) {
                    tableHTML += ("<tr><th scope=\"row\">" +
                        selected[i].firstname + "</th><th>" + selected[i].lastname + "</th><th>" +
                        selected[i].grade + "</th><th></th><th>" + selected[i].schedule[perFull].subject +
                        "</th><th>" + selected[i].schedule[perFull].teacher +
                        "</th><th><button class=\"but\" " +
                        "data-id=\"" + selected[i].id + "\">X</button></th></tr>");
                }
                // console.log(table);
                // console.log(showPeriods);
            }
        }
        table.innerHTML = tableHTML + "</tbody>";
    });
}
