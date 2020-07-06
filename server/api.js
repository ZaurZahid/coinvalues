const superagent = require("superagent");

async function getCurrencies(ctx, next) {
  const { start, limit } = ctx.request.query;

  try {
    let res;
    if (limit === "0") {
      res = await superagent.get("https://api.coincap.io/v2/assets/");
    } else {
      res = await superagent
        .get("https://api.coincap.io/v2/assets/")
        .query({ offset: start, limit: limit });
    }
    ctx.body = res.text;
  } catch (err) {
    console.log("get Currencies error!");
    ctx.body = err;
  }
}

async function getCurrency(ctx, next) {
  const { id } = ctx.params;

  try {
    const res = await superagent.get("https://api.coincap.io/v2/assets/" + id);

    ctx.body = res.text;
  } catch (err) {
    console.log("get Currency error!");
    ctx.body = err;
  }
}

module.exports = {
  getCurrencies,
  getCurrency,
};
