import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Get server info'),
    async execute(interaction) {
        const guild = interaction.guild;
        await interaction.reply(
            `**Server Info:**\nName: ${guild.name}\nID: ${guild.id}\nMembers: ${guild.memberCount}\nCreated: ${guild.createdAt.toDateString()}`
        );
    }
};
