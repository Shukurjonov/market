const fs = require('fs');

const saveLog = (filePath, data) => {
  if (fs.existsSync(filePath)) {
    fs.appendFileSync(filePath, data)
  } else {
    fs.writeFileSync(filePath, data)
  }
}

const replaceAll = (str, find, replace) => {
  var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return str.replace(new RegExp(escapedFind, "g"), replace);
};


module.exports = {
  replaceAll, saveLog
}