import { Telegraf, Markup } from 'telegraf';
import { ChatMember } from 'telegraf/typings/core/types/typegram';
import dotenv from 'dotenv';
dotenv.config();

const BOT_TOKEN = process.env.TELEGRAM_API!;
const bot = new Telegraf(BOT_TOKEN);

let lastMessageId: number | null = null;

// Your Telegram channel usernames or IDs (use @username format or numeric ID)
const CHANNEL_1 = '@wifi3go1';
const CHANNEL_2 = '@update0agajav';

// ========== START COMMAND ==========
bot.start((ctx) => {
  const user = ctx.from?.username
    ? `@${ctx.from.username}`
    : ctx.from?.first_name || 'there';

  const message = `
Hello ${user}, welcome to Affiliate Pro Earn Bot!

We're excited to have you on board! As a registered member, you'll gain access to our affiliate marketing account and unlock opportunities to earn extra income.

Here's what you can expect:

⚡ Earn up to ₦50,000 daily as a registered member!
⚡ Choose from two packages tailored to your needs:

📦 Starter Package:
Registration fee: ₦2,000
Weekly earnings: ₦20,000

🚀 Pro Package:
Registration fee: ₦4,500
Weekly earnings: ₦50,000

Now, choose your registration plan below and start your journey to financial success!
`;

  ctx.reply(
    message,
    Markup.inlineKeyboard([
      [Markup.button.callback('⚡ STARTER PACKAGE ₦2,000 ⚡', 'starter')],
      [Markup.button.callback('⚡ PRO PACKAGE ₦4,500 ⚡', 'premium')],
    ])
  ).then((sentMessage) => {
    lastMessageId = sentMessage.message_id;
  });
});

// ========== STARTER PACKAGE ==========
bot.action('starter', (ctx) => {
  if (lastMessageId) ctx.deleteMessage(lastMessageId);

  ctx.reply(
    `Before registering for the Starter Package, please join our official channels:`,
    Markup.inlineKeyboard([
      [Markup.button.url('📢 Join Channel 1', 'https://t.me/+W0Z8Hd4xMUliMjk8')],
      [Markup.button.url('📢 Join Channel 2', 'https://t.me/+gw4J_trCZTQzMDNk')],
      [Markup.button.callback('✅ I’ve Joined', 'check_join_starter')],
      [Markup.button.callback('🔙 Back', 'back_to_start')],
    ])
  ).then((sentMessage) => {
    lastMessageId = sentMessage.message_id;
  });
});

// ========== PRO PACKAGE ==========
bot.action('premium', (ctx) => {
  if (lastMessageId) ctx.deleteMessage(lastMessageId);

  ctx.reply(
    `Before registering for the Pro Package, please join our official channels:`,
    Markup.inlineKeyboard([
      [Markup.button.url('📢 Join Channel 1', 'https://t.me/+W0Z8Hd4xMUliMjk8')],
      [Markup.button.url('📢 Join Channel 2', 'https://t.me/+gw4J_trCZTQzMDNk')],
      [Markup.button.callback('✅ I’ve Joined', 'check_join_pro')],
      [Markup.button.callback('🔙 Back', 'back_to_start')],
    ])
  ).then((sentMessage) => {
    lastMessageId = sentMessage.message_id;
  });
});

// ========== CHECK JOIN FOR STARTER ==========
bot.action('check_join_starter', async (ctx) => {
  const userId = ctx.from.id;

  const isMember1 = await checkMembership(CHANNEL_1, userId);
  const isMember2 = await checkMembership(CHANNEL_2, userId);

  if (isMember1 && isMember2) {
    if (lastMessageId) ctx.deleteMessage(lastMessageId);

    const message = `
⚡STARTER PACKAGE ₦2,000⚡
⚡BANK ACCT DETAILS⚡:

⚡BANK ACCT : 1888188730  
⚡BANK NAME : ACCESS BANK  
⚡NAME : BLESSING JAMES  

⚡PLEASE CLICK THE BUTTON BELOW TO VERIFY YOUR PAYMENT 👇👇👇👇👇👇👇👇👇👇
`;

    ctx.reply(
      message,
      Markup.inlineKeyboard([
        [Markup.button.url('✅ VERIFY PAYMENT', 'https://t.me/Fbking2')],
        [Markup.button.callback('🔙 Back', 'starter')],
      ])
    ).then((sentMessage) => {
      lastMessageId = sentMessage.message_id;
    });
  } else {
    ctx.reply('❌ You must join BOTH channels before continuing. Please try again.');
  }
});

// ========== CHECK JOIN FOR PRO ==========
bot.action('check_join_pro', async (ctx) => {
  const userId = ctx.from.id;

  const isMember1 = await checkMembership(CHANNEL_1, userId);
  const isMember2 = await checkMembership(CHANNEL_2, userId);

  if (isMember1 && isMember2) {
    if (lastMessageId) ctx.deleteMessage(lastMessageId);

    const message = `
⚡PRO PACKAGE ₦4,500⚡
⚡BANK ACCT DETAILS⚡:

⚡BANK ACCT : 1888188730  
⚡BANK NAME : ACCESS BANK  
⚡NAME : BLESSING JAMES  

⚡PLEASE CLICK THE BUTTON BELOW TO VERIFY YOUR PAYMENT 👇👇👇👇👇👇👇👇👇👇
`;

    ctx.reply(
      message,
      Markup.inlineKeyboard([
        [Markup.button.url('✅ VERIFY PAYMENT', 'https://t.me/Fbkin2')],
        [Markup.button.callback('🔙 Back', 'premium')],
      ])
    ).then((sentMessage) => {
      lastMessageId = sentMessage.message_id;
    });
  } else {
    ctx.reply('❌ You must join BOTH channels before continuing. Please try again.');
  }
});

// ========== CHECK CHANNEL MEMBERSHIP FUNCTION ==========
async function checkMembership(channel: string, userId: number): Promise<boolean> {
  try {
    const member: ChatMember = await bot.telegram.getChatMember(channel, userId);
    return ['member', 'administrator', 'creator'].includes(member.status);
  } catch (error) {
    console.error(`Error checking membership for ${channel}:`, error);
    return false;
  }
}

// ========== BACK TO START ==========
bot.action('back_to_start', (ctx) => {
  if (lastMessageId) ctx.deleteMessage(lastMessageId);

  const message = `
Hello ${ctx.from?.first_name || 'there'}, welcome to Affiliate Pro Earn Bot!

We're excited to have you on board! As a registered member, you'll gain access to our affiliate marketing account and unlock opportunities to earn extra income.

Here's what you can expect:

⚡ Earn up to ₦50,000 daily as a registered member!
⚡ Choose from two packages tailored to your needs:

📦 Starter Package:
Registration fee: ₦2,000
Weekly earnings: ₦20,000

🚀 Pro Package:
Registration fee: ₦4,500
Weekly earnings: ₦50,000

Now, choose your registration plan below and start your journey to financial success!
`;

  ctx.reply(
    message,
    Markup.inlineKeyboard([
      [Markup.button.callback('⚡ STARTER PACKAGE ₦2,000 ⚡', 'starter')],
      [Markup.button.callback('⚡ PRO PACKAGE ₦4,500 ⚡', 'premium')],
    ])
  ).then((sentMessage) => {
    lastMessageId = sentMessage.message_id;
  });
});

// ========== START BOT ==========
bot.launch();
console.log('🚀 Bot is running...');

// ========== SHUTDOWN ==========
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
