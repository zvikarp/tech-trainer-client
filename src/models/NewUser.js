export default class NewUser {

    constructor(name, nickname, email, password) {
      this.name = name;
      this.nickname = nickname;
      this.email = email;
      this.password = password;
    }

    toJson(newUser) {
        return {
            name: newUser.name,
            nickname: newUser.nickname,
            email: newUser.email,
            password: newUser.password
        }
    }

  }