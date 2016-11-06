/**
 * Created by Daniel on 11/3/2016.
 */
function highlightFace() {
    $('.face').click(function () {
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
    });
}

function reviewing(index){
    var jobInfo=jobHistory[index];
    $("#employer")[0].innerHTML=jobInfo.employerName;
}
