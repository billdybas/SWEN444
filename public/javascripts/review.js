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
    showBackButton();
    $("#backButton").one("click touch", function () {
        showHistoryPanels();
    });

    $("#panelView")[0].style.display = "none";
    $("#singleHistoryView")[0].style.display = "none";
    $("#reviewView")[0].style.display = "block";
    var jobInfo=jobHistory[index];
    $("#employer")[0].innerHTML=jobInfo.employerName;
}
var review = "";
function submitReview(){
    review = document.getElementById('reviewArea').value;
    showHistoryPanels();
}