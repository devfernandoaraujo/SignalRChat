"use strict"

/**
 * DEscription. Enum for comumn buttons in a modal class
 * @readonly
 * @enum {{class: string}}
 */
const ModalButtonType = Object.freeze({
    PRIMARY: { class: "btn btn-primary" },
    SECUNDARY: { class: "btn btn-secondary" },
    SUCCESS: { class: "btn btn-success" },
    DANGER: { class: "btn btn-danger" },
    WARNING: { class: "btn btn-warning" },
    INFO: { class: "btn btn-info" },
    LIGHT: { class: "btn btn-light" },
    DARK: { class: "btn btn-dark" },
    LINK: { class: "btn btn-link" }
});


/**
 *Summary. This class provide the functionalities buttons displayed on modal messages 
 *Description. The initial idea is create the buttons than populate them on modal before show it to the user. 
 * It can be user in other implementations in the future. Maybe a refectore must be done
 *@acess public
 *@author Fernando M Araujo
 *@since 01/03/2019
 */
class ModalButton {
    /**
     * 
     * @param string label - the message that will be showed on the button for the user
     * @param string type - It demostrates the type of the button showing a different background collor according to the action 
     * @param function callback - function that must be executed when the user clicks on the button
     */
    constructor(label, modalButtonType, callback) {
        this.label = label;
        this.modalButtonType = modalButtonType;
        this.callback = callback;
    }
    
}

export { ModalButtonType, ModalButton };
