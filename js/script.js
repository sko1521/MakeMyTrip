var jData = [];
$(document).ready(function () {
    $.getJSON("js/jso.json", function (data) {
        $.each(data.mmt, function (key, value) {
            jData.push(value);
        })
    });
});
document.getElementById('single').addEventListener("click", enableReturn);
document.getElementById('double').addEventListener("click", enableReturn);
document.getElementById('frm').addEventListener("blur", errCheck);
document.getElementById('to').addEventListener("blur", errCheck);
document.getElementById('frm').addEventListener("focus", getFlight);
document.getElementById('searchForm').addEventListener("submit", function (event) { event.preventDefault(); getData(); });
document.getElementById('userForm').addEventListener("submit", function (event) { event.preventDefault(); saveUserData(); });
document.getElementById('frm').addEventListener("click", removeErr);
document.getElementById('to').addEventListener("click", removeErr);
document.getElementById('depart').addEventListener("click", removeErr);
function errCheck() {
    var holder = document.getElementById(this.id);
    from = document.getElementById('frm').value.toLowerCase();
    to = document.getElementById('to').value.toLowerCase();
    var url, flag = 0;
    if (this.id == "frm") {
        var url, flag = 0;
        $.each(jData, function (idx, o) {
            if (from.toLowerCase() == this.from.toLowerCase()) {
                flag = 1;
            }
        });
        if (flag == 0) {
            document.getElementById('errFrom').innerHTML = "please select correct flight";
            document.getElementById('errFrom').style.color = "red";
        }
    }
    else if (this.id == "to") {
        var url, flag = 0;
        $.each(jData, function (idx, o) {
            if (to.toLowerCase() == this.to.toLowerCase()) {
                flag = 1;
            }
        });
        if (flag == 0) {
            document.getElementById('errTo').innerHTML = "please select correct flight";
            document.getElementById('errTo').style.color = "red";
        }
    }
}
function enableReturn() {
    if (this.id == "single") {
        document.getElementById('return').disabled = true;
    }
    if (this.id == "double") {
        document.getElementById('return').disabled = false;
    }
}
function removeErr() {
    if (this.id == "frm") {
        document.getElementById('errFrom').innerHTML = "";
        document.getElementById('errFlight').innerHTML = "";
    }
    if (this.id == "to") {
        document.getElementById('errTo').innerHTML = "";
        document.getElementById('errFlight').innerHTML = "";
    }
    if (this.id == "depart") {
        document.getElementById('errFlight').innerHTML = "";
    }
}
var dDate;
var aDate;
var way;
function getData() {
    var col = [];
    var time = [];
    var fare, fareRound;
    var timeRound = [];
    dDate = document.getElementById('depart').value;
    aDate = document.getElementById('return').value;
    way = document.getElementById('single').value;
    if (document.getElementById('single').checked) {
        way = document.getElementById('single').value;
    }
    else {
        way = "roundtrip";
    }
    if (document.getElementById("frm").value == "" || document.getElementById("to").value == "") {
        document.getElementById('errFlight').innerHTML = "Source / Destinations should not be empty";
        document.getElementById('errFlight').style.color = "red";
    }
    else if (document.getElementById("frm").value == document.getElementById("to").value) {
        document.getElementById('errFlight').innerHTML = "Source and Destinations should not be same";
        document.getElementById('errFlight').style.color = "red";
    }
    else {

        if (way == "oneway") {
            if (dDate == "") {
                document.getElementById('depart').focus();
                document.getElementById('errFlight').innerHTML = "Date should not be empty";
                document.getElementById('errFlight').style.color = "red";
            }
            else {
                col = ["from", "to", "depart", "time", "fare", "book"];
                for (var i = 0; i < jData.length; i++) {
                    if (from == jData[i].from.toLowerCase() && to == jData[i].to.toLowerCase()) {
                        time = jData[i].time;
                        fare = jData[i].fare;
                    }
                }
                colVal = [from, to, dDate, " ", fare, "<input type='radio' class='bookSelection' name='bookOneway'>"];
                var mytable = document.createElement('table');
                for (var i = 0; i < col.length; i++) {
                    var th = document.createElement('th');
                    th.innerHTML = col[i];
                    th.style.backgroundColor = "gray";
                    mytable.appendChild(th);

                }
                for (var i = 0; i < time.length; i++) {
                    var tr = mytable.insertRow(i);
                    colVal[3] = time[i];
                    for (var j = 0; j < colVal.length; j++) {
                        var td = document.createElement('td');
                        td.innerHTML = colVal[j];
                        tr.appendChild(td);
                    }
                }
                mytable.appendChild(tr);
                var sbtn = document.createElement('button');
                var sbtn = document.createElement('button');
                sbtn.setAttribute('class', 'resBtn');
                sbtn.innerHTML = "Book";
                mytable.appendChild(tr);
                mytable.style.border = "none";
                var divContainer = document.getElementById("result");
                divContainer.innerHTML = "";
                divContainer.appendChild(mytable);
                divContainer.appendChild(sbtn);
                sbtn.addEventListener('click', roundtripInfo);
            }

        }
    }
    if (way == "roundtrip") {
        if (dDate == "" || aDate == "") {
            document.getElementById('depart').focus();
            document.getElementById('errFlight').innerHTML = "Date should not be empty";
            document.getElementById('errFlight').style.color = "red";
        }
        else {
            col = ["from", "to", "depart", "time", "fare", "book"];
            var frmRound = to;
            var toRound = from;
            for (var i = 0; i < jData.length; i++) {
                if (from == jData[i].from.toLowerCase() && to == jData[i].to.toLowerCase()) {
                    time = jData[i].time;
                    fare = jData[i].fare;
                }
            }

            for (var i = 0; i < jData.length; i++) {
                if (frmRound == jData[i].from.toLowerCase() && toRound == jData[i].to.toLowerCase()) {
                    timeRound = jData[i].time;
                    fareRound = jData[i].fare;
                }
            }
            colVal = [from, to, dDate, " ", fare, "<input type='radio' class='bookSelection' name='bookOne'>"];
            colValRound = [frmRound, toRound, aDate, " ", fareRound, "<input type='radio' class='bookSelection' name='bookRound'>"];
            for (var i = 0; i < jData.length; i++) {
                if (frmRound == jData[i].from.toLowerCase() && toRound == jData[i].to.toLowerCase()) {
                    var mytable = document.createElement('table');
                    var mytable2 = document.createElement('table');
                    for (var i = 0; i < col.length; i++) {
                        var th = document.createElement('th');
                        th.innerHTML = col[i];
                        th.style.backgroundColor = "gray";
                        mytable.appendChild(th);
                    }
                    for (var i = 0; i < col.length; i++) {
                        var th = document.createElement('th');
                        th.innerHTML = col[i];
                        th.style.backgroundColor = "gray";
                        mytable2.appendChild(th);
                    }
                    for (var j = 0; j < time.length; j++) {
                        var tr = mytable.insertRow(j);
                        colVal[3] = time[j];
                        for (var m = 0; m < colVal.length; m++) {
                            var td = document.createElement('td');
                            td.innerHTML = colVal[m];
                            tr.appendChild(td);
                        }

                    }

                    for (var k = 0; k < timeRound.length; k++) {
                        var tr = mytable2.insertRow(k);
                        colValRound[3] = timeRound[k];
                        for (var j = 0; j < colVal.length; j++) {
                            var td = document.createElement('td');
                            td.innerHTML = colValRound[j];
                            tr.appendChild(td);
                        }

                    }
                    mytable.appendChild(tr);
                    mytable.style.border = "none";
                    var divContainer = document.getElementById("result");
                    divContainer.innerHTML = "";
                    divContainer.appendChild(mytable);
                    mytable2.appendChild(tr);
                    mytable2.style.border = "none";
                    divContainer.appendChild(mytable2);
                    var sbtn = document.createElement('button');
                    sbtn.setAttribute('class', 'resBtn');
                    sbtn.innerHTML = "Book";
                    divContainer.appendChild(sbtn);
                    sbtn.addEventListener('click', roundtripInfo);
                }
            }
        }
    }
    return false;
}
function getFlight() {
    var url, src, dest;
    var ids = [];
    var idsTo = [];
    var clean = [];
    var cleanTo = [];
    $.each(jData, function (idx, o) {
        if ($.inArray(o.from, ids) == -1) {
            ids.push(o.from);
            clean.push(o.from);
        }
        if ($.inArray(o.to, idsTo) == -1) {
            idsTo.push(o.to);
            cleanTo.push(o.to);
        }
        var options = '';
        var options2 = '';
        for (var i = 0; i < clean.length; i++) {
            options += '<option value="' + clean[i] + '" />';
            document.getElementById('src').innerHTML = options;
        }
        for (var i = 0; i < cleanTo.length; i++) {
            options2 += '<option value="' + cleanTo[i] + '" />';
            document.getElementById('dest').innerHTML = options2;
        }
    });
}
$(function () {
    $('#return').datepicker({
        minDate: new Date()
    });
    $('#depart').datepicker({
        minDate: new Date(),
        onSelect: function () {
            var selectedDate = $(this).datepicker("getDate");
            $('#return').datepicker('option', 'minDate', selectedDate);
        }
    });
});


