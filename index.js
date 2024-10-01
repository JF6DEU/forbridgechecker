// At first you should change this:
const token = process.env.TOKEN || "not set";
if (token == "not set"){
    console.error("ERROR!!token isn't set!");
    process.exit(1);
}

const bridgebotid = "01J918J61M2VCS6X7R2XGF1JX5";

const { Client, UserCollection} = require("revolt.js");
let client = new Client();
const http = require("http");

client.on("ready", async () =>{
    console.info(`Logged in as ${client.user.username}!`);
    setInterval(async function(){
        let bridgebot = (await new UserCollection(client).fetch(bridgebotid));
        if (bridgebot == undefined){
            console.error("ERROR! bridgebot cannot read");
        }
        status = bridgebot.online
    }, 1000);
});

var status;

const server = http.createServer((request, response) => {
    response.writeHead(200, {
      "Content-Type": "text/html"
    });

    const responseMessage = "<h1>" + ((status) ? "Bridged!" : "not bridged...") + "</h1>";
    response.end(responseMessage);
});

client.loginBot(token);
server.listen(4338);
