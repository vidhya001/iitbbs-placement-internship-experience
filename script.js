
// variable for the backend
var mailID="";
var mail_msg="";
var mailId_last_string="@iitbbs.ac.in";
var otp=""
  
//  ===== function to check_mail_and_send_OTP_fun
function check_mail_and_send_OTP_fun(){ 
    console.log("checking mail and sending OTP")
mailID=getInputVal('mailId');

// check maid id if iitbbs or not
var mailId_len=mailID.length 
var this_mailId_last_string=mailID.substr(mailId_len-13,mailId_len)
//   console.z log(this_mailId_last_string)

if(mailId_len>13 && mailId_last_string==this_mailId_last_string){
document.getElementById('loaderAnime').style.display='block';
mail_msg="<h style='color:blue'>Processing request...</h>";
document.getElementById('loginResultId').innerHTML= mail_msg
      setTimeout(function(){ 
          document.getElementById('loaderAnime').style.display='none';
          mail_msg="<h style='color:green'>OTP has been sent your mail</h>";
          document.getElementById('loginResultId').innerHTML= mail_msg;          
          }, 1000);  
mailOTP(mailID) 

}
else{
document.getElementById('loaderAnime').style.display='block';
mail_msg="<h style='color:blue'>Processing request...</h>";
document.getElementById('loginResultId').innerHTML= mail_msg
      setTimeout(function(){ 
          document.getElementById('loaderAnime').style.display='none';
          document.getElementById('loginResultId').innerHTML="<h style='color:red'>Please verify your mail or Enter your IIT BBS mail correctly</h>"        
          }, 1000);  
}
}
  
 // =========== function to send MAIL ========
function mailOTP(mailID){

  //  console.log("sending otp")
    var createdOTP=Math.random() 
    createdOTP=createdOTP*1000000
    var rem=createdOTP%1
    createdOTP=createdOTP-rem    
    otp=createdOTP
    // console.log(otp)

    // Mailing OTP    
    var htmlMailMsgPart1='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>OTP Mail Body</title><!-- <link rel="stylesheet" href="mailbodycss.css"> --><style>#mailheading{color:darkblue;font-weight: bold;}#otpline{font-size: 20px;}#otp{font-size:23px;color:red;font-weight: bolder;}#mailbody{background-color:transparent; border: 10px solid black;border-radius: 50px;margin: 20px;padding: 50px;align-content: center;}#visitbtn{background-color: rgb(231, 229, 229);color:green;font-size: 20px;font-weight: bold;border-radius: 5px;}#visitbtn:hover{background-color: white;}#thanks{font-size: 15px;}</style></head><body><div id="mailbody"><p>Hi '
    
    var mailLen=mailID.length 
    var mailidpart=mailID.substr(0,mailLen-13)
    
    var htmlMailMsgPart2=mailidpart+',<br><br>Greetings from</p><h id="mailheading">IIT BBS PLACEMENT INTERNSHIP EXPERIENCE PORTAL</h><br><p id="otpline">Your One Time Password(OTP) is <span id="otp">'

    var t = new Date();
    t="time : "+t
    var htmlMailMsgPart3='</span></p><p>Login '+t
          
    var htmlMailMsgPart4='</p><p id="tagline">If you had not made this request, please dont share this OTP with anyone and ignore</p><br><br><p id="thanks">Thank you <br><br>IIT BBS P&I Portal</p><a href="https://iitbbs-placement-internship-experience.000webhostapp.com/"><button id="visitbtn">Visit Portal</button></a></div></body></html>'

    Email.send({
        Host : "smtp.gmail.com",
        Username : "placementinternshipexperience@gmail.com",
        Password :  "Pwd@1234",
        To : mailID,
        From : "placementinternshipexperience@gmail.com",
        Subject : "OTP - IIT BBS Placement Internship experience portal",
        Body :htmlMailMsgPart1 +htmlMailMsgPart2+ otp +htmlMailMsgPart3+ htmlMailMsgPart4
    }).then(       
    );    
      document.getElementById('otpBlock').style.display='block';
      document.getElementById('otpSubmitBtnId').style.display='block';
      document.getElementById('mailSubmitBtnId').style.display='none';
}

