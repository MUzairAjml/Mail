import Email from "./mail.js";
import axios from "axios";

async function cron() {
  while (true) {
    let res = await axios
      .get("https://middlewareapi.loop.markets/v1/juno/blockDifference")
      .catch((err) => {
        return;
      });
    let blockDiff = res?.data.blocksDifference;
    console.log(blockDiff);
    if (blockDiff >= 300) {
      await Email.collectorStoped();
    }
    await sleep(900000);
  }
}
cron();

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
