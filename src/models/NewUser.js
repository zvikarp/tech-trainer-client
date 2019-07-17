export default class NewUser {

    constructor(name, email, password) {
      this.name = name;
      this.email = email;
      this.password = password;
    }

    toJson(newUser) {
        return {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
        }
    }

  }