function roundtripInfo() {
    
    var myTripdata = document.querySelectorAll("input[type=radio]");
    var list = [];
    var total = 0;
    var counter = 0;
    for (var i = 2; i < myTripdata.length - 2; i++) {
        if (myTripdata[i].checked) {
            counter++;
        }
    }
    if (counter == 2 || counter == 1) {
        document.getElementById('formData').style.display = "none";
        document.getElementById('result').style.display = "none";
        document.getElementById('uInfo').style.display = "block";
        for (var i = 2; i < myTripdata.length - 2; i++) {
            if (myTripdata[i].checked) {
                var row = myTripdata[i].parentNode.parentNode;
                var l = "<ul class='list'>" +
                    "<li class='list'> From : " + row.children[0].innerHTML + "</li><li class='list'>" + "To : " + row.children[1].innerHTML + "</li> <li class='list'> Date : " + row.children[2].innerHTML + "</li><li class='list'> Time : " + row.children[3].innerHTML + "</li><li class='list'> Fare : " + row.children[4].innerHTML + "</li>" +
                    "</ul>";
                total += parseInt(row.children[4].innerHTML);
                list.push(l);
                document.getElementById('rData').innerHTML = list.join("<span class='returnJourneySpan'>Arrival</span>");
            }
        }
        document.getElementById('totalFare').innerHTML = "Your total Fare is :" + total + " " + "INR";

    }
    else {
        alert("No flight Selected");
    }
    return false;
}

