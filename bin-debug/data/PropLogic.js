var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 道具逻辑类
 */
var PropLogic = (function () {
    function PropLogic() {
    }
    PropLogic.useProp = function (proptye, ellocation) {
        switch (proptye) {
            case 0:
                PropLogic.tongse(ellocation);
                break;
            case 1:
                PropLogic.zhandan(ellocation);
                break;
            case 2:
                PropLogic.zhenghang(ellocation);
                break;
            case 3:
                PropLogic.zhenglie(ellocation);
                break;
            case 4:
                PropLogic.chanzi(ellocation);
                break;
        }
    };
    //消除同色元素
    PropLogic.tongse = function (loc) {
        LinkLogic.lines = []; // 这个数组是判断是否能消除的
        var arr = []; // 保存消除的元素的数组
        var type = GameData.elements[GameData.mapData[Math.floor(loc / GameData.MaxColumn)][loc % GameData.MaxRow]].type;
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var j = 0; j < GameData.MaxColumn; j++) {
                if (GameData.mapData[i][j] != -1 && GameData.elements[GameData.mapData[i][j]].type == type) {
                    arr.push(GameData.mapData[i][j]);
                }
            }
        }
        LinkLogic.lines.push(arr);
        /**
         * XXX 很大的疑问 这个GameData.mapData到现在没给赋值  还是初始化赋值 -2 不过从代码来看 应该是数组保存的是 elements的id
         * 但还有个问题 GameData.elements[]数组 push里面的是 GameElement 却没看到定义下标 那如何通过 GameData.elements[id]找到元素呢
         * 看来还得转换回头仔细看看啊 等这段都看完的时候
         * 现在在我看来他们几个的关系 通过点击位置数值换算 GameData.mapData[Math.floor(loc / GameData.MaxColumn)][loc % GameData.MaxRow]
         * 得到该地图上该元素ID 通过GameData.elements[ID] 获得该元素一些信息 比如 type 还有 location  这里 location == loc 应该是一致的
         * GameData.elements[id].id != GameData.elements[id].location  ID是不会变的生成以后 在变化位置的时候保存在 地图信息里
         * GameData.mapData[row][col] = ID  但是 location 是会变的 根据 地图信息而改变
         *
         * 什么鬼 通过下面的代码来看  arr.push(GameData.elements[GameData.mapData[i][j]].id);
         * 那么GameData.mapData[i][j]保存的是 elements 这个对象了 并不是 elements的id
         * 这样GameData.elements[GameData.mapData[i][j]]当然能说通了  不过如果保存的是 对象的话 那id和location 不也会存在 还何必转个弯
         * 真是搞不懂了
         *
         */
    };
    //四周消除
    PropLogic.zhandan = function (loc) {
        LinkLogic.lines = new Array();
        var i = Math.floor(loc / GameData.MaxColumn);
        var j = loc % GameData.MaxRow;
        var arr = new Array();
        arr.push(GameData.elements[GameData.mapData[i][j]].id);
        //上
        if (i > 0 && GameData.mapData[i - 1][j] != -1) {
            arr.push(GameData.elements[GameData.mapData[i - 1][j]].id);
        }
        //下
        if (i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][j] != -1) {
            arr.push(GameData.elements[GameData.mapData[i + 1][j]].id);
        }
        //左
        if (j > 0 && GameData.mapData[i][j - 1] != -1) {
            arr.push(GameData.elements[GameData.mapData[i][j - 1]].id);
        }
        //右
        if (j > (GameData.MaxColumn - 1) && GameData.mapData[i][j + 1] != -1) {
            arr.push(GameData.elements[GameData.mapData[i][j + 1]].id);
        }
        LinkLogic.lines.push(arr);
    };
    //消除整行
    PropLogic.zhenghang = function (loc) {
        LinkLogic.lines = new Array();
        var i = Math.floor(loc / GameData.MaxColumn);
        var arr = new Array();
        for (var j = 0; j < GameData.MaxColumn; j++) {
            if (GameData.mapData[i][j] != -1) {
                arr.push(GameData.elements[GameData.mapData[i][j]].id);
            }
        }
        LinkLogic.lines.push(arr);
    };
    //消除整列
    PropLogic.zhenglie = function (loc) {
        LinkLogic.lines = new Array();
        var j = loc % GameData.MaxRow;
        var arr = new Array();
        for (var i = 0; i < GameData.MaxRow; i++) {
            if (GameData.mapData[i][j] != -1) {
                arr.push(GameData.elements[GameData.mapData[i][j]].id);
            }
        }
        LinkLogic.lines.push(arr);
    };
    //删除单一元素
    PropLogic.chanzi = function (loc) {
        LinkLogic.lines = new Array();
        LinkLogic.lines.push([GameData.elements[GameData.mapData[Math.floor(loc / GameData.MaxColumn)][loc % GameData.MaxRow]].id]);
    };
    return PropLogic;
}());
__reflect(PropLogic.prototype, "PropLogic");
//# sourceMappingURL=PropLogic.js.map