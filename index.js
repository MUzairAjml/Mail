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
      .get("https://middlewareapi.loop.markets/v1/juno/poolDifference")
      .catch((err) => {
        return;
      });
    let pool1Diff = res?.data.firstPoolDifference;
    let pool2Diff = res?.data.secondPoolDifference;
    let block = res?.data.currentBlock;
    console.log("Pool1 Diff : ", pool1Diff, "Pool2 Diff : ", pool2Diff);
    if (pool1Diff >= 100 || pool2Diff >= 100) {
      await Email.poolDifference(block, pool1Diff, pool2Diff);
    }
    await sleep(60000);
  }
}
blockDiff();
poolDiff();

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
