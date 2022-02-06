module.exports = {
    name: 'mute',
    description: 'Deafens mentioned user or users.',
    args: true,
    execute(message) {
        const taggedMembers = message.mentions.members;

        for (let [, member] of taggedMembers) {
            member.voice.setMute(true)
                .then(() => console.log(`Deafened ${member.displayName}`))
                .catch(console.error);
        }
    },
};