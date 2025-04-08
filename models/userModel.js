// models/userModel.js

class User {
    constructor({ id, username, email, name, password }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.name = name;
        this.password = password;
    }
}

module.exports = User;
