export default {
    name: 'guildMemberAdd',
    once: false, // triggers every time a new member joins
    async execute(member) {
        const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
        const role = member.guild.roles.cache.get(process.env.MEMBER_ROLE_ID);

        // Send welcome message
        if (channel) {
            channel.send(`🚀 Welcome ${member.user} to **Airbus RBX**! Please make sure to read the rules and say hello to everyone in chat!.`);
        }

        // Assign Member role
        if (role) {
            try {
                await member.roles.add(role);
            } catch (err) {
                console.error(`Failed to assign role to ${member.user.tag}:`, err);
            }
        }
    }
};
