import express = require('express');
import {BOT} from './bot';
import {CONFIG} from './config';

const STOP_SIGNALS = ['SIGINT', 'SIGTERM'];

function runInDevMode() {
  STOP_SIGNALS.forEach(signal => {
    process.once(signal, () => BOT.stop(signal));
  });

  BOT.launch();
}

async function runInProdMode(domain: string) {
  const app = express();

  app.use(
    await BOT.createWebhook({
      domain,
      path: '/update',
    })
  );

  const server = app.listen(CONFIG.bot.port, () =>
    console.log('Listening on port', CONFIG.bot.port)
  );

  const terminate = () => {
    console.log('Stopping the server');
    server.close(() => {
      console.log('Server stopped');
    });
  };

  STOP_SIGNALS.forEach(signal => {
    process.once(signal, terminate);
  });
}

(async function () {
  if (!CONFIG.bot.domain) {
    runInDevMode();
    return;
  }

  await runInProdMode(CONFIG.bot.domain);
})();
