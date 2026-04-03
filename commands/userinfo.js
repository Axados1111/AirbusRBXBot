import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Get info about a user')
        .addUserOption(opt => opt.setName('target').setDescription('User to lookup').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(user.id);
        await interaction.reply(`**User Info:**\nTag: ${user.tag}\nID: ${user.id}\nJoined Server: ${member.joinedAt.toDateString()}`);
    }
};
