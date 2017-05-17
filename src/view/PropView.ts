class PropView extends egret.Sprite {
	public constructor(type: number) {
		super();
		this._type = type;	//道具类型
		this.init();
	}

	//道具元素界面
	private _view_box: egret.Bitmap;		//道具盒子
	private _view_activate: egret.Bitmap;	//激活道具图像
	private _numText: egret.BitmapText;		//数字文本
	private _type = -1;						//道具类型
	public id: number = -1;

	private init() {
		this.createviewe();
		this.createNumText();
		this.addChild(this._view_activate);
		this.addChild(this._view_box);
		this.addChild(this._numText);
		this.setActivateState(true);	//设置激活状态
	}

	private createNumText() {
		this._numText = new egret.BitmapText();
		this._numText.font = RES.getRes("number_fnt");
		this._numText.x = this._view_activate.width - 31;
	}

	//创建道具盒子 把道具都显示在这个上
	private createviewe() {
		var _interval: number = -15;
		var _width: number = (GameData.stageW - _interval * 6) / 5;
		if (!this._view_activate) {
			this._view_activate = new egret.Bitmap();
			this._view_activate.texture = RES.getRes(this.getActivateTexture(this._type));
			this._view_activate.width = _width;
			this._view_activate.height = _width;
		}
		if (!this._view_box) {
			this._view_box = new egret.Bitmap();
			this._view_box.texture = RES.getRes("propbox_png");
			this._view_box.width = this._view_activate.width + 10;
			this._view_box.height = this._view_activate.width + 10;
			this._view_box.x = - 5;
			this._view_box.y = - 5;
		}

	}

	private _num: number = 0; //数量
	public get num(): number {
		return this._num;
	}

	public set num(val: number) {
		this._num = val;
		this._numText.text = val.toString();
		if (val < 0) {
			this.setActivateState(false);
		} else {
			this.setActivateState(true);
		}
	}

	private setActivateState(val: boolean) {
		this.touchEnabled = val;
		if (val) {
			this._view_activate.texture = RES.getRes(this.getActivateTexture(this._type));
			this._view_box.texture = RES.getRes("propbox_png");
			this._numText.font = RES.getRes("number_fnt");
		} else {	//激活之前默认为不可点击
			this._view_activate.texture = RES.getRes(this.getDisableTexture(this._type));
			this._view_box.texture = RES.getRes("propboxdisable_png");
			this._numText.font = RES.getRes("numberdisable_fnt");
		}
	}

	//不同道具 不同显示图片
	private getActivateTexture(type: number): string {
		var textturename: string = "";
		switch (type) {
			case 0:
				textturename = "tongse_png";
				break;
			case 1:
				textturename = "zhadon_png";
				break;
			case 2:
				textturename = "zhenghong_png";
				break;
			case 3:
				textturename = "zhenglie_png";
				break;
			case 4:
				textturename = "chanzi_png";
				break;
		}
		return textturename;
	}
	private getDisableTexture(type: number): string {
		var textturename: string = "";
		switch (type) {
			case 0:
				textturename = "tongsedisable_png";
				break;
			case 1:
				textturename = "zhadondisable_png";
				break;
			case 2:
				textturename = "zhenghongdisable_png";
				break;
			case 3:
				textturename = "zhengliedisable_png";
				break;
			case 4:
				textturename = "chanzidisable_png";
				break;
		}
		return textturename;
	}

	//焦点图片 给激活道具套在里面 显示当前使用的道具
	public setFocus(val: boolean) {
		if (val) {
			this._view_box.texture = RES.getRes("propboxactive_png");
		} else {
			this._view_box.texture = RES.getRes("propbox_png");
		}
	}

}