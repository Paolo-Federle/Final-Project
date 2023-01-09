**Main Goals:**

- Virtual tabletop: A digital tabletop that allows players to see and interact with game maps, miniatures, dice, and other game elements in real time.

- Character sheet support: The ability to create and manage characters on the platform, with automatic calculations and tracking for character stats, skills, and other attributes.

- Audio and video chat: The ability to communicate with other players during games using audio and video chat.

**Notes:**
How to build a chat
- web sockets (socket.io library)
- 2 api endpoint one to receive one to get (like mails). Every X seconds it will check for new messages

For sheets, creates modules for the structure, for example:
- traits
- proficiency