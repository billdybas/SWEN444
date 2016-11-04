/**
 * Created by Daniel on 11/3/2016.
 */
function highlightFace() {
    $('.face').click(function () {
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
    });
}
