import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to ban')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const member = interaction.options.getMember('user');

    if (!member) {
      return interaction.reply({ content: 'User not found in this server.', ephemeral: true });
    }

    if (!member.bannable) {
      return interaction.reply({
        content: 'I cannot ban this user. Check role hierarchy or permissions.',
        ephemeral: true
      });
    }

    await member.ban();
    await interaction.reply(`🔨 Banned ${member.user.tag}`);
  }
};
