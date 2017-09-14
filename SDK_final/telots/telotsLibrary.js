//renderLEC is the main class which the library user will call in HTML code, the function of this class is to call an object of another class according to the LEC type provided by the user, it also recieves the parameters given by the user i.e lecType, LecId, DivId. 
class renderLEC {
  /* lecType is the type of learning environment component. Ex: Dialog box, MCQ etc
  LecId is the identifier of data in the JSON file.
  DivId is the identifier of <div> in HTML where the LEC has to be rendered.
  */
  
  constructor(lecType, LecId, DivId)
  {
    switch(lecType)
    {
      case  "questionPrompt":
      new renderLECQuestionPrompt(lecType, LecId, DivId);
      break;
      case "dialogBox":
      new renderLECDialogBox(lecType, LecId, DivId);
      break;
      case "questionPosing":
      new renderLECQuestionPosing(lecType, LecId, DivId);
      break;
    }
  }
}


//Library Component id #0001; Author: Divyanshu Pandey; Mentors: Shitanshu Mishra, Prajish Prashad, Kavya Alse; release date: 27-JUNE-2017
//************************************************************* Starts *********************************************************************

//Question Prompt

//renderLECQuestionPrompt take the parameters from class renderLEC and renders the json data provided by the user corresponding to lecType and LecId.
class renderLECQuestionPrompt {
  constructor(lecType, LecId, DivId)
  {
    this.lectype = lecType;
    this.lecid = LecId;
    this.divid = DivId;
    this.readJSONQuestionPrompt();
  }

  //read json data corresponding to lecType and LecId, stores the fetched data in variable JSONDataSetObjQuestionPrompt, then pass the value of JSONDataSetObjQuestionPrompt by calling the function 'afterJSONLoadedQuestionPrompt' of class JSONDataSetQuestionPrompt
  readJSONQuestionPrompt()
  {
    var lecType=this.lectype;
    var lecId =this.lecid;
    var divId =this.divid;
    var JSONDataSetObjQuestionPrompt = new JSONDataSetQuestionPrompt("","","","","");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200)
      {
       this.myObj = JSON.parse(this.responseText);
       JSONDataSetObjQuestionPrompt.question = this.myObj[lecType][lecId]["question_stem"];
       JSONDataSetObjQuestionPrompt.options = this.myObj[lecType][lecId]["options"];
       JSONDataSetObjQuestionPrompt.val = this.myObj[lecType][lecId]["val"];
       JSONDataSetObjQuestionPrompt.msg = this.myObj[lecType][lecId]["msg"];
       JSONDataSetObjQuestionPrompt.choice_id = this.myObj[lecType][lecId]["choice_id"];
           // this.qpObj = new QuestionPrompt1(this.question1,this.options,this.val,this.msg,this.choice_id);

           // this.qpObj.text();
           JSONDataSetObjQuestionPrompt.afterJSONLoadedQuestionPrompt(JSONDataSetObjQuestionPrompt,divId);
      }  
      //Only successful retrieval of file is handled right now. Error cases need to be handled.
    };

       xmlhttp.open("GET", "contents/contents.json", true);
       xmlhttp.send();
  }
}

//recieves the variable JSONDataSetObjQuestionPrompt when data from json is fully loaded, then object of class questionPrompt is called, passing the values JSONDataSetObjQuestionPrompt and divId.
class JSONDataSetQuestionPrompt {
  afterJSONLoadedQuestionPrompt(JSONDataSetObjQuestionPrompt,divId)
  {
    this.qpObj = new questionPrompt(JSONDataSetObjQuestionPrompt,divId);
  }
}  


//recieves the value from JSONDataSetQuestionPrompt and component is generated in the function generateQuestionPrompt().
class questionPrompt{
  constructor(JSONDataSetObjQuestionPrompt,divId){
      this.JSONDataSetObjQuestionPrompt= JSONDataSetObjQuestionPrompt;
      this.generateQuestionPrompt(divId);
  }  
  //generation of component take place here, objects of sub-classes 'QuestionStemQuestionPrompt, OptionQuestionPrompt, FeedbackQuestionPrompt' are called.
  generateQuestionPrompt(divId){
      this.question = new questionStemQuestionPrompt(this.JSONDataSetObjQuestionPrompt.question);
      this.option = new optionQuestionPrompt(this.JSONDataSetObjQuestionPrompt.options);
      var q = document.getElementById(divId);
      q.innerHTML = "<h4>"+this.question.questionText + "</h4>";
      for ( var i = 0; i<this.JSONDataSetObjQuestionPrompt.options.length; ++i)
      {
        var msg = this.JSONDataSetObjQuestionPrompt.msg[i];
        q.innerHTML += "<input type='radio'  name =' "+ this.JSONDataSetObjQuestionPrompt.choice_id + "' value= ' " +this.JSONDataSetObjQuestionPrompt.val[i] + "' onclick=\"(new feedbackQuestionPrompt().radioChangeQuestionPrompt('"+(msg)+"','"+(divId)+"'))\">" + this.option.optionText[i] + "<br><br>";
      } 
      q.innerHTML+= '<div id="'+divId+'Feedback"></div>';
    }

  }

