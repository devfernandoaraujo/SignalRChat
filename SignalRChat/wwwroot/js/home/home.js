import { ModalButtonType, ModalButton } from '../modal/ModalButton.js';
import { ModalMessageBuilder } from '../modal/ModalMessageBuilder.js';

/**
 *Summary. Provide all functionalities for the home page
 *@author Fernando M Araujo
 *@since 01/01/2019
 */
(function () {
    "use strict"
    const userName = $("#userName");
    const btnSendMessage = $("#btnSendMessage");
    const listMessages = $("#listMessages");
    const txtMessage = $("#txtMessage");

    //Instance of Home Class
    const clientConnectionInstance = new ClientConnection(serverMessage);

    /**
     * Send a message to the server Hub when the user clicks on send button
     */
    btnSendMessage.on("click", () => {

        let name = $(userName).val();
        let message = $("#txtMessage").val();
        let errorMessage = "";

        if (name === "" || name === undefined) {
            errorMessage += "Please, informe your name.<br>"
        }

        if (message === "" || message === undefined) {
            errorMessage += "Please, informe your message."
        }

        if (errorMessage.length > 0) {

            //Buttons' functionalities
            var btnClose = function (objModal) { $(objModal).modal("hide"); };

            //Mounting buttons structure to show on modal
            let buttons = new Array();
            buttons.push(new ModalButton(
                "Close", ModalButtonType.INFO, btnClose
            ));

            let showMessage = new ModalMessageBuilder().setObjectModal($("#basicModalMessage")[0])
                .setTitle("Alert")
                .setAlertImage()
                .setButtons(buttons)
                .setMessage(errorMessage)
                .build();

            showMessage.show();
        }
        else {
            clientConnectionInstance.sendMessage(
                $(userName).val(),
                $(txtMessage).val()
            )
        }
    });

    /**
    * populate the messages received by the server
    * @param string user
    * @param string message
    */
    function serverMessage(user, message) {

        let newMessage = user + " : " + message;

        //Check if need to create a new line
        if ($(listMessages).val().length !== 0) {
            newMessage = "\n" + newMessage; 
        } else {}

        $(listMessages).val($(listMessages).val() + newMessage);
    }

})();