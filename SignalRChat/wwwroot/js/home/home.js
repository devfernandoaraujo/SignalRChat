(function () {
    "use strict"
    const userName = $("#userName");
    const btnSendMessage = $("#btnSendMessage");
    const listMessages = $("#listMessages");
    const txtMessage = $("#txtMessage");

    //Instance of Home Class
    const clientConnectionInstance = new ClientConnection(serverMessage);

    //Send a message to the server Hub when the user clicks on the button 
    btnSendMessage.on("click", () => {
        clientConnectionInstance.sendMessage(
            $(userName).val(),
            $(txtMessage).val()
        )
    });

    /**
        * populate the messages received by the server
        * @param string user
        * @param string message
        */
    function serverMessage(user, message) {

        let newMessage = user + " - " + message;
        $(listMessages).val($(listMessages).val() + "\n" + newMessage);
    }

})();