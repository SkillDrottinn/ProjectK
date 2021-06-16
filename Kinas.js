/*
Project - Kinas
© 2019-2021 Skill Drottinn, All rights reserved.
Kakao Bot A.I. Project
*/

const Kinas = {};
Kinas.getCoords = (pos) => {
    var gc = new android.location.Geocoder(Api.getContext());
    var addr = gc.getFromLocationName(pos, 1).get(0);
    return {
        x: addr.getLatitude(),
        y: addr.getLongitude()
    };
}


response = (room, msg, sender, isGroupChat, replier) => {
    var cmd = msg.split(" ");
    var data = msg.replace(cmd[0] + " ", "");

    /* 검색 */
    if (cmd[0] == "/검색") {
        replier.reply("https://m.search.naver.com/search.naver?query=" + encodeURI(data));
    }

    /*길찾기*/
    if (cmd[0] == "/길찾기") {
        var pos = data.split("->");
        var start = Kinas.getCoords(pos[0]);
        var end = Kinas.getCoords(pos[1]);
        var url = "https://m.map.naver.com/directions/#/publicTransit/list/" +
            pos[0] + "," + start.y + "," + start.x + "," + start.y + "," + start.x + ",false,/" +
            pos[1] + "," + end.y + "," + end.x + "," + end.y + "," + end.x + ",false,/0";
        replier.reply(url);
    }

}
