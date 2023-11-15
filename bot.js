const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('5894535403:AAF5-uANxBf_5OevMu9dxPvR-jRt5A76E6Q');
bot.start((ctx) => ctx.reply('Здарова, я бот с погодой, пока что я показываю  температуру и скорость ветра, но скоро смогу и больше \n Скиньте мне свою геолокацию'));

bot.on('message', async (ctx) => {
    
    if(ctx.message.location){
    console.log(ctx.message.location);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&units=metric&appid=585de0df86906fa0b5c8eb17e1195af9`;
   const resp = await axios.get(url);
   console.log(resp);
   ctx.reply(`${resp.data.name}:${resp.data.main.temp} C, скорость ветра: ${resp.data.wind.speed}`);
    }
   else{
      
    await ctx.telegram.sendMessage(ctx.message.chat.id, `Я вас не понимаю, скиньте вашу геопозицию и я покажу вам температуру и скорость ветра`);
    }
    
})
bot.launch();

