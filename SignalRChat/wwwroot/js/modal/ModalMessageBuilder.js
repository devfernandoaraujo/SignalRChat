"use strict"

import { BasicModalMessage } from '../modal/BasicModalMessage.js';

/**
 *Summary. Build de configuration to construct ModalMessages   
 *@acess public
 *@author Fernando M Araujo
 *@since 01/02/2019
 */
class ModalMessageBuilder {
    /**
     * 
     * @param {any} objectModal
     */
    setObjectModal(objectModal) {

        //There are 2 ways to get the object sending the object itself or a object name
        if (typeof(objectModal) === "object") {
            this.objectModal = objectModal;
        }
        else {
            this.objectModal = $("#"+ objectModal)[0];
        }

        return this;
    }

    /**
     * 
     * @param {any} title
     */
    setTitle(title) {
        this.title = title;
        return this;
    }

    /**
     * 
     * @param {any} message
     */
    setMessage(message) {
        this.message = message;
        return this;
    }

    /**
     * 
     * @param {any} buttons
     */
    setButtons(buttons) {
        this.buttons = buttons;
        return this;
    }

    /**
     * 
     */
    setAlertImage() {
        this.alertImage = true;
        return this;
    }

    /**
     * 
     */
    build() {
        return new BasicModalMessage(this);
    }
    
}

export { ModalMessageBuilder };