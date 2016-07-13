How to run the project:

Run the index.html page and check the project out.
In order to compile the whole project please run the "GRUNT" command from command line within the project folder.  



Project behaviours:

The calculator responds both to mouse and keyboard controls.
With the keyboard, the user can control:
Digits: from 0-9
Calculator operators: -,+,/,*,.,=
SAVE: 'S' or 's' key to save maths 
CANCEL: 'C' or 'c' key to clear calculator screen
ENTER: the 'ENTER' key performs the calculator sum operation and also submit the modal window when open

By clicking on the SAVE button a modal window will appear to allow the user to add and submit a maths name. The user can save any type of maths, also the number 0. 
Then the maths name added will be added to the maths list.
The user can use and modify a saved maths by loading it from the maths list.
The user can delete any saved maths name from the maths list. 
The maths name are ordered by date and time. The newest maths goes always at the top of the maths list.

The modal window can be closed by clicking on its cancel button or its close icon or by clicking anywhere on the HTML body.

The user can come across results like "Infinity" and "NaN". These results are part of a calculator events.

The validation perfomed for the calculator is the following:
The user cannot add two consecutive operators.
The user can start any operation with the operators -,+,/,*,.
Special characters are not allowed apart from the ones allowed to perform the calculator operations.

The validation performed for the modal window is the following:
The user must add a string containing no special characters. Spaces are allowed. The string must be less than 25 characters long.




Project tech setup:

The project has been implemented in Google Chrome, Firefox and Safari. It is fully responsive - mobile, tablet and desktop versions are availale.
Also, the project is IE compatible. IE8(included) upwards.

I've used JavaScript, jQuery, SASS, CSS3, HTML5 and GRUNT as JS task runner. 
Naming convention followed are BEM, OOCSS and SMACCS.

As for the JavaScript structure, I've used the Module pattern. I've organised my code using namespacing for ease of programming as well as to create encapsulation and avoid variables and functions collisions.
