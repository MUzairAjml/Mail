import Email from "./mail.js";
import axios from "axios";

async function blockDiff() {
  while (true) {
    let res = await axios
      .get("https://middlewareapi.loop.markets/v1/juno/blockDifference")
      .catch((err) => {
        return;
      });
    let blockDiff = res?.data.blocksDifference;
    console.log("Block Diff : ", blockDiff);
    if (blockDiff >= 300) {
      await Email.blockDifference(blockDiff);
    }
    await sleep(900000);
  }
}
async function poolDiff() {
  while (true) {
    let res = await axios
      .get("https://middlewareapi.loop.markets/v1/juno/blockDifference")
      .catch((err) => {
        return;
      });
    let blockDiff = res?.data.blocksDifference;
    if (blockDiff == 0) {
      let response = await axios
        .get("https://middlewareapi.loop.markets/v1/juno/poolDifference")
        .catch((err) => {
          return;
        });

      let pool1Diff = response?.data.firstPoolDifference;
      let pool2Diff = response?.data.secondPoolDifference;
      let block = response?.data.currentBlock;
      console.log("Pool1 Diff : ", pool1Diff, "Pool2 Diff : ", pool2Diff);
      if (pool1Diff >= 100 || pool2Diff >= 100) {
        await Email.poolDifference(block, pool1Diff, pool2Diff);
      }
    } else {
      let date = new Date();
      console.log(date.toString(), blockDiff);
    }
  }
}
blockDiff();
poolDiff();

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
