require('dotenv').config();

export const CONFIG = {
  bot: {
    token: process.env.BOT_TOKEN!,
    name: process.env.BOT_NAME!,
    domain: process.env.BOT_DOMAIN,
    port: parseInt(process.env.BOT_PORT ?? '8080'),
    messages: {
      help: "My main role is to be present silently in chat groups where I'm an admin.",
      start:
        "Hey, I'm a silent admin dedicated to work in a special group. " +
        "I'm not supposed to be used in other chats so I will ignore all your messages.",
    },
  },
  chats: {
    admin: {
      id: parseInt(process.env.CHATS_ADMIN_ID!),
    },
    main: {
      id: parseInt(process.env.CHATS_MAIN_ID!),
    },
  },
  services: {
    agent: {
      url: process.env.SERVICES_AGENT_URL!,
    },
  },
};
