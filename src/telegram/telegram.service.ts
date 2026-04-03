import { Injectable, OnModuleInit } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: TelegramBot;
  private API = 'https://restaurant-api-i90i.onrender.com/menu'; // CHANGE THIS

  onModuleInit() {
    this.bot = new TelegramBot(process.env.BOT_TOKEN!, {
      polling: true,
    });

    this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const text = msg.text;

      if (!text) return;

      // COMMANDS
      if (text.startsWith('/add')) return this.addMenu(chatId, text);
      if (text.startsWith('/list')) return this.listMenu(chatId);
      if (text.startsWith('/update')) return this.updateMenu(chatId, text);
      if (text.startsWith('/delete')) return this.deleteMenu(chatId, text);

      // HELP
      this.bot.sendMessage(
        chatId,
        `
📋 Commands:

/add name | price | category | description | imageUrl
/update id | name | price | category | description | imageUrl
/delete id
/list
        `,
      );
    });
  }

  // ➕ ADD
  async addMenu(chatId: number, text: string) {
    try {
      const [name, price, category, description, imageUrl] = text
        .replace('/add ', '')
        .split('|')
        .map((s) => s.trim());

      await axios.post(this.API, {
        name,
        price: Number(price),
        category,
        description,
        imageUrl,
      });

      this.bot.sendMessage(chatId, '✅ Menu item added');
    } catch (e) {
      this.bot.sendMessage(chatId, '❌ Error adding menu');
    }
  }

  // 📋 LIST
  async listMenu(chatId: number) {
    try {
      const res = await axios.get(this.API);

      if (!res.data.length) {
        return this.bot.sendMessage(chatId, '📭 Menu is empty');
      }

      const text = res.data
        .map(
          (item) =>
            `🍽 ${item.id}. ${item.name}\n💰 ${item.price}$\n📂 ${item.category}`,
        )
        .join('\n\n');

      this.bot.sendMessage(chatId, text);
    } catch (e) {
      this.bot.sendMessage(chatId, '❌ Error fetching menu');
    }
  }

  // ✏️ UPDATE
  async updateMenu(chatId: number, text: string) {
    try {
      const [id, name, price, category, description, imageUrl] = text
        .replace('/update ', '')
        .split('|')
        .map((s) => s.trim());

      await axios.patch(`${this.API}/${id}`, {
        name,
        price: Number(price),
        category,
        description,
        imageUrl,
      });

      this.bot.sendMessage(chatId, '✏️ Updated successfully');
    } catch (e) {
      this.bot.sendMessage(chatId, '❌ Error updating menu');
    }
  }

  // ❌ DELETE
  async deleteMenu(chatId: number, text: string) {
    try {
      const id = text.replace('/delete ', '').trim();

      await axios.delete(`${this.API}/${id}`);

      this.bot.sendMessage(chatId, '🗑 Deleted successfully');
    } catch (e) {
      this.bot.sendMessage(chatId, '❌ Error deleting menu');
    }
  }
}
