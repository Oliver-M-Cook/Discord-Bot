module.exports = {
    name: 'kick',
    description: 'Deafens mentioned user or users.',
    args: true,
    execute(message) {
        const taggedMembers = message.mentions.members;

        for (let [, member] of taggedMembers) {
            member.kick()
        }
    },
};
