/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function onMessage (client, _, msg) {
  const { author, content } = msg

  if (author.id === client.user.id) return
  if (client.settings.target && msg.channel.id !== client.settings.target) return
  if (/[^ㄱ-ㅎㅏ-ㅣ가-힣 {}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(content)) {
    if (msg.deletable) msg.delete()
    msg.channel.send('딱걸렸다 ㅅㄱ\n`한글점수 -100`')
    const [user] = await client.db.select('*').where('id', author.id).from('users')
    if (!user) await client.db.insert({ id: author.id }).into('users')
    await client.db.update({ many: user?.many - 100 || -100 }).where('id', author.id).from('users')
  }
}

module.exports = onMessage
