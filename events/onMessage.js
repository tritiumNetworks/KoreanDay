const Query = require('../classes/Query')

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function onMessage (client, msg) {
  const { prefix } = client.settings
  const { author, content } = msg

  if (author.id === client.user.id) return
  if (client.settings.target && msg.channel.id !== client.settings.target) return
  if (/[^ㄱ-ㅎㅏ-ㅣ가-힣 {}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(content)) {
    if (msg.deletable) msg.delete()
    msg.channel.send('> `' + content + '`\n감히 한글날에 외국 문자를 쓰다니...\n`한글점수 -30`')

    const [user] = await client.db.select('*').where('id', author.id).from('users')
    if (!user) await client.db.insert({ id: author.id }).into('users')
    await client.db.update({ many: user?.many - 30 || -30 }).where('id', author.id).from('users')
  } else {
    const [user] = await client.db.select('*').where('id', author.id).from('users')
    if (!user) await client.db.insert({ id: author.id }).into('users')
    await client.db.update({ many: user?.many + content.length || content.length }).where('id', author.id).from('users')
  }

  if (author.bot) return
  if (!content.startsWith(prefix)) return

  const query = new Query(prefix, content)
  const target = client.commands.find(
    (command = { aliases: [] }) =>
      typeof command === 'function' &&
      command.aliases.includes(query.cmd)
  )

  if (!target) return
  target(client, msg)
}

module.exports = onMessage
