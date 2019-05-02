module.exports = {
  name: 'eggs',
  category: 'userRoles',
  description: 'Gives the author the faction role for Yoshi',
  aliases: ['egg'],
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Sets factions to the roles
    const faction1 = client.roleFind(message, client.guildConfig.faction1Role);
    const faction2 = client.roleFind(message, client.guildConfig.faction2Role);

    const emoji = client.emojis.find(e => e.name === 'radyoshi');

    // If user has the other faction role, remove it
    client.remove(message, faction2);

    // If they already have the faction role, display this
    if (message.member.roles.has(faction1.id)) {
      message.reply('You already chose that faction!');
    } else {
      // If not give it to em. If fails, display this message which alerts me and logs to console
      message.member.addRole(faction1).catch((err) => {
        message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
        console.log(err);
      });
      // Sends the success message and deletes the original message to keep chat less clutered
      message.channel.send(`${message.author} has joined **Detective ${client.guildConfig.faction1}**! ${emoji}`);
      message.delete().catch(err => console.log(err));
    }
  },
};