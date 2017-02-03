$(document).ready(function(){
    var periods = ['A','B','C','D','E','F','G','FGrey','FRed','GGrey','GRed','Remove'];
    for(var x = 0; x< periods.length;x++){
        $('body').append(`<table id="table${periods[x]}" class="table table-striped"></table>`);
    }
})
