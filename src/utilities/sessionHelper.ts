export default class SessionHelper{
    get isAdmin(){
        return sessionStorage.getItem("isAdmin") && sessionStorage.getItem("isAdmin") === "true";
    }
}