const Discord = require("discord.js")
exports.run = (bot, message, args) => {
	let errCode = args[0]
	let device = args.slice(1)
	message.channel.send("", {
     embed: new Discord.RichEmbed()
      .addField("Check error page", `Here's your link: [Here](http://www.nintendo.com/consumer/wfc/en_na/ds/results.jsp?error_code=${errCode}&system=${device}&locale=en_Us)`)
      .setColor("#8100c4")
      .setFooter("Requested by: " + message.author.tag)
    })
} 