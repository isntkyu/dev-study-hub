import { spider } from "./spider.js";

spider(url, nesting)
  .then(() => console.log("download complete"))
  .catch((err) => console.error(err));
