const fs = require('fs');
const config = require("../config/config")

exports.readDb = () => {
    const data = fs.readFileSync(config.db);
    return JSON.parse(data);
};

exports.writeDb = (data) => {
    fs.writeFileSync(config.db, JSON.stringify(data));
};