//  ====== function to CHECK OTP ===========
function checkOTP(){
  var enteredOTP=getInputVal('otp')
  if(otp==enteredOTP){
    
    document.getElementById('loaderAnime').style.display='block';
    mail_msg="<h style='color:green'>OTP Matched...Signing in...</h>";
    document.getElementById('loginResultId').innerHTML= mail_msg
    addUserLogin(mailID)   
    setTimeout(function(){ 
          document.getElementById('loaderAnime').style.display='none';            
          document.getElementById('mailInFormId').innerHTML= mailID;
          document.getElementById('mailInFormId').placeholder= mailID;
          document.getElementById('main-menu').style.display='block';
          document.getElementById('mailLoginBlock').style.display='none';
          }, 1000);  

  }else{
    document.getElementById('loaderAnime').style.display='block';
    mail_msg="<h style='color:blue'>Processing request...</h>";
    document.getElementById('loginResultId').innerHTML= mail_msg
      setTimeout(function(){ 
          document.getElementById('loaderAnime').style.display='none';
          mail_msg="<h style='color:red'>Wrong OTP! Please verify your OTP</h>"
          document.getElementById('loginResultId').innerHTML= mail_msg;    
          }, 1000);  
  } 
}
  
// ------------ fire base functions -------  
var firebaseConfig = {
    apiKey: "AIzaSyApcTgAoNkVYd5h6GwMt9PVydJKxUIrZPs",
    authDomain: "experiencedb-ffaa0.firebaseapp.com",
    databaseURL: "https://experiencedb-ffaa0.firebaseio.com",
    projectId: "experiencedb-ffaa0",
    storageBucket: "experiencedb-ffaa0.appspot.com",
    messagingSenderId: "10142497495",
    appId: "1:10142497495:web:aef024560e2134a25dce92",
    measurementId: "G-G0ET1Q3CRG"
};
  
  
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database=firebase.database(); 
var placementRef = database.ref('placement')
var internshipRef=database.ref('internship')
var loginActivityRef=database.ref('activity')
  
// function to add LOGIN USER into DB  
function addUserLogin(mailID){
  var t = new Date();
  userActivityData={
    userMail:mailID,
    loginTime:"time -> "+t
  }
  loginActivityRef.push(userActivityData)
}

// function for WRITE EXPERIENCE button
function writeExperience(){
  setTimeout(function(){
      document.getElementById('main-menu').style.display='none';
      document.getElementById('loaderAnime').style.display='none';
      document.getElementById('mainHeading').style.display='none';
      document.getElementById('smallheading').style.display='block';
      document.getElementById('expform').style.display='block';
      document.getElementById('submainResults').innerHTML="Experience sharing Form";
      
  },1000);
  document.getElementById('loaderAnime').style.display='block';
}

// function for GO HOME 
function goHome(){
  setTimeout(function(){
      document.getElementById('main-menu').style.display='block';
      document.getElementById('loaderAnime').style.display='none';
      document.getElementById('mainHeading').style.display='block';
      document.getElementById('smallheading').style.display='none';
      document.getElementById('expform').style.display='none';
      document.getElementById('results').style.display='none';
      // document.getElementById('submainResults').innerHTML="Experience sharing Form";
      
  },1000);
  document.getElementById('loaderAnime').style.display='block';
}
 
