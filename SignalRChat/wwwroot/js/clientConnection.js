"use strict"

//Creates and start the connection with the server
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/messageHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

class ClientConnection {

    /**
     * Default Constructor
     * @param function messageCallback a function utilized to load the client messages
     */
    constructor(messageCallback) {

        this.messageCallback = messageCallback;

        this._start();


    }

    /**  Start server connections*/
     _start() {

        const promises = [];
        promises.push(this._connectionReceive());
        promises.push(this._connectionStart());

         return (async () => {
            return await Promise.all(promises);
        });
        
    }

    /**
     * Send a message to the server
     * @param string user user sender
     * @param string message message send
     */
    sendMessage(user, message) {
 
        connection.invoke("SendMessage", user, message)
                  .catch(err => console.error(err.toString()));
    }

    /**
     * Save messages received 
     * @param string user user, who sent the message
     * @param string message message sent
     */
    receiveServerMessage(user, message) {
        //send the information to the user
        this.messageCallback(user, message);
    }

    /**
     * Start listening messages from the server
     */
    async _connectionReceive() {
         
        await connection.on("ReceiveMessage", (user, message) => {
            this.receiveServerMessage(user, message);
        });
        
    }

    /**
     * Start the connection with the server
     */
    async _connectionStart() {
        
        await connection.start().catch(function (err) {
            setTimeout(() => _connectionStart(), 5000);
        });
    }
}
