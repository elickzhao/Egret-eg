var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapDataPares = (function () {
    function MapDataPares() {
    }
    MapDataPares.createMapData = function (val) {
        //val地图不出现的格子,因为l1为第一关所以val为空,即所有格子都出现. val便是l1.json里的map[]
        var len = val.length; //地图数据长度	val里好像记录着不可用地图的编号
        GameData.unmapnum = len;
        var index = 0;
        for (var i = 0; i < len; i++) {
            index = val[i];
            var row = Math.floor(index / GameData.MaxColumn);
            var col = index % GameData.MaxRow;
            GameData.mapData[row][col] = -1; // 设置不可用的地图块,不过想现在还没有往可用地图块添加元素
        }
        GameData.currentElementNum = GameData.MaxRow * GameData.MaxColumn - len; //可用地图块数量
    };
    return MapDataPares;
}());
__reflect(MapDataPares.prototype, "MapDataPares");
//# sourceMappingURL=MapDataPares.js.map