// function for ADDING EXPERIENCE before going to DB ====== 
function addExperience(){

  var type =""
  var ele=document.getElementsByName('type'); 
              
  for(i = 0; i < ele.length; i++) { 
      if(ele[i].checked) {
      type=ele[i].value; 
      }
  }

  if(type=="internship" || type=="placement"){    
  }else{alert("Please fill the INTERNSHIP or PLACEMENT column");return}

  var name=getInputVal('nameFormId')
  if(name.length==0){alert("Please fill your NAME"); return}

  var email =mailID

  var branch=getInputVal('branchFormId') 
  if(branch.length==0){alert("Please fill your BRANCH"); return}

  var cgpa =getInputVal('cgpaFormId')
  if(cgpa.length==0){alert("Please fill your CGPA"); return}

  var yearOfGraduation = getInputVal('graduationYear')
  if(yearOfGraduation.length==0){alert("Please fill the GRADUATION YEAR"); return} 

  var companyPlacedIn =getInputVal('companyFormId')
  if(companyPlacedIn.length==0){alert("Please fill the COMPANY NAME"); return}
  
  var profileOffered =getInputVal('profileFormId')
  if(profileOffered.length==0){alert("Please fill the PROFINE OFFERED"); return}

  var procedure = getInputVal('procedureFormId')
  if(procedure.length==0){alert("Please fill the PROCEDURE"); return}

  var onlineTest =getInputVal('onlineTestFormId')
  if(onlineTest.length==0){alert("Please fill the ONLINE TEST PATTERN"); return}

  var experience=getInputVal('interveiwExpFormId')
  if(experience.length==0){alert("Please fill the INTERVEIW EXPERIENCE"); return}

  var links=getInputVal('linksFormId')

  var topicsConcentrated =getInputVal('topicsConcentratedFormId')
  if(topicsConcentrated.length==0){alert("Please fill the TOPICS CONCENTRATED ON"); return}

  var suggestionsToJuniors=getInputVal('suggestionsFormId')
  if(suggestionsToJuniors.length==0){alert("Please fill the SUGGESTIONS TO JUNIORS"); return}

  var linkedin= getInputVal('linkedinURLFormId')
  if(linkedin.length==0){alert("Please fill the LINKEDIN PROFILE URL"); return}

  var contactNumber=getInputVal('contactNumberFormId')


  var resumelink = getInputVal('ResumeURLFormId')
  if(resumelink.length==0){alert("Please fill the Link to your RESUME"); return}

  

  addExperienceIntoDB()

}

