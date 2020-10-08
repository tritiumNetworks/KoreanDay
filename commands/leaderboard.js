const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function fn (client, msg) {
  const embed = new MessageEmbed({ title: '한글점수 상위 10명' })
  const users = await client.db.select('*').orderBy('many', 'desc').limit(10).from('users')
  for (const user of users) {
    embed.addField((users.indexOf(user) + 1) + '. ' + client.users.resolve(user.id).username, user.many + '점')
  }

  msg.channel.send(embed)
}

module.exports = fn
module.exports.aliases = ['상위', '상위 목록', '다들', '다들 얼마나 침?', '다들 얼마나 침']
