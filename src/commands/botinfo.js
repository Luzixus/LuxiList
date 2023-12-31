const Discord = require('discord.js');
const client = new Discord.Client();
const bots = require("../database/models/botlist/bots.js");
module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send("Hata: Lütfen bot ID giriniz.");
    let b = await bots.findOne({
        botID: args[0]
    });
    if (!b) return message.channel.send("Bot ID'si yanlış.")
    let website = b.website ? " | [Website](" + b.website + ")" : "";
    let github = b.github ? " | [GitHub](" + b.github + ")" : "";
    let discord = b.support ? " | [Destek Sunucusu](" + b.support + ")" : "";
    let coowner;
    if (!b.coowners.length <= 0) {
        coowner = b.coowners.map(a => "<@" + a + ">").join("\n");
    } else {
        coowner = "";
    }
    const embed = new Discord.MessageEmbed()
        .setThumbnail(b.avatar)
        .setAuthor(b.username + "#" + b.discrim, b.avatar)
        .setDescription("**[LuxiList'den " + b.username + "#" + b.discrim + " adlı bota oy ver.](https://discordbotlist-1.mesifytr.repl.co/bot/" + b.botID + "/vote)**")
        .addField("ID", b.botID, true)
        .addField("Kullanıcı Adı", b.username, true)
        .addField("Ayrımcı", b.discrim, true)
        .addField("Oylar", b.votes, true)
        .addField("Onay", b.certificate, true)
        .addField("Kısa Açıklaması", b.shortDesc, true)
        .setColor("#7289da")
        .addField("Toplam Sunucu", `${b.serverCount || "N/A"}`, true)
        .addField("Kurucu(lar)", `<@${b.ownerID}>\n${coowner.replace("<@>", "")}`, true)
        .addField("Bağlantılar", `[Sunucuna Ekle](https://discord.com/oauth2/authorize?client_id=${b.botID}&scope=bot&permissions=8)${website}${discord}${github}`, true)
    message.channel.send(embed)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};

exports.help = {
    name: "bot-bilgi",
    description: "",
    usage: ""
};
