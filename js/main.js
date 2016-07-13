//check whether or not namespace exist
var MyApp = MyApp || {};

//create my app namespace
var MyApp = (function(){

  //private method
  var _doCalculations = function(val) {

    var result = "0";
        displayTempVal = $(".display-result").val(),
        checkInsertedValue = _validateInputs(val),
        checkCurrentValueOnScreen = _validateInputs(displayTempVal),
        checkLastDisplayChar = _validateInputs(displayTempVal.slice(-1)),
        checkFirstDigitInput = _validateInputs(displayTempVal.charAt(0)),
        errorTarget = "error-message";

    _clearErrorMessage(errorTarget);

    //check what funncion is being used
    //invoke save maths function
    if(val === "S" || val === "s" ){
        _saveMaths(displayTempVal);
        result = displayTempVal;
    }
    //invoke cancel operation function - clear calculator screen
    else if(val === "C" || val === "c"){
        _clear();
    }
    else if(displayTempVal === "0"){

      //if equal symbol is pressed when 0 is being displayed, then clear calculator screen
      if(val === "="){
        _clear();
      }
      else{
        //if second zero is inserted then clear screen - not possible function
        if(val === "0"){
          _clear();
        }
        //need to allow decimal operations
        else if(val !== "0" && checkInsertedValue.validateOperation){
          //display negative operator as first thing when the user wants to start with a negative number
          if(val === "-"){
            result = val;
          }
          else
            result = displayTempVal + val;
        }
        else{ //if it's a number then remove the iniial 0
          result = val;
        }
      }
    }
    //handles the equal opertator
    else if(val === "="){

      //input has to start with a number - check that
      if(checkFirstDigitInput.validateNumbers){

        //check if the operation inserted is valid and evaluate it
        if(_checkMathsValidity(displayTempVal.slice(-1), val)){
          result = eval(displayTempVal);
        }
        else{
           result = _errorMessageConsecutiveOperator(displayTempVal);
        }
      }
      //if string is longer than one char and last char is a number then evaluate it
      else if((checkCurrentValueOnScreen.countStringCharacters > 1) && (checkLastDisplayChar.validateNumbers)){
        result = eval(displayTempVal);
      }
      else{
        result = _errorMessageConsecutiveOperator(displayTempVal);
      } 
    }

    //check other allowed chars inserted
    else{

      //input has to start with a number - check that
      if(checkFirstDigitInput.validateNumbers){

        //check if string is longer than one char
        if(checkCurrentValueOnScreen.countStringCharacters > 1){

          //check if more than one operator has been inserted - double operators it's not valid
          result = _checkConsecutiveOperators(displayTempVal,val);
        }
        else{
          result = displayTempVal + val;
        }

      }
      //if input starts with negatibe symbol then it's allowed
      else if(displayTempVal.charAt(0) === '-'){

        //check if more than one operator has been inserted - double operators it's not valid
        result = _checkConsecutiveOperators(displayTempVal,val);
      }
      //if the result is infinity or NaN then reset the calculator with the new value entered
      else if(displayTempVal === "Infinity" || displayTempVal === "NaN"){
        result = val;
      }
      else{  
        var errorMessage = "Input should start with a number";
        _validationError(errorMessage);
        result = "0";
      }
    }
    _display(result);
  };


  //private method - displays the current result
  var _display = function(val) {
    $(".display-result").val(val);
  };


  //private method - clear calculator screen
  var _clear = function() {
    $(".display-result").val("0");
  };


  //private method - check if two consecutive operators are inserted and throw error
  var _checkConsecutiveOperators = function(displayTempVal, newInsertedVal){

    var result = "";

    //check if the operation inserted is valid and evaluate it
    if(_checkMathsValidity(displayTempVal.slice(-1), newInsertedVal)){
       result = displayTempVal + newInsertedVal;
    }
    else{
       result = _errorMessageConsecutiveOperator(displayTempVal);
    }
    return result;
  };


  //private method - throw error when two consecutive operators are inserted
  var _errorMessageConsecutiveOperator = function(displayTempVal){
   
    var result = displayTempVal,
        errorMessage = "Double operators use not valid";

    _validationError(errorMessage);
    return result;
  }


  //private method - it shows customise error messages
  var _validationError = function (errorMessage) {
     $(".error-message").html(errorMessage).fadeIn();
  };


  //private method - clear selected error message section 
  var _clearErrorMessage = function(errorTarget) {
    //clear eventual error messages if exist
    if(!$('.'+errorTarget+':empty').length) {
      $('.'+errorTarget).empty().hide();
    } 
  };


  //private method - shows error in modal window
  var _errorMessageModalWindow = function(errorMessage){
     $('.modal-message').html(errorMessage).fadeIn();
     $('.modal-get-maths').val("");  
  }


  //private method - checks if the last and new inserted values are a valid combination
  var _checkMathsValidity = function(lastInput, newInput) {

    var checkLastResult = _validateInputs(lastInput),
        checkNewVal = _validateInputs(newInput);
  
    if((checkLastResult.validateNumbers === true) && (checkNewVal.validateNumbers === true)){
      return true;
    }else if((checkLastResult.validateNumbers === true) && (checkNewVal.validateOperation === true)){
      return true;
    }else if((checkLastResult.validateOperation === true) && (checkNewVal.validateNumbers == true)){
      return true;
    }
    else false;   
  };


  //private method - handles the maths submit event and input validation in modal window
  var _submitMaths = function(val) {

      var mathsName = $('.modal-get-maths').val(),
          mathsValue = $('.display-result').val(),
          $target = $('.saved-maths-box__list'),
          checkMathsName = _validateInputs(mathsName);

      //validates maths name inserted - no special chars allowed and 25 chars max
      if(checkMathsName.countStringCharacters < 25){
        if(checkMathsName.validateInputNoSpecialChars){
          $('.saved-maths-box h2').hide();

          //inject latest item at the top of the list
          $target.prepend("<li><span class='view-maths'>" + mathsName + " -- " + _getCurrentDate() + "</span>"
          + "<span class='delete-maths'>DELETE</span><span class='result-maths'>"+ mathsValue +"</span></li>");
          $('#myModal').fadeOut().removeClass('open');

          //set the focus of the keyboard on the digits
          $('.calculator-panel__digits').focus();
         }
         else{
          var errorMessage = "Only alphanumerics and space are allowed";
          _errorMessageModalWindow(errorMessage);
         }
      }
      else{
        var errorMessage = "Maximum 25 characters allowed";
        _errorMessageModalWindow(errorMessage);
      }
  }


  //private method - handles modal window opening
  var _saveMaths = function(displayTempVal) {

      var $target = $('.saved-maths-box__list'),
          errorTarget = "modal-message";

      //reset modal field
      $('.modal-get-maths').val('');
      _clearErrorMessage(errorTarget);

      $('#myModal').fadeIn( "slow", function() {
        $('#myModal').addClass('open');
        $('.modal-get-maths').focus();
      });
  };


  //private method - load selected saved maths in calculator screen
  var _loadMaths = function (target) {
    var mathsToLoad = target.siblings('.result-maths').text();
    $('.display-result').val(mathsToLoad);
  }


  //private method - delete selected maths from saved maths list
  var _deleteMaths = function (target) {
     target.closest('li').remove();
     if($('.saved-maths-box__list li').length === 0){
       $('.saved-maths-box h2').show();
     }
  }


  //private method - get current date and time
  var _getCurrentDate = function() {
    var currentdate = new Date(),
        datetime =  currentdate.getDate() + "/"
                 + (currentdate.getMonth()+1)  + "/" 
                 + currentdate.getFullYear() + " @ "  
                 + currentdate.getHours() + ":"  
                 + currentdate.getMinutes() + ":" 
                 + currentdate.getSeconds();
    return datetime;
  }


  //private method - returns an object with different types of validation
  var _validateInputs = function(val){
          
        //regex to allow only digits and calculators special chars with space
        var regExInput = /^[0-9SsCc \/+*.=-]+$/; 

        //regex to allow only digits and calculators special chars without space
        var regExInputNoSpaceAllowed = /^[0-9SsCc\/+*.=-]+$/; 

         //regex to allow only special chars used by calculator
        var regExFindChars = /^[\/+*.=-]+$/; 

        //regex to allow only numbers
        var regExNumbers = /^[0-9]+$/; 

        //regex to allow only digits and not special chars
        var regExNoSpecialChars = /^[a-zA-Z0-9 ]+$/; 

        return {
            validateInput                    : regExInput.test(val),
            validateInputNoSpaceAllowed      : regExInputNoSpaceAllowed.test(val),
            validateOperation                : regExFindChars.test(val),
            validateNumbers                  : regExNumbers.test(val),
            validateInputNoSpecialChars      : regExNoSpecialChars.test(val),
            countStringCharacters            : val.length
        }
  };


  //private method - check keypress code validity
  var checkKeyCodeValidity = function(event){

    var inputChar = "";

    //old IE browsers
    if (event.which === null){
         inputChar = event.keyCode; // old IE
    }
    //all the other browsers
    else{
       inputChar = event.keyCode ? event.keyCode : event.which;
    }
    return inputChar;
  }



  //public method - handles all the calculator events
  var CalculatorListener = function () {

      //as default, set the focus of the keyboard on the calculator digits
      $('.calculator-panel__digits').focus();
    
      //handles the keyboard events and bind them to the calculator digits
      $('.calculator-panel__digits').bind('keypress', function(e) {

        var inputChar = "",
            checkInput = "",
            equalSymbol = "=";

        inputChar = checkKeyCodeValidity(e);
        checkInput = _validateInputs(String.fromCharCode(inputChar));

        //if modal window is open then don't listen to keypress
        if(!$('.modal').hasClass('open')){

          //check if the entered key code is correct before doing calculations
          if(checkInput.validateInputNoSpaceAllowed){
            _doCalculations(String.fromCharCode(inputChar));
          }
          else{
            //if the "enter" key is pressed, then convert it to the equal symbol to do calculations
            if((inputChar === 13) && (!$('.modal').hasClass('open'))){
              _doCalculations(equalSymbol);
            }
            else{
              //check if any other not allowed char are typed when ovelay is closed
              var errorMessage = "Neither characters nor space allowed"
              _validationError(errorMessage);
            }
          }
        }
      });


      //handles the keyboard events for the modal window
      $('#myModal').bind('keypress', function(e) {

        var inputChar = "";
        inputChar = checkKeyCodeValidity(e);

        //if enter is pressed then submit the modal window
        if(inputChar === 13){
          e.preventDefault();
          $('.button-submit').click();
        }
      });


      //handles click events on calculator buttons
      $('.calculator-panel__digits button').click(function(e){
        e.preventDefault();
        _doCalculations(this.value);
        //re-assign the focus on the whole panel to avoid buttons to get triggered on key enter
        $('.calculator-panel__digits').focus();
      
      });


      //handles load maths functionality
      $('.saved-maths-box__list').on('click', '.view-maths', function(e){
        e.preventDefault();
        _loadMaths($(this));
      });


      //handles delete maths functionality
      $('.saved-maths-box__list').on('click', '.delete-maths', function(e){
        e.preventDefault();
        _deleteMaths($(this));
      });


      //handles submit event on modal window
      $('.button-submit').click(function(e){
        e.preventDefault();
        _submitMaths($(this));
      });


      //handles close modal window on button cancel anc cancel icon click
      $('.button-cancel, .modal-close').click(function(e){
        e.preventDefault();
        $('#myModal').fadeOut().removeClass('open');

        //resetting the focus on the calculator panel
        $('.calculator-panel__digits').focus();
      });


      //handles modal window close when clicking on modal background
      $(document).on('click',"#myModal", function(e) {
        e.preventDefault();

        //if clicked on the modal panel parent only, then close the modal itself
        if (e.target === this){
          $('#myModal').fadeOut().removeClass('open');
        }    
      });
  };

  return {
      CalculatorListener: CalculatorListener
  };

})();

MyApp.CalculatorListener();
