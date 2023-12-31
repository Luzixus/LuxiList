const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
   let x = await botdata.find();
   let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`**Toplam ${bots.length} bot bulundu.**`)
   .setColor("#7289da")
   .addField("Botlar", `${!bots ? "" : bots.map(a => "<@"+a.botID+">").join("\n")}`, true)
   message.channel.send(embed)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "botlar",
    description: "",
    usage: ""
  };