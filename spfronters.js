//this does not include custom fronts because im lazy and dont want to code that.
//profile pictures have to be uploaded outside of simply plural for them to be shown. feel free to use ".fpfp {display:none;}" in your stylesheet to hide them or edit the html output directly

var fronters;
var frontMembers = [];
var imbed;
var token = "hqEEAVP3h6k+Lk8/xJZOt3zJyQcCAt+QWCZDyBwtdzVOsxFuNqzfH9u0AmCcjGR/" //replace this with a systems token. has to have read permissions enabled. this is the only thing you need to modify

function getFronters(){
    var frontCheck = new XMLHttpRequest;
    frontCheck.addEventListener("load", useFronters);
    frontCheck.open("GET", "https://api.apparyllis.com:8443/v1/fronters/");
    frontCheck.setRequestHeader("Authorization", token);
    frontCheck.send();

}

function useFronters(){
    console.log(this)
    fronters = JSON.parse(this.responseText);
    console.log(fronters)
    frontersToMembers();
}

function frontersToMembers() {
    for (let i = 0; i < Object.keys(fronters).length; i++) {
        getMembersData(fronters[i].content.uid, fronters[i].content.member)
    }
}

function getMembersData(uid, member){
    var getMembers = new XMLHttpRequest;
    getMembers.addEventListener("load", storeFronters);
    getMembers.open("GET", ("https://api.apparyllis.com:8443/v1/member/" + uid + "/" + member));
    getMembers.setRequestHeader("Authorization", token);
    getMembers.send();
}

function storeFronters(){
    console.log(this);
    frontMembers.push(JSON.parse(this.responseText));

    frontMembers.sort((a, b) => a.content.name.localeCompare(b.content.name));

    makeFronterElements(document.getElementById("spfronters"));
}

function makeFronterElements(imbed) {
    imbed.innerHTML = '';
    for (let i = 0; i < frontMembers.length; i++) {
        imbed.innerHTML += '<div class="frntr" "&' + frontMembers[i].content.name + '"><img class="fpfp" src="' + frontMembers[i].content.avatarUrl + '"><div class="nameprn"><div class="fname">' + frontMembers[i].content.name + '</div><div class="fprn">' + frontMembers[i].content.pronouns + '</div></div></div>';
        console.log(i);
        console.log(imbed.innerHTML);
    }
}

getFronters();

console.log(Object.keys(frontMembers).length)
