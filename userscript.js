// cookie functions
function getCookie(name) {
    var find = name + "=";
    var things = document.cookie.split("; ");
    for (let i = 0; i < things.length; i += 1) {
        var found = true;
        for (let j = 0; j < find.length; j += 1) {
            if (things[i][j] != find[j]) {
                found = false;
                break;
            }
        }
        if (found) {
            return things[i].split(find)[1]; // returns value
        }
    }
    return "";
}

function addCookie(name, value) {
    var expire = "expires=Fri, 3 Jan 3000 23:59:59 GMT";
    document.cookie = `${name}=${value}; ${expire};path=/`;
}

var friends = [];

$(document).ready(function() { // leaderboard stuff
    if ($("li.tab.active")[0].innerText == " Rankings") {
        friends = getCookie("friends").split("!fRiEnDs!");
        var insert = document.querySelector("#content-left > div");
        var elements = $("tbody")[0].children;
        
        // show live participants
        var lbLive = document.createElement("input");
        lbLive.setAttribute("type", "checkbox");
        var tag = document.createElement("label");
        tag.innerText = "Show Live Participants ";
        if ($("#" + elements[0].id + " > td.user-name > div").length !== 0) {
            insert.appendChild(lbLive);
            insert.appendChild(tag);
        }
        lbLive.checked = false;
        
        // private leaderboard
        var lbPrivate = document.createElement("input");
        var tag2 = document.createElement("label");
        lbPrivate.setAttribute("type", "checkbox");
        tag2.innerText = "Show Private Leaderboard ";
        insert.appendChild(lbPrivate);
        insert.appendChild(tag2);
        lbPrivate.checked = false;

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

// adding and removing friends
$(document).ready(function() {
    friends = getCookie("friends").split("!fRiEnDs!");
    if (!friends.includes($("span > b")[0].innerText)) {
        friends.push($("span > b")[0].innerText);
        addCookie("friends", friends.join("!fRiEnDs!"));
    }
    if ($("li.tab.active > a")[0].innerText == " About") {
        console.log(friends);
        var user = $("h2")[0].innerText;
        if (user !== "My account") {
            // add checkbox
            user = user.split("User ")[1];
            console.log(user);
            var isFriend = document.createElement("input");
            isFriend.setAttribute("type", "checkbox");
            var tag = document.createElement("label");
            tag.innerText = "Is Friend \n";
            var tmp = $("div.user-sidebar")[0];
            tmp.insertBefore(isFriend, tmp.children[5]);
            tmp.insertBefore(tag, tmp.children[6]);
            if (friends.includes(user)) {
                isFriend.checked = true;
            }
            isFriend.onclick = updateFriends; // update cookie commands
            
            function updateFriends() {
                if (isFriend.checked) addFriend();
                else removeFriend();
            }
            
            function addFriend() {
                friends = getCookie("friends").split("!fRiEnDs!");
                friends.push(user);
                addCookie("friends", friends.join("!fRiEnDs!"));
            }
        
            function removeFriend() {
                for (var i = 0; i < friends.length; i++) { 
                    if (friends[i] === user) { 
                        friends.splice(i, 1); 
                        i--; 
                    }
                }
                addCookie("friends", friends.join("!fRiEnDs!"));
            }
        }
    }
})
