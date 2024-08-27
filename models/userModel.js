const config = require('../config/config');
const fileUtils = require('../utils/fileUtils')
const fs = require('fs');

exports.findAll = () => {
    const users = fileUtils.readDb();
    return users;
}

exports.create = (userData) => {
    const users = fileUtils.readDb();

    let maxId;
    if (users.length === 0) {
        maxId = 0;
    } else {
        maxId = Math.max(...users.map(user => user.id));
    }
    const newId = maxId + 1;

    const newUser = {
        id: newId,
        ...userData
    }

    users.push(newUser);
    fileUtils.writeDb(users);
    return newUser;
}

exports.update = (id, userData) => {

    const users = fileUtils.readDb();
    const userIndex = users.findIndex(user => {

        return user.id === parseInt(id)
    })

    if (userIndex === -1) {
        return null;
    }

    users[userIndex].ime = userData.ime || users[userIndex].ime
    users[userIndex].prezime = userData.prezime || users[userIndex].prezime
    users[userIndex].email = userData.email === undefined ? users[userIndex].email : userData.email
    users[userIndex].brojTelefona = userData.brojTelefona === undefined ? users[userIndex].brojTelefona : userData.brojTelefona

    fileUtils.writeDb(users);
    return users[userIndex];
}

exports.delete = (id) => {
    const users = fileUtils.readDb();
    const filteredUsers = users.filter(user => user.id !== parseInt(id))

    if (filteredUsers.length === users.length) {
        return null;
    }

    fileUtils.writeDb(filteredUsers);
    return id;
}