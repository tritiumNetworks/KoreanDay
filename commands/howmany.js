/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function fn (client, msg) {
  const { many } = (await client.db.select('many').where('id', msg.author.id).from('users'))[0]
  msg.channel.send('보유한 한글점수: `' + many + '`')
}

module.exports = fn
module.exports.aliases = ['얼마나?', '얼마', '얼마나', '얼마나 침?', '얼마나 침']
