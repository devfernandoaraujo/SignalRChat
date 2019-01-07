"use strict"

/**
 *Summary. Construct the message and show it on the screen   
 *@acess public
 *@author Fernando M Araujo
 *@since 01/02/2019
 */
class BasicModalMessage{
    constructor(builder) {

        this.objectModal = builder.objectModal;
        this.setTitle(builder.title);
        this.setMessage(builder.message);
        this.setButtons(builder.buttons);
        this.setAlertImage(builder.alertImage);
             
    }

    /**
     * Set the title of the modal 
     * @param string title
     */
    setTitle(title) {
        if (title !== undefined) {
            $('.modal-title').html(title);
        }
        else {
            $('.modal-title').html("New Title");
        }
    }

    /**
     * Set the message to the user 
     * @param string message
     */
    setMessage(message) {
        if (message !== undefined) {
            $(".modal-body > .row > [class^='col-'] > p").html(message);
        }
        else {
            $(".modal-body > .row > [class^='col-'] > p").html("Message Here");
        }
        
    }

    /**
     * Create the buttons on the Modal
     * @param array of ModalButton - Object with the specifications of buttons
     */
    setButtons(buttons) {

        //Populate the class
        let self = this;

        if (buttons === undefined || !Array.isArray(buttons)) {
            alert("It was spected an array.");
            return;
        }

        let buttonsPosition = $(".modal-footer");
        //Clean object's innerHtml
        $(buttonsPosition).html("");

        let htmlButton = "";
        buttons.forEach((obj, idx) => {
            htmlButton = ""

            htmlButton += '<button type="button" ';
            htmlButton += 'class="' + obj.modalButtonType.class + '" > ' + obj.label + '</button >';

            if (obj.callback != null && obj.callback != undefined) {
                var objButton = $(htmlButton).on("click", () => {
                    obj.callback(self.objectModal);
                });
            }
            
            buttonsPosition.append(objButton);


        });
    }

    /**
     * Create the image in the left side of the pop up
     * @param boolean useImage
     */
    setAlertImage(useImage) {
        let objectImage = $(".modal-body > .row > [class^='col-'] > figure > img");

        if (objectImage !== null && objectImage !== undefined) {

            //Remove all class starting with imgModal
            $(objectImage).removeClass((index, classes) => {
                let matches = classes.match(/\imgModal\S+/ig);
                return (matches) ? matches.join(' ') : '';
            });


            $(objectImage).addClass("imgModalAlert");
        }
        else {}
        
        
    }

    /**
     * Open the Modal to the user
     */
    show() {
        $(this.objectModal).modal();
    }
}

export { BasicModalMessage };