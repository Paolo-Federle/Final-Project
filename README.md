**Main Goals:**

- Room creation and management: allows users to create an account and login and create a personal room, where they can invite people.

- Dice rolling: allowing users to roll digital dice by using buttons or writing specific command in the chat

- Digital Table: a digital table that users can use to see and interact with game maps, tokens, drawing and game elements in real-time.

- Chat: allows users to communicate with each other in real-time while inside the room.

- Audio & Video chat: communicate with other users inside the room using audio and video chat.

- Character sheet : allow users to create and manage characters on the platform, with automatic calculations and tracking for character stats, skills, and other attributes.



**Notes:**

How to build a chat
- web sockets (socket.io library)
- 2 api endpoint one to receive one to get (like mails). Every X seconds it will check for new messages

For sheets, creates modules for the structure, for example:
- traits
- proficiency
