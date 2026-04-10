const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user')
    .addUserOption(o => o.setName('user').setDescription('User').setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    await interaction.reply(`${user.tag} warned (placeholder)`);
  }
};
