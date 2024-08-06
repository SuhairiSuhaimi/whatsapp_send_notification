// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');

console.log("Calling file index.js");

venom
.create({
    session: 'tetsing', //name of session
    //multidevice: false // for version not multidevice use false.(default: true)
})
.then((client) => start(client))
.catch((erro) => {
    console.log(erro);
});

function start(client) {
    client.onMessage( function(message) {
        if (message.isGroupMsg === false) {
            var rbody = message === null || message === void 0 ? void 0 : message.body;
            console.log(message.from + " > " + rbody.slice(0, 25) + (rbody.length > 25 ? "..." : ""));
 
            var sbody;
            msg = message.body.toLowerCase();

            switch(msg) {
                case "hi":
                case "hello":
                    sbody = "Welcome Venom 🕷\n"+ rbody;

                    client
                        .sendText(message.from, sbody);
                break;

                case "bye":
                    sbody = "Bye bye\nSee you again\n"+ rbody;

                    client
                        .sendText(message.from, sbody);
                break;

                default:
                    client
                        .sendText(message.from, "Reply to "+ rbody);
                break;

            }  //switch(msg)

        }  //if(message.isGroupMsg === false)

    });  //client.onMessage((message)

}