/**
 * @param {import('../classes/Client')} client
 */
function onReady (client) {
  console.log(
    client.user.username + ' is now online!\n' +
    'prefix: ' + client.settings.prefix
  )

  client.user.setActivity('모든 한국인들', { type: 'WATCHING' })
}

module.exports = onReady