// ===== function for addding the data to DB =====
function addExperienceIntoDB(){

  var entireHtmlCode =""
  var type =""
  var ele=document.getElementsByName('type'); 
              
  for(i = 0; i < ele.length; i++) { 
      if(ele[i].checked) {
      type=ele[i].value; 
      }
  }

  var name=getInputVal('nameFormId') 
  var email =mailID
  var cgpa =getInputVal('cgpaFormId') 
  var branch=getInputVal('branchFormId') 
  var profileOffered =getInputVal('profileFormId')
  var company =getInputVal('companyFormId')
  var companylower=company
  var procedure = getInputVal('procedureFormId')
  var onlineTest =getInputVal('onlineTestFormId')
  var experience=getInputVal('interveiwExpFormId')
  var links=getInputVal('linksFormId')
  var topicsConcentrated =getInputVal('topicsConcentratedFormId')
  var suggestionsToJuniors=getInputVal('suggestionsFormId')   
  var linkedin= getInputVal('linkedinURLFormId')
  var contactNumber=getInputVal('contactNumberFormId')
  var yearOfGraduation = getInputVal('graduationYear')
  var resumelink = getInputVal('ResumeURLFormId')
  var t= new Date();

 companylower=companylower.toLowerCase();
 var companysorted=""
 for(var i=0;i<companylower.length;i++){
   if(companylower[i]!=' '){
     companysorted=companysorted+companylower[i];
   }
 }

var procedureSorted=""
for(var i=0;i<procedure.length;i++){
  if(procedure[i]=='\n'){
    procedureSorted=procedureSorted+" "
  }else{
    procedureSorted=procedureSorted+procedure[i]
  }
}

var onlineTestSorted=""
for(var i=0;i<onlineTest.length;i++){
  if(onlineTest[i]=='\n'){
    onlineTestSorted=onlineTestSorted+" "
  }else{
    onlineTestSorted=onlineTestSorted+onlineTest[i]
  }
}

var experienceSorted=""
for(var i=0;i<experience.length;i++){
  if(experience[i]=='\n'){
    experienceSorted=experienceSorted+" "
  }else{
    experienceSorted=experienceSorted+experience[i]
  }
}


var topicsConcentratedSorted=""
for(var i=0;i<topicsConcentrated.length;i++){
  if(topicsConcentrated[i]=='\n'){
    topicsConcentratedSorted=topicsConcentratedSorted+" "
  }else{
    topicsConcentratedSorted=topicsConcentratedSorted+topicsConcentrated[i]
  }
}


var suggestionsToJuniorsSorted=""
for(var i=0;i<suggestionsToJuniors.length;i++){
  if(suggestionsToJuniors[i]=='\n'){
    suggestionsToJuniorsSorted=suggestionsToJuniorsSorted+" "
  }else{
    suggestionsToJuniorsSorted=suggestionsToJuniorsSorted+suggestionsToJuniors[i]
  }
}

var linksbtns=""
var linksSorted=""
var eachLinkArray=[]
for(var i=0;i<links.length;i++){
  if("https"== links.substr(i, 5)){
    var j=i;
    var eachlinkstring="";
    while(links[j]!='\n' && links[j]!=" "  && j<links.length){
      eachlinkstring=eachlinkstring+links[j];
      j++;
    }
    linksSorted=linksSorted+eachlinkstring+"*";
  linksbtns=linksbtns+"<a href="+eachlinkstring+" target='_blank'><button class='questionLinkbtn'>Related Link</button></a>"    
  }
}    
           
  var html2="<div class='show2'><b>Related links :</b><br>"           
            
   html2=html2+linksbtns+"</div>"         
           
  var captype="Placement";
  if(type=="internship"){
    captype="Internship"
  }
  var entireHtmlCode =""
  var html1="<div class='actualResult'><div class='oneShow'><p class='show1'>"+captype +" at <b>"+company +"</b></p><p class='show1'>Role : "+profileOffered+"</p><p class='show1'>Name : <b>"+name+"</b></p><span class='show3'>"+branch+" </span><span class='show3'>"+cgpa+"</span><span class='show3'>"+yearOfGraduation+" graduate</span><p class='show2'><b>Procedure : </b><br>"+procedureSorted+"</p><p class='show2'><b>Online test :</b><br>"+onlineTestSorted+"</p><p class='show2'><b>Interveiw Experience :</b><br>"+experienceSorted+"</p>"

  var html3="<p class='show2'><b>Topics Concentrated on :</b><br>"+topicsConcentratedSorted+"</p><p class='show2'><b>Suggestion to juniors :</b><br>"+suggestionsToJuniorsSorted+"</p><span class='show4'><a href=mailto:"+email+"><button class='questionLinkbtn'>Mail Id</button> </a>"

  var html4="<a href=tel:"+contactNumber+"><button class='questionLinkbtn'>Contact Number</button></a>"
  var html5="<a href="+linkedin+" target='_blank'><button class='questionLinkbtn'>LinkedIn URL</button> </a>"
  var html6="<a href="+resumelink+" target='_blank'><button class='questionLinkbtn'>Link to resume</button> </a>"

  var html7="</span></div></div>"

  entireHtmlCode=html1+html2+html3+html4+html5+html6+html7

  setTimeout(function(){ 

  var experienceResponseData={
    name:name,
    email:email,
    branch:branch,
    cgpa:cgpa,
    yearOfGraduation:yearOfGraduation,
    type:type,
    profileOffered:profileOffered,
    company:company,
    companysorted:companysorted,    
    procedure:procedureSorted,
    onlineTest:onlineTestSorted,
    interviewExperience:experienceSorted,
    linksSorted:linksSorted,    
    linksactual:links, 
    topicsConcentrated:topicsConcentratedSorted,
    suggestionsToJuniors:suggestionsToJuniorsSorted,
    linkedin:linkedin,
    contactNumber:contactNumber,
    timeOfFilling:"time ->" +t,
    resumelink:resumelink,
    htmlcode:entireHtmlCode
  }
  
  if(type=="internship"){
    console.log("Internship experience recorded") 
      internshipRef.push(experienceResponseData)
  }else{
    console.log("Placement experience recorded")
      placementRef.push(experienceResponseData)

  }
  
  document.getElementById('submainResults').innerHTML="Experience recorded";
  document.getElementById('loaderAnime').style.display='none';  

  setTimeout(function(){
    
    setTimeout(function(){
      // document.getElementById('experienceFormResult').style.display='block';
      document.getElementById('expsubmittedid').innerHTML="Redirecting you to home page...";
      document.getElementById('loaderAnime').style.display='block';
      
      setTimeout(function(){
        // document.getElementById('experienceFormResult').style.display='block';
        document.getElementById('experienceFormResult').style.display='none';
        document.getElementById('main-menu').style.display='block';
        document.getElementById('loaderAnime').style.display='none'; 
        document.getElementById('mailSubmitBtnId1').style.display='none';                  
        
      },2000);
      
    },4000);

    document.getElementById('experienceFormResult').style.display='block';
    document.getElementById('mainHeading').style.display='block';
    document.getElementById('smallheading').style.display='none';
    document.getElementById('expform').style.display='none';
  },1000);

  document.getElementById('expform').style.display='none';

  },2000);

  document.getElementById('expform').style.display='none';
  document.getElementById('submainResults').innerHTML="Processing your request...";
  document.getElementById('loaderAnime').style.display='block';  
} 