//question text is stored in constructor function of this class, so that question text can be reused.
class questionStemQuestionPrompt{
  constructor(p){
       this.questionText=p;
  }
}


//options is stored in constructor function of this class, so that options can be reused.
class optionQuestionPrompt{
  constructor(q){
      this.optionText=q;
      this.option = new feedbackQuestionPrompt();
  }
}

//whenever an option is clicked an feedback corresponding to that option appears, that feedback text is stored in constructor function of this class, so that feedback text can be reused.
class feedbackQuestionPrompt{

  radioChangeQuestionPrompt(msg,divid){
      var q = document.getElementById(divid+"Feedback");
      q.innerHTML =msg;

  }
}
//************************************************************* Ends *********************************************************************







//Library Component id #0002; Author: Divyanshu Pandey; Mentors: Shitanshu Mishra, Prajish Prashad, Kavya Alse; release date: 14-JULY-2017
//************************************************************* Starts *********************************************************************

//Dialog Box

//renderLECDialogBox take the parameters from class renderLEC and renders the json data provided by the user corresponding to lecType and LecId.
class renderLECDialogBox {
  constructor(lecType, LecId, DivId)
  {
    this.lectype = lecType;
    this.lecid = LecId;
    this.divid = DivId;

    this.readJSONDialogBox();
  }

  //read json data corresponding to lecType and LecId, stores the fetched data in variable JSONDataSetObjDialogBox, then pass the value of JSONDataSetObjDialogBox by calling the function 'afterJSONLoadedDialogBox' of class JSONDataSetDialogBox.
  readJSONDialogBox()
  {
    var lecType=this.lectype;
    var lecId =this.lecid;
    var divId =this.divid;

    var JSONDataSetObjDialogBox = new JSONDataSetDialogBox("","","","");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200)
      {
       this.myObj = JSON.parse(this.responseText);
       JSONDataSetObjDialogBox.dialogbox_Text = this.myObj[lecType][lecId]["dialogbox_Text"];
       JSONDataSetObjDialogBox.dialogbox_Background = this.myObj[lecType][lecId]["dialogbox_Background"];
       JSONDataSetObjDialogBox.dialogbox_Image = this.myObj[lecType][lecId]["dialogbox_Image"];
       JSONDataSetObjDialogBox.dialogbox_ButtonText = this.myObj[lecType][lecId]["dialogbox_ButtonText"];

       JSONDataSetObjDialogBox.afterJSONLoadedDialogBox(JSONDataSetObjDialogBox,divId);
      }          
    };

   xmlhttp.open("GET", "contents/contents.json", true);
   xmlhttp.send();
 }
}

//recieves the variable JSONDataSetObjDialogBox when data from json is fully loaded, then object of class dialogBox is called, passing the values JSONDataSetObjDialogBox and divId.
class JSONDataSetDialogBox {
  afterJSONLoadedDialogBox(JSONDataSetObjDialogBox,divId)
  {
   this.qpObj = new dialogBox(JSONDataSetObjDialogBox,divId);
  }
}  

//recieves the value from JSONDataSetDialogBox and component is generated in the function generateDialogBox().
class dialogBox{
  constructor(JSONDataSetObjDialogBox,divId){
   this.JSONDataSetObjDialogBox= JSONDataSetObjDialogBox;
   this.generateDialogBox(divId);
  }

