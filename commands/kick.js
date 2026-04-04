import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to kick')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const member = interaction.options.getMember('user');

    if (!member) {
      return interaction.reply({ content: 'User not found in this server.', ephemeral: true });
    }

    if (!member.kickable) {
      return interaction.reply({
        content: 'I cannot kick this user. Check role hierarchy or permissions.',
        ephemeral: true
      });
    }

    await member.kick();
    await interaction.reply(`✅ Successfully Kicked ${member.user.tag}`);
  }
};