// ========= function for getting VALUE by ID ======
function getInputVal(id){
  return document.getElementById(id).value;
}  
//  
function bodyloadfun(){
  loadPlacementHeaderMsg();
  loadInternsipHeaderMsg();
}
    
// function for getting Placement Header =====
function readExperience(){
  setTimeout(function(){
      document.getElementById('main-menu').style.display='none';
      document.getElementById('loaderAnime').style.display='none';
      document.getElementById('mainHeading').style.display='none';
      document.getElementById('smallheading').style.display='block';
      document.getElementById('results').style.display='block';
      
      
  },1000);
  document.getElementById('loaderAnime').style.display='block';
}

function showResultMsg(type,company){
  document.getElementById('submainResults').innerHTML="Showing <b>"+type+"</b> results of <b>"+company +"</b>";
  setTimeout(function(){      
      document.getElementById('loaderAnime').style.display='none';      
  },1000);
  document.getElementById('loaderAnime').style.display='block';
}


var placementHeaderMsg="";
function loadPlacementHeaderMsg(){

placementHeaderMsg="";

placementHeaderMsg="<div id='resultsHeader'><h  id='searchtext'>Search By Company</h><select name='searchedCompany' id='searchedpCompany'> <option value='All Companies'>All companies</option>"

var placementCompaniesList=["All Companies"]
placementRef.once("value")
    .then(function (snapshot){
        snapshot.forEach(function(childSnapshot){
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
            if(placementCompaniesList.indexOf(childData.company)==-1){
                placementCompaniesList.push(childData.company)
                placementHeaderMsg=placementHeaderMsg+'<option value='+childData.companysorted+'>'+childData.company+'</option>'                    
            }
        });
        var lastMsg="</select><button id='searchBtnId' onclick='SearchCompanyPlacement()'>Go</button></div>"
placementHeaderMsg=placementHeaderMsg+lastMsg
placementCompaniesList=["All Companies"]
        });        
}

