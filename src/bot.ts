import {Telegraf} from 'telegraf';
import {message} from 'telegraf/filters';
import {categorizeMessage} from './api/agent';
import {CONFIG} from './config';

export const BOT = new Telegraf(CONFIG.bot.token);

BOT.start(async ctx => await ctx.reply(CONFIG.bot.messages.start));
BOT.help(async ctx => await ctx.reply(CONFIG.bot.messages.help));

BOT.on(message('text'), async ctx => {
  if (ctx.message.chat.id !== CONFIG.chats.main.id) {
    return;
  }

  const category = await categorizeMessage(ctx.message.text);
  if (category === '[spam]') {
    await ctx.forwardMessage(CONFIG.chats.admin.id);
    await ctx.deleteMessage(ctx.message.message_id);
  }
});
