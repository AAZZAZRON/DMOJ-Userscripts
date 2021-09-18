// remove editorials
$(document).ready(function() {
    if (window.location.href.includes("/problem/") && $('.info-float > div')[3].innerText == 'Read editorial') {
        $('.info-float > div')[3].remove();
        $('.info-float > hr')[1].remove();
        console.log("Yes editorial");
    } else {
        console.log("No editorial");
    }
})
