import { primises as fsPromises } from "fs";
import { urlToFilename } from "./utils.js";

export function spider(url, cb) {
  const filename = urlToFilename(url);

  return fsPromises.readFile(filename, "utf8").catch((err) => {
    if (err.code !== "ENOENT") {
      throw err;
    }
  });

  return download(url, filename);
}

function saveFile(filename, contents, cb) {
  mkdirp(path.dirname(filename), (err) => {
    if (err) {
      return cb(err);
    }
    fs.writeFile(filename, contents, cb);
  });
}

function download(url, filename, cb) {
  console.log(`Downloading ${url}`);
  superagent.get(url).end((err, res) => {
    if (err) {
      return cb(err);
    }
    saveFile(filename, res.text, (err) => {
      if (err) {
        return cb(err);
      }
      console.log(`Downloaded and saved: ${url}`);
      cb(null, res.text);
    });
  });
}
