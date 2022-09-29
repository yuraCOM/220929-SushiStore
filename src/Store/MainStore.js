import infoDishStore from "./infoDishStore";
import infoMsg from "./infoMsg";
import ShopStore from "./ShopStore";
import UserStore from "./UserStore";

export let MainStore = {
    shopStore: new ShopStore(),
    userNow: new UserStore(),
    infoMsg: new infoMsg(),
    infoDish: new infoDishStore()
}



