/*
Project - Kinas
© 2019-2021 Skill Drottinn, All rights reserved.
Kakao Bot A.I. Project
*/

function response(room, msg, sender, isGroupChat, replier) {
    var cmd = msg.split(" ");
    var data = msg.replace(cmd[0] + " ", "");

    /* 검색 */
    if (cmd[0] == "/검색") {
        replier.reply("https://m.search.naver.com/search.naver?query=" + encodeURI(data));
    }

}