  //generation of component take place here, objects of sub-classes 'dialogBoxText, dialogBoxBackground, dialogBoxImage' are called.
  generateDialogBox(divId){
   this.dialogboxtext = new dialogBoxText(this.JSONDataSetObjDialogBox.dialogbox_Text);
   this.dialogboxbackground = new dialogBoxBackground(this.JSONDataSetObjDialogBox.dialogbox_Background);
   this.dialogboximage = new dialogBoxImage(this.JSONDataSetObjDialogBox.dialogbox_Image);

   var q = document.getElementById(divId);
   q.innerHTML= '<div class="dialogbox_button"><button id="dialogBox_Btn" class="btn btn-primary">Open DialogBox</button></div>\
   <div class="dialogBox" id="dialogBox">'+this.dialogboxbackground.backgroundDialogBox()+'<div class="dialogBox-body">\
   '+this.dialogboximage.imageDialogBox()+' '+this.dialogboxtext.dialogBoxText+'</div> \
   <div class="button"><input type="button" value="'+this.JSONDataSetObjDialogBox.dialogbox_ButtonText+'" id="dialogBox-closeButton">\
   </div></div></div>';


   var dialogBox = document.getElementById("dialogBox");
   var dialogBoxbtn = document.getElementById("dialogBox_Btn");
   var dialogBoxCloseButton = document.getElementById("dialogBox-closeButton");
   // When the user clicks the button, open the dialogBox 
   dialogBoxbtn.onclick = function() {
    dialogBox.style.display = "block";
   }

   // When the user clicks on close button, close the dialogBox
   dialogBoxCloseButton.onclick = function() {
    dialogBox.style.display = "none";
   }

   // When the user clicks anywhere outside of the dialogBox, close the dialogBox
   window.onclick = function(event) {
    if (event.target == dialogBox) {
     dialogBox.style.display = "none";
    }
   }
  }
}

//dialogBox text is stored in constructor function of this class, so that dialogBox text can be reused.
class dialogBoxText{
  constructor(dialogBoxText){
   this.dialogBoxText=dialogBoxText;
  }
}

//dialogBox Background image name is stored in constructor function of this class and whole image is stored in function backgroundDialogBox(), so that dialogBox background can be reused.
class dialogBoxBackground{
  constructor(dialogBoxBackground){
   this.dialogBoxBackground=dialogBoxBackground;
  }
  backgroundDialogBox(){
   return'<div class="dialogBox-content" style= "background-image: url(contents/images/'+this.dialogBoxBackground+');><span class="close"></span>';
  }
}

//dialogBox image name is stored in constructor function of this class and whole image is stored in function imageDialogBox(), so that dialogBox image can be reused.
class dialogBoxImage{
  constructor(dialogBoxImage){
   this.dialogBoxImage=dialogBoxImage;
  }
  imageDialogBox(){
   return '<div class="dialogBox-image"><img style="height: 100%;  width: 100%;" src="contents/images/'+this.dialogBoxImage+'"></div>';
  }
}
//************************************************************* Ends *********************************************************************









//Library Component id #0003; Author: Divyanshu Pandey; Mentors: Shitanshu Mishra, Prajish Prashad, Kavya Alse; release date: 14-JULY-2017
//************************************************************* Starts *****************************************************************

//Question Posing

//renderLECQuestionPosing take the parameters from class renderLEC and renders the json data provided by the user corresponding to lecType and LecId.
class renderLECQuestionPosing {
  constructor(lecType, LecId, DivId)
  {
    this.lectype = lecType;
    this.lecid = LecId;
    this.divid = DivId;
    this.readJSONQuestionPosing();
  }

  //read json data corresponding to lecType and LecId, stores the fetched data in variable JSONDataSetObjQuestionPosing, then pass the value of JSONDataSetObjQuestionPosing by calling the function 'afterJSONLoadedQuestionPosing' of class JSONDataSetQuestionPosing.
  readJSONQuestionPosing()
  {
    var lecType=this.lectype;
    var lecId =this.lecid;
    var divId =this.divid;
    var JSONDataSetObjQuestionPosing = new JSONDataSetQuestionPosing("","","","");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200)
      {
        this.myObj = JSON.parse(this.responseText);
        JSONDataSetObjQuestionPosing.questionPosingSituation_Link = this.myObj[lecType][lecId]["questionPosingSituation_Link"];
        JSONDataSetObjQuestionPosing.questionPosingBox_Text1 = this.myObj[lecType][lecId]["questionPosingBox_Text1"];
        JSONDataSetObjQuestionPosing.questionPosingBox_Placeholder = this.myObj[lecType][lecId]["questionPosingBox_Placeholder"];
        JSONDataSetObjQuestionPosing.questionPosingBox_Text2 = this.myObj[lecType][lecId]["questionPosingBox_Text2"];

        JSONDataSetObjQuestionPosing.afterJSONLoadedQuestionPosing(JSONDataSetObjQuestionPosing,divId);
      }          
    };
    xmlhttp.open("GET", "contents/contents.json", true);
    xmlhttp.send();
  }
}

//recieves the variable JSONDataSetObjQuestionPosing when data from json is fully loaded, then object of class QuestionPosing is called, passing the values JSONDataSetObjQuestionPosing and divId.
class JSONDataSetQuestionPosing {
  afterJSONLoadedQuestionPosing(JSONDataSetObjQuestionPosing,divId)
  {
   this.qpObj = new questionPosing(JSONDataSetObjQuestionPosing,divId);
  }
}  

