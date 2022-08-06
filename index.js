import detect from "detect-port";
import Email from "./mail.js";
const port = 3000;

async function cron() {
  while (true) {
    detect(3000, async (err, _port) => {
      if (err) {
        console.log(err);
      }

      if (port == _port) {
        console.log(`port: ${port} was not occupied Sending Mail`);
        await Email.collectorStoped();
      }
    });
    await sleep(900000);
  }
}
cron();

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}