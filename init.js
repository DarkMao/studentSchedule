$(document).ready(function(){
    var periods = ['A','B','C','D','E','F','G','FGrey','FRed','GGrey','GRed','Remove'];
/*    var title = ['First Name','Last Name','Grade', 'Room', 'Class','Teacher'];
    for(var x = 0 ; x , title.length; x++){
        $('body').append()
    }
    <table id="table" class="table table-striped">
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Grade</th>
            <th>Room</th>
            <th>Class</th>
            <th>Teacher</th>
        </tr>
    </table>*//*    var title = ['First Name','Last Name','Grade', 'Room', 'Class','Teacher'];
    for(var x = 0 ; x , title.length; x++){
        $('body').append()
    }
    <table id="table" class="table table-striped">
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Grade</th>
            <th>Room</th>
            <th>Class</th>
            <th>Teacher</th>
        </tr>
    </table>*/
    for(var x = 0; x< periods.length;x++){
        $('body').append(`<table id="table${periods[x]}" class="table table-striped"></table>`);
    }
})