//recieves the value from JSONDataSetQuestionPosing and component is generated in the function generateQuestionPosing().
class questionPosing{
  constructor(JSONDataSetObjQuestionPosing,divId){
    this.JSONDataSetObjQuestionPosing= JSONDataSetObjQuestionPosing;
    this.divId=divId;
    this.generateQuestionPosing();
  }

  //generation of component take place here, objects of sub-classes 'questionPosingSituation, questionAuthoringTool, questionLog' are called.
  generateQuestionPosing(){
    this.questionPosingframe = new questionPosingSituation(this.JSONDataSetObjQuestionPosing.questionPosingSituation_Link);
    this.questionPosingbox = new questionAuthoringTool(this.JSONDataSetObjQuestionPosing.questionPosingBox_Text1,this.JSONDataSetObjQuestionPosing.questionPosingBox_Placeholder,this.JSONDataSetObjQuestionPosing.questionPosingBox_Text2);
    this.questionLog = new questionLog();

    var q = document.getElementById(this.divId);

    q.innerHTML= '<div class="QuestionPosing_Body">'+this.questionPosingframe.questionPosingFrame()+'\
    '+this.questionPosingbox.questionPosingBox()+'</div>'+this.questionLog.questionLogList()+'';


    //storing data to database after clicking submit button.
    var submitData = document.getElementById('SubmitButton');
    submitData.onclick = function() {
      var data = document.getElementById('questions').value;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
        }
      };
      xhttp.open("GET", "http://localhost/SDK_final/files/questionPosing/questionposing.php?question="+data, true);
      xhttp.send();

      document.getElementById('questions').value="";
    }


    // Get the modal that displays Questions Submitted. 
    var modal = document.getElementById('QuestionSubmitted_Modal');

    // Get the button that opens the Questions Submitted modal.
    var btn = document.getElementById("Questions_logList");

    // When the user clicks the Questions Submitted button, retrieve data from database and open the modal. 
    btn.onclick = function() {

    //retreving data from database after clicking questions submitted button.
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
     var recieveData = this.responseText; 
     document.getElementById("dataList").innerHTML= recieveData;
     }
    };
    xhttp.open("GET", "files/questionPosing/QuestionSubmitted.php", true);
    xhttp.send();

    // after loading the data Open the questions submitted modal.
    modal.style.display = "block";
    }

    // When the user clicks anywhere outside of the modal, close it.
    window.onclick = function(event) {
     if (event.target == modal) {
     modal.style.display = "none";
     }
    }
  }
}

//Question posing stituation can be text, video, slide etc, questionPosing stituation link is stored in constructor function of this class and the whole frame is stored in function questionPosingFrame(), so that questionPosing stituation can be reused.
class questionPosingSituation{
  constructor(questionPosingSituationLink){
    this.questionPosingSituationLink=questionPosingSituationLink;
  }
  questionPosingFrame(){
    return '<div ><iframe src="'+this.questionPosingSituationLink+'" class="questionPosingFrame" frameborder="1" allowfullscreen1> </iframe></div>';
  }
}

//Question authoring tool is a place where user can type there question and submit it, it takes the questions data and store in the database through AJAX calling, questionPosing AuthoringTool texts are stored in constructor function of this class and the whole authoring tool is stored in function questionPosingBox(), so that questionPosing AuthoringTool can be reused.
class questionAuthoringTool{
  constructor(questionPosingBoxText1,questionPosingBoxPlaceholder,questionPosingBoxText2){
    this.questionPosingBoxText1=questionPosingBoxText1;
    this.questionPosingBoxPlaceholder=questionPosingBoxPlaceholder;
    this.questionPosingBoxText2=questionPosingBoxText2;
  }

  questionPosingBox(){
    return '<div class="QuestionPosingBox">'+this.questionPosingBoxText1+'<div>\
    <textarea class="QuestionPosing_textbox"  name="qText" id="questions"  placeholder="'+this.questionPosingBoxPlaceholder+'" ></textarea><br/><div class="questionPosing_Submit"><button type="button" class="btn btn-primary" id="SubmitButton" >Submit</button></div>\
    <div class="QuestionPosingBox_Text2">'+this.questionPosingBoxText2+'</div>';
  }
}

//question log is a place where one can view the question that has been submitted through question authoring tool, it retrieves the questions data from the database through AJAX call and stored in the function questionLogList() of this class, so that question log can be reused.
class questionLog{
  questionLogList(){
    return '<button class="submittedQuestions_Button" id="Questions_logList">Questions Submitted<br>click here to see the list</button>\
    <div id="QuestionSubmitted_Modal" class="QuestionSubmitted_modal"><div class="QuestionSubmittedModal-content"><div class="QuestionSubmittedModal-body" id="dataList">  </div></div></div>';
  }
}

