//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this); // 这里需要注意的,这里监听的是RES.loadConfig()这会返回一个状态.也就是下面那句,然后调用this.onConfigComplete()这个方法,是这么个流程
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        // console.log("66666");
        var bg = new egret.Shape();
        // 绘画矩形
        bg.graphics.beginFill(0x336699);
        bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        bg.graphics.endFill();
        // 显示矩形,或者添加矩形到场景
        this.addChild(bg);
        // 改变缩放模式
        //this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        var tx = new egret.TextField();
        tx.text = "hello world , i'm elick! 我必须要长一些才行啊,这样才能看到第二行的啊.........";
        tx.size = 32;
        tx.x = 20;
        tx.y = 20;
        tx.width = this.stage.stageWidth - 40; //设置字体宽度否则就会在一行显示
        tx.$touchEnabled = true;
        tx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this); // 1,点击对象 2,回调函数 3,传入egret对象.
        this.addChild(tx);
        // 资源修改后 必须重启下服务 否则显示找不到 
        var batman = new egret.Bitmap(RES.getRes("batman_png"));
        batman.x = 20;
        batman.y = 20;
        this.addChild(batman);
        var captain = new egret.Bitmap(RES.getRes("captain_png"));
        captain.x = 170;
        captain.y = 20;
        this.addChild(captain);
        var superman = new egret.Bitmap(RES.getRes("superman_png"));
        superman.x = 270;
        superman.y = 20;
        superman.anchorOffsetX = 30;
        superman.anchorOffsetY = 40;
        // 如果不修改位置的话,图片会这跟着锚点移动
        superman.x += 30;
        superman.y += 40;
        this.addChild(superman);
        var hulk = new egret.Bitmap(RES.getRes("hulk_png"));
        hulk.x = 370;
        hulk.y = 20;
        this.addChild(hulk);
        this.setChildIndex(batman, this.getChildIndex(captain)); //设定后captain会自动减一的
        this.swapChildren(superman, hulk); //这是教程例子 是指互换景深 这两个图片
        console.log("createGameScene", RES.getRes("superman_png"));
        console.log("display indexes:", this.getChildIndex(bg), this.getChildIndex(batman), this.getChildIndex(captain), this.getChildIndex(superman), this.getChildIndex(hulk));
        this.times = -1;
        var self = this;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            switch (++self.times % 3) {
                case 0:
                    egret.Tween.get(batman).to({ x: superman.x }, 300, egret.Ease.circIn);
                    egret.Tween.get(superman).to({ x: batman.x }, 300, egret.Ease.circIn);
                    break;
                case 1:
                    egret.Tween.get(captain).to({ alpha: .3 }, 300, egret.Ease.circIn).to({ alpha: 1 }, 300, egret.Ease.circIn);
                    break;
                case 2:
                    egret.Tween.get(hulk).to({ scaleX: .4, scaleY: .4 }, 500, egret.Ease.circIn).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.circIn);
                    break;
            }
        }, this);
    };
    Main.prototype.touchHandler = function (evt) {
        var tx = evt.currentTarget;
        this.removeChild(tx);
        var logo = new egret.Bitmap(RES.getRes("egret_icon_png"));
        logo.x = this.stage.stageWidth / 2 - 20;
        logo.y = 20;
        this.addChild(logo);
        console.log(this.getChildIndex(logo));
        //tx.textColor = 0x00ff00;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
