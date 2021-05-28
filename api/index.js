var express = require('express');
var r = express.Router();

// load pre-trained model
const model = require('./sdk/model.js');

// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
//const token = '1781217246:AAFHYFBOPzB5DGgqgPVXUotACNdQxRWQ_5I'
const token = '1790824752:AAFcIbQSDIXl7TNwfdG10rv7A0IA-VzanE4'
const bot = new TelegramBot(token, {polling: true});


// Main Menu Bot
bot.onText(/\/start/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `hello ${msg.chat.first_name}, welcome...\n
        click /predict`
    );   
});

state = 0;
bot.onText(/\/predict/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `masukkan nilai i|v contoh 9|9`
    );   
    state = 1
});

bot.on('message', (msg) => {
	if(state == 1){
		console.log(msg.Text);		
    	}else {
        	state = 0 
        }
})

// routers
r.get('/prediction/:i/:r', function(req, res, next) {    
    model.predict(
        [
            parseFloat(req.params.i), // string to float
            parseFloat(req.params.r)
        ]
    ).then((jres)=>{
        res.json(jres);
    })
});

module.exports = r;
