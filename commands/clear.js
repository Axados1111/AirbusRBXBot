import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Delete messages from a channel')
        .addIntegerOption(opt => opt.setName('amount').setDescription('Number of messages to delete').setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({ content: 'You do not have permission to clear messages.', ephemeral: true });
        }

        const amount = interaction.options.getInteger('amount');
        if (amount < 1 || amount > 100) return interaction.reply('Amount must be between 1 and 100.');

        const messages = await interaction.channel.messages.fetch({ limit: amount });
        await interaction.channel.bulkDelete(messages, true);
        await interaction.reply({ content: `Deleted ${messages.size} messages.`, ephemeral: true });
    }
};
