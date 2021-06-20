/*
Project - Kinas
© 2019-2021 Skill Drottinn, All rights reserved.
Kakao Bot A.I. Project
*/

const Kinas = {};
Kinas.COMPRESS = "\u200b".repeat(1000);
Kinas.getCoords = (pos) => {
    var gc = new android.location.Geocoder(Api.getContext());
    var addr = gc.getFromLocationName(pos, 1).get(0);
    return {
        x: addr.getLatitude(),
        y: addr.getLongitude()
    };
}
Kinas.getWeather = (pos) => {
    try {
        var gc = new android.location.Geocoder(Api.getContext());
        try {
            var addr = gc.getFromLocationName(pos, 1).get(0);
        } catch (e) {
            return -1;
        }
        var loc = addr.getAddressLine(0);
        var x = addr.getLatitude();
        var y = addr.getLongitude();
        var data = org.jsoup.Jsoup.connect("안얄라줌")
            .header("Content-Type", "application/json")
            .data("x", x + "")
            .data("y", y + "")
            .ignoreContentType(true)
            .ignoreHttpErrors(true)
            .post().wholeText();
        data = JSON.parse(data);
        var result = [];
        for (var n = 0; n < data.length; n++) {
            result[n] = "[" + data[n].date + " 날씨]\n";
            result[n] += "상태 : " + data[n].status + "\n";
            result[n] += "온도 : " + data[n].temp_min + " ~ " + data[n].temp_max + "\n";
            result[n] += "습도 : " + data[n].hum + "\n";
            result[n] += "바람 : " + data[n].wind_dir + ", " + data[n].wind_speed;
        }
        result[0] = "날씨 정보 : " + loc + "\n\n" + result[0];
        return result;
    } catch (e) {
        return null;
    }
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

    /* 날씨 */
    if (cmd[0] == "/날씨") {
        var result = Kinas.getWeather(data);
        if (result == -1) replier.reply("해당 위치를 찾을 수 없어요");
        else if (result == null) replier.reply("날씨 정보 불러오기 실패");
        else replier.reply(result[0] + Kinas.COMPRESS + "\n\n" + result[1] + "\n\n" + result[2]);
    }

}
