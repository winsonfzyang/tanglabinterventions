// Set Date
const TODAY = new Date();
const DD = String(TODAY.getDate()).padStart(2, '0');
const MM = String(TODAY.getMonth() + 1).padStart(2, '0');
const YYYY = TODAY.getFullYear();
const DATE = YYYY + MM + DD;

var welcome = {};

// ----------------------- function to start the task ------------------
welcome.run = function() {
    document.getElementById("welcome").innerHTML =
        welcome.section.header +
        welcome.section.demographics;
};

// ------------- actions to take at the end of each click ----------------
welcome.click = {};
welcome.click.start = function() {
    welcome.helpers.setDisplay('start', 'none');
    welcome.helpers.setDisplay('demographics', '');
    welcome.helpers.setHeader(' ');
};
welcome.click.demographics = function() {
    daynumber = welcome.helpers.getRadioButton("day");
    if(daynumber == "NA"){
        alert("Please select a day!");
    } else {
        welcome.helpers.setDisplay("demographics", "none");
        welcome.helpers.setDisplay("header", "none");
        jsPsych.data.addProperties({  // record the condition assignment in the jsPsych data
            ID: document.getElementById("partID").value,
            ID_DATE: document.getElementById("partID").value + "_" + DATE,
            daynumber: welcome.helpers.getRadioButton("day"),
            gender: welcome.helpers.getRadioButton("gender"),
            age: document.getElementById("age").value
        });
        start_Stroop();
    }
};


// ------------- html for the various sections ----------------
welcome.section = {};
welcome.section.header =
    '<!-- ####################### Heading ####################### -->' +
    '<a name="top"></a>' +
    '<h1 style="text-align:center; width:1200px" id="header" class="header">' +
    '   &nbsp; Working Memory Project</h1>';

welcome.section.demographics =
    '	<!-- ####################### Consent ####################### -->' +
    '	<div class="demographics" style="width:1000px">' +
    '		<!-- Text box for the splash page -->' +
    '		<div class="demographics" style="text-align:left; border:0px solid; padding:10px;  width:800px; font-size:90%; float:right">' +
    '			<!-- Explanatory text -->' +
    '           <p font-size:110%><b>Demographic information:</b></p>' +
    '			<!-- ID/Name -->' +
    '           <label for="partID"><b>ID: &nbsp;</b></label><input id="partID" name="partID" /><br/><br/>' +
    '			<!-- Gender -->' +
    '           <label for="gender"><b>Gender: &nbsp;</b></label>' +
    '           <input type="radio" name="gender" value="male" /> Male &nbsp; ' +
    '           <input type="radio" name="gender" value="female" /> Female &nbsp;' +
    '           <input type="radio" name="gender" value="other" /> Other<br/><br/>' +
    '			<!-- Age -->' +
    '           <label for="age"><b>Age: &nbsp;</b></label><input id="age" name="age" /><br/><br/>' +
    '			<!-- Day Number -->' +
    '           <label for="day"><b>Day Number: &nbsp;</b></label>' +
    '           <input type="radio" name="day" value="Pre-test" /> Pre-test &nbsp; ' +
    '           <input type="radio" name="day" value="Post-test" /> Post-test &nbsp;' +
    '           <br/><br/>' +
    '		<br><br>' +
    '		<!-- Demographics  button -->' +
    '        <p align="center">' +
    '                <input type="button" class="demographics jspsych-btn"' +
    '                        id="demographicsButton" value="Next >"' +
    '                       onclick="welcome.click.demographics()"></p>' +
    '		</div>' +
    '   </div>';

// ----------------------- helper functions ------------------

welcome.helpers = {};
welcome.helpers.getRadioButton = function(name) { // get the value of a radio button
    var i, radios = document.getElementsByName(name);
    for (i = 0; i < radios.length; i = i + 1) {
        if (radios[i].checked) {
            return (radios[i].value);
        }
    }
    return ("NA");
};
welcome.helpers.setDisplay = function(theClass, theValue) { // toggle display status
    var i, classElements = document.getElementsByClassName(theClass);
    for (i = 0; i < classElements.length; i = i + 1) {
        classElements[i].style.display = theValue;
    }
};
welcome.helpers.setVisibility = function(theClass, theValue) { // toggle visibility
    var i, classElements = document.getElementsByClassName(theClass);
    for (i = 0; i < classElements.length; i = i + 1) {
        classElements[i].style.visibility = theValue;
    }
};
welcome.helpers.setHeader = function(theValue) { // alter the header
    document.getElementById("header").innerText = theValue;
};