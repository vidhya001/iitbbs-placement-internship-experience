function fun(){
    console.log("hola")
  }
  
  // variable for the backend
  var mailID="";
  var mail_msg="";
  var mailId_last_string="@iitbbs.ac.in";
  var otp=""
  
  // check_mail_and_send_OTP_fun
  function check_mail_and_send_OTP_fun(){ 
  mailID=getInputVal('mailId');
  
  // check maid id if iitbbs or not
  var mailId_len=mailID.length 
  var this_mailId_last_string=mailID.substr(mailId_len-13,mailId_len)
  console.log(this_mailId_last_string)
  
  if(mailId_last_string==this_mailId_last_string){
  mail_msg="OTP has been sent your mail "+mailID;
  document.getElementById('result').innerHTML= mail_msg
  // OTP mailing function
  mailOTP(mailID) 
  
  }
  else{
  // error showing mail not matched
  mail_msg="Please enter your bbs mail"
  document.getElementById('result').innerHTML= mail_msg
  
  }
  
  }
  
  
  function mailOTP(mailID){
  
     console.log("sending otp")
      var createdOTP=Math.random() 
      createdOTP=createdOTP*1000000
      var rem=createdOTP%1
      // console.log(createdOTP)
      // console.log(rem)
      createdOTP=createdOTP-rem    
      otp=createdOTP
      // console.log(otp)
  
      // Mailing OTP    
      
      Email.send({
          Host : "smtp.gmail.com",
          Username : "placementinternshipexperience@gmail.com",
          Password :  "Pwd@1234",
          To : mailID,
          From : "placementinternshipexperience@gmail.com",
          Subject : "OTP",
          Body : "Your OTP -" + otp
      }).then(
        // message => alert("OTP send to "+ mailID)
        console.log("Mailed OTP - " + otp)
      );    
  
  }
  
  function checkOTP(){
    var enteredOTP=getInputVal('otp')
    if(otp==enteredOTP){
      mail_msg="signing in"
      document.getElementById('result').innerHTML= mail_msg
  
      addUserLogin(mailID) 
  
    }else{
      mail_msg="wrong OTP please verify your mail"
      document.getElementById('result').innerHTML= mail_msg
    } 
  }
  
  
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
  
  function addUserLogin(mailID){
    var t = new Date();
    userActivityData={
      userMail:mailID,
      loginTime:"time -"+t
    }
    loginActivityRef.push(userActivityData)
  }
  
  function submit_experience(){
  var type =""
   var ele=document.getElementsByName('type'); 
               
   for(i = 0; i < ele.length; i++) { 
       if(ele[i].checked) {
       type=ele[i].value; 
       }
   }
   var name=getInputVal('name') 
   var email =getInputVal('mail') 
   var cgpa =getInputVal('cgpa') 
   var profileOffered =getInputVal('Profile')
   var companyPlacedIn =getInputVal('Company')
   var procedure = getInputVal('procedure')
   var onlineTest =getInputVal('online_test')
   var experience=getInputVal('interview_experience')
   var suggestionsToJuniors=getInputVal('suggestions')
   var topicsConcentrated =getInputVal('topics_concentrated')
   var linkedin= getInputVal('LinkedinURL')
   var contactNumber=getInputVal('contactNumber')
  
  
   var experienceResponseData={
     name:name,
     email:email,
     cgpa:cgpa,
     type:type,
     profileOffered:profileOffered,
     company:companyPlacedIn,
     procedure:procedure,
     onlineTest:onlineTest,
     interviewExperience:experience,
     suggestionsToJuniors:suggestionsToJuniors,
     topicsConcentrated:topicsConcentrated,
     linkedin:linkedin,
     contactNumber:contactNumber
   }
  
   if(type=="internship"){
     console.log("Internship experience recorded") 
      internshipRef.push(experienceResponseData)
   }else{
     console.log("Placement experience recorded")
      placementRef.push(experienceResponseData)
   }
   
   
  } 
  
  
  function getInputVal(id){
    return document.getElementById(id).value;
  }  
  
  var displayMessage="";
  var displayHeaderInternMessage='Search By company here : <input type="text" name="companySearch" id="internCompanySearch"><button onclick="loadSearchByInternCompany()">Go</button>'
  var intershipMessage=""
  
  
  function loadAllDataInternship(){
    var eachInternMessage="";
    internshipRef.once("value")
         .then(function (snapshot){
              snapshot.forEach(function(childSnapshot){
              eachInternMessage="";
              var key = childSnapshot.key;
              var childData = childSnapshot.val();
                // console.log(childData.name)
                eachInternMessage="<h>intern responce</h><br>Name :"+childData.name+"<br>company name :"+childData.company+"<br><hr>"
                intershipMessage=eachInternMessage+intershipMessage
             });
            
            console.log(intershipMessage)
            document.getElementById('experience_output_div').innerHTML=displayHeaderInternMessage+intershipMessage
            intershipMessage=""
         });    
        
  }
  
  var intershipSearchMessage="" 
  function loadSearchByInternCompany(){
    console.log("loadSearchByInternCompany")
    var companyName=getInputVal('internCompanySearch')
    var eachSearchInternMessage="";
    internshipRef.once("value")
         .then(function (snapshot){
              snapshot.forEach(function(childSnapshot){
              eachSearchInternMessage="";
              var key = childSnapshot.key;
              var childData = childSnapshot.val();
                // console.log(childData.name)
                if(childData.company==companyName)
                {eachSearchInternMessage="<h>intern responce</h><br>Name :"+childData.name+"<br>company name :"+childData.company+"<br><hr>"
                intershipSearchMessage=eachSearchInternMessage+intershipSearchMessage
                }
                
             });
            
            console.log(intershipSearchMessage)
            document.getElementById('experience_output_div').innerHTML=displayHeaderInternMessage+intershipSearchMessage
            intershipSearchMessage=""
         });    
        
  }
  
  
  
  var placementMessage=""
  var displayHeaderPlacementMessage='Search By company here : <input type="text" name="companySearch" id="placementCompanySearch"><button onclick="loadSearchByPlacementCompany()">Go</button>'
  
  function loadAllDataPlacement(){
    var eachPlacementMessage="";
    placementRef.once("value")
         .then(function (snapshot){
              snapshot.forEach(function(childSnapshot){
              var key = childSnapshot.key;
              var childData = childSnapshot.val();
                 eachPlacementMessage="<h>placement responce</h><br>Name :"+childData.name+"<br>company name :"+childData.company+"<br><hr>"
                placementMessage=eachPlacementMessage+placementMessage
             });
            
            console.log(placementMessage)
            document.getElementById('experience_output_div').innerHTML=displayHeaderPlacementMessage+placementMessage
            placementMessage=""
         });    
  }
  
  var placementSearchMessage="" 
  function loadSearchByPlacementCompany(){
    var companyName=getInputVal('placementCompanySearch')
    var eachPlacementMessage="";
    placementRef.once("value")
         .then(function (snapshot){
              snapshot.forEach(function(childSnapshot){
              eachPlacementMessage="";
              var key = childSnapshot.key;
              var childData = childSnapshot.val();
                // console.log(childData.name)
                if(childData.company==companyName)
                {eachPlacementMessage="<h>intern responce</h><br>Name :"+childData.name+"<br>company name :"+childData.company+"<br><hr>"
                placementSearchMessage=eachPlacementMessage+placementSearchMessage
                }           
             });
            
            console.log(placementSearchMessage)
            document.getElementById('experience_output_div').innerHTML=displayHeaderPlacementMessage+placementSearchMessage
            placementSearchMessage=""
         });    
        
  }
  
  