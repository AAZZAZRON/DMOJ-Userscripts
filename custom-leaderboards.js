// this userscript allows a user to add a customizable leaderboard to their contests page
// one can also see live participants as a separate leaderboard
// to customize the customizable leaderboard, simply write a user's handle in the variable "friends" (line 8)
// to see the leaderboard, simply click the checkbox on the rankings page


// put friend's DMOJ handles (case sensitive) in friends
var friends = [];

$(document).ready(function() {
    if ($("li.tab.active")[0].innerText == " Rankings") {
        var insert = document.querySelector("#content-left > div");
        
        // show live participants
        var lbLive = document.createElement("input");
        lbLive.setAttribute("type", "checkbox");
        var tag = document.createElement("label");
        tag.innerText = "Show Live Participants ";
        insert.appendChild(lbLive);
        insert.appendChild(tag);
        lbLive.checked = false;
        
        // private leaderboard
        var lbPrivate = document.createElement("input");
        var tag2 = document.createElement("label");
        lbPrivate.setAttribute("type", "checkbox");
        tag2.innerText = "Show Private Leaderboard ";
        insert.appendChild(lbPrivate);
        insert.appendChild(tag2);
        lbPrivate.checked = false;
        var elements = $("tbody")[0].children;

        // live
        lbLive.onclick = commands;
        
        // friends
        lbPrivate.onclick = commands;

        
        function commands() {
            if (lbLive.checked && lbPrivate.checked) {
                showLive();
                showLB();
                return;
            } 
            reset();
            if (lbLive.checked) showLive();
            else if (lbPrivate.checked) showLB();
        }
        
        function showLive() {
            for (var i = 0; i < elements.length ; i += 1) { // remove not live
                if ($("#" + elements[i].id + " > td.user-name > div")[0].innerText == "Participation ended.") elements[i].style.display = "none";
            }
        }
        
        function showLB() {
            for (var i = 0; i < elements.length ; i += 1) { // remove not friend users
                var user = elements[i].id.substring(5);
                if (!friends.includes(user)) elements[i].style.display = "none";
            }
        }
        
        function reset() {
            for (var i = 0; i < elements.length; i += 1) elements[i].style.display = "";
        }
    }
})
