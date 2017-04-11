class GameBackGround extends egret.Sprite {
	public constructor() {
		super();
	}

	public changebackground(): void {
		this.cacheAsBitmap = false;
		this.removeChildren();
		this.createBackgroundImage();
		this.createMapBg();
		this.createLevelReqBg();
		this.createStepBg();
		this.cacheAsBitmap = true;
	}

	private bgImage: egret.Bitmap;
	private girdBg: egret.Bitmap[];  //这个特别注意下,这是定义了指定类型的数组

	// 创建背景图
	private createBackgroundImage() {
		if (!this.bgImage) {
			this.bgImage = new egret.Bitmap();
		}

		this.bgImage.texture = RES.getRes(GameData.levelBackgroundImageName);
		this.bgImage.width = GameData.stageW;
		this.bgImage.height = GameData.stageH;
		this.addChild(this.bgImage);

		//道具背景图
		var propbg: egret.Bitmap = new egret.Bitmap();
		propbg.texture = RES.getRes("propbg_png"); //这个图片需要自己修改
		propbg.width = GameData.stageW;
		propbg.height = GameData.stageW / 5 + 20; //这里他应该又写错了. 难道是和道具图片等高 所以计算出来的???
		propbg.y = GameData.stageH - propbg.height;	//定义道具背景图位置, 屏幕下方
		this.addChild(propbg);

	}

	//这应该是背景格子方块
	private createMapBg() {
		if (!this.girdBg) {
			this.girdBg = new Array();
		}
		var gird: egret.Bitmap;
		var girdwidth: number = (GameData.stageW - 40) / GameData.MaxColumn;
		var startY: number = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - girdwidth * GameData.MaxColumn;	// 见了鬼了 怎么又那宽度算  最后那个应该是 MaxRow才对吧
		for (var i = 0; i < GameData.MaxRow; i++) {
			for (var j = 0; j < GameData.MaxColumn; j++) {
				if (GameData.mapData[i][j] != -1) {
					if (this.girdBg.length < (i * GameData.MaxRow + j)) {
						gird = new egret.Bitmap();
						this.girdBg.push(gird);
					} else {
						gird = this.girdBg[i * GameData.MaxRow + j];
					}
					gird.width = girdwidth;
					gird.height = girdwidth;
					gird.x = 20 + girdwidth * j;
					gird.y = startY + girdwidth * j;
					//单数行一种皮肤 双数行一种皮肤
					if ((i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1)) {
						gird.texture = RES.getRes("elementbg1");
					} else {
						gird.texture = RES.getRes("elementbg2");
					}
					this.addChild(gird);
				}
			}
		}
	}

	//每关背景图上面不是设定了么	//这块实在不懂他说的什么意思	//可能是标题框框之类的
	private createLevelReqBg() {
		var girdwidth: number = (GameData.stageW - 40) / GameData.MaxColumn;
		var bg: egret.Bitmap = new egret.Bitmap();
		bg.texture = RES.getRes("levelreqbg_png");
		bg.width = GameData.levelreq.getLevelReqNum() * (10 + girdwidth) + 20;
		bg.height = girdwidth + 60;
		bg.x = 20;
		bg.y = 50;
		this.addChild(bg);

		var bgtxt: egret.Bitmap = new egret.Bitmap();
		bgtxt.texture = RES.getRes("levelreqtitle_png");
		bgtxt.x = bg.x + (bg.width - bgtxt.width) / 2;
		bgtxt.y = bg.y - 18;
		this.addChild(bgtxt);
	}

	//步数背景图 和 文字
	private createStepBg(){
		var bg: egret.Bitmap = new egret.Bitmap();
		bg.texture = RES.getRes("levelreqbg_png");
		bg.width = 100;
		bg.height = 100;
		bg.x = GameData.stageW - 110;
		bg.y = 50;
		this.addChild(bg);

		var bgtxt: egret.Bitmap = new egret.Bitmap();
		bgtxt.texture = RES.getRes("levelreqtitle_png");
		bgtxt.x = bg.x + (bg.width - bgtxt.width) / 2;
		bgtxt.y = bg.y + 10;
		this.addChild(bgtxt);
	}

}