var userInfo = [];
function saveUserData() {
    var txtPattern = /^[a-zA-Z][a-zA-Z\\s]+$/;
    var emPattern = /^[\w]+([\.]?[\w]+)?@[\w]+\.(com|net|org)$/;
    var nmPattern = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    var uName=document.getElementById('nm').value;
    var uEmail=document.getElementById('em').value;
    var uNo=document.getElementById('no').value;
    var gen="";
    if (document.getElementById('genderM').checked) {
        gen="Male";
    }
    else if (document.getElementById('genderF').checked) {
        gen="Female";
    }

    if(uEmail==""||uNo==""){
        document.getElementById('errEmpty').innerHTML="All fields are mandatory!!"
        errEmpty.style.color="yellow";
    }
    else if (!txtPattern.test(uName)) {
        if (uName== "") {
            errEmpty.innerHTML = "Name cannot be blank.";
            errEmpty.style.color="yellow";
        } 
        else {
            errEmpty.innerHTML = "Name must contain Characters only.";
            errEmpty.style.color="yellow";
        }

    }
       else if (!emPattern.test(uEmail)) {
        if (uEmail == "") {
            errEmpty.innerHTML = "Email cannot be blank.";
            errEmpty.style.color="yellow";
        } else {
            errEmpty.innerHTML = "Email format is wrong.";
            errEmpty.style.color="yellow";
        }
    }

      else if (!nmPattern.test(uNo)) {
        if (uNo == "") {
            errEmpty.innerHTML = "No. cannot be blank.";
            errEmpty.style.color="yellow";
        } else {
            errEmpty.innerHTML = "Number format is wrong.";
            errEmpty.style.color="yellow";
        }
    }

    else{
    document.getElementById('ticketGen').style.display="block";
    document.getElementById('name').innerHTML=uName;
    document.getElementById('num').innerHTML=uNo;
    document.getElementById('uGen').innerHTML=gen;
    document.getElementById('uInfo').style.display="none";
    }
}


