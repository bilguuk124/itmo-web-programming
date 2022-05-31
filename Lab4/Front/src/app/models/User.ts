export class User {
  login:string;
  password:string;

  setPassword(pass){
    this.password = pass;
  }
  setLogin(login){
    this.login=login;
  }
}
