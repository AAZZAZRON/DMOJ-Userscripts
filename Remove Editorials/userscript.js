// remove editorials
$(document).ready(function() {
    if (window.location.href.includes("/problem/") && $('.info-float > div')[3].innerText == 'Read editorial') { // if you have submissions
        $('.info-float > div')[3].remove();
        $('.info-float > hr')[1].remove();
        console.log("Yes editorial");
    } else if (window.location.href.includes("/problem/") && $('.info-float > div')[2].innerText == 'Read editorial') { // if you don't have submissions
        $('.info-float > div')[2].remove();
        $('.info-float > hr')[1].remove();
        console.log("Yes editorial");   
    } else {
        console.log("No editorial");
    }
})