// function for internship header ======
var internshipHeaderMsg="";
function loadInternsipHeaderMsg(){

internshipHeaderMsg=""; 

internshipHeaderMsg="<div id='resultsHeader'><h  id='searchtext'>Search By Company</h><select name='searchedCompany' id='searchediCompany'> <option value='All Companies'>All companies</option>"

var internshipCompaniesList=["All Companies"]
internshipRef.once("value") 
    .then(function (snapshot){
        snapshot.forEach(function(childSnapshot){        
        var key = childSnapshot.key;
        var childData = childSnapshot.val();

            if(internshipCompaniesList.indexOf(childData.company)==-1){
                internshipCompaniesList.push(childData.company)
                internshipHeaderMsg=internshipHeaderMsg+'<option value='+childData.companysorted+'>'+childData.company+'</option>'                    
            }
        });
        var lastMsg="</select><button id='searchBtnId' onclick='SearchCompanyInternship()'>Go</button></div>"
// console.log(internshipHeaderMsg)
internshipHeaderMsg=internshipHeaderMsg+lastMsg
internshipCompaniesList=["All Companies"]
        });        

}
  
//   functions for loading all data 

var intershipMessage=""

function loadAllDataInternship(){
bodyloadfun();
// loadInternsipHeaderMsg();
readExperience();
showResultMsg("Internship","All Companies")

var eachInternMessage="";
internshipRef.once("value")
        .then(function (snapshot){
            snapshot.forEach(function(childSnapshot){  
            var eachInternMessage="";
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            

            var html=childData.htmlcode;
            // console.log(html)
            
            intershipMessage=html+intershipMessage
            });           

        });   
        
        setTimeout(function(){
        // console.log(internshipHeaderMsg)
        document.getElementById('results').innerHTML ="" + internshipHeaderMsg + intershipMessage
        intershipMessage=""     
        },1000);
        
}

var placementMessage=""

function loadAllDataPlacement(){
bodyloadfun();
// loadPlacementHeaderMsg();
readExperience();
showResultMsg("Placement","All Companies")

var eachPlacementMessage="";
placementRef.once("value")
        .then(function (snapshot){
            snapshot.forEach(function(childSnapshot){
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            var html=  childData.htmlcode;  
            placementMessage=html+placementMessage
            });            
        });    
        
        setTimeout(function(){
        // console.log(placementMessage)
        document.getElementById('results').innerHTML=placementHeaderMsg+placementMessage
        placementMessage=""   
        },1000);
}
  
//

function SearchCompanyInternship(){



//  loadInternsipHeaderMsg();

var interncompany=document.getElementById('searchediCompany').value
showResultMsg("Internship",interncompany)
console.log(interncompany)

if(interncompany=="All Companies"){
  loadAllDataInternship();
  return
}

internshipRef.once("value")
        .then(function (snapshot){
            snapshot.forEach(function(childSnapshot){  
            var eachInternMessage="";
            var key = childSnapshot.key;
            var childData = childSnapshot.val();            
            var html=childData.htmlcode;
            // console.log(html)

            if(interncompany==childData.companysorted){
              showResultMsg("Internship",childData.company)
                intershipMessage=html+intershipMessage
            }            
            
            });           

        });   
        
        setTimeout(function(){
        // console.log(internshipHeaderMsg)
        document.getElementById('results').innerHTML =internshipHeaderMsg + intershipMessage
        intershipMessage=""     
        },1000);
        
}


  
function SearchCompanyPlacement(){

//  loadInternsipHeaderMsg();

var placementcompany=document.getElementById('searchedpCompany').value
showResultMsg("Placement",placementcompany)
console.log(placementcompany)

if(placementcompany=="All Companies"){
  loadAllDataPlacement();
  return
}

placementRef.once("value")
        .then(function (snapshot){
            snapshot.forEach(function(childSnapshot){  
            
            var key = childSnapshot.key;
            var childData = childSnapshot.val();            
            var html=childData.htmlcode;
            // console.log(html)
            
            if(placementcompany==childData.companysorted){
              showResultMsg("Placement",childData.company)
                placementMessage=html+placementMessage
            }            
            
            });           

        });   
        
        setTimeout(function(){
        // console.log(internshipHeaderMsg)
        document.getElementById('results').innerHTML = placementHeaderMsg + placementMessage
        placementMessage=""     
        },1000);
        
}
