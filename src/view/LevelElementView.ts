class LevelElementView extends egret.Sprite {
	public constructor() {
		super();
		this.init();
	}

	public eltype: string = ""; //代表元素类型

	private bitmap: egret.Bitmap; //元素图
	private checkmarkbit: egret.Bitmap;	//对勾图  就是对号呗
	private bittext: egret.BitmapText;


	public set num(val: number) {
		if (val <= 0) {
			//已经没了,显示对号,不在显示数字
			if (!this.checkmarkbit) {
				this.checkmarkbit = new egret.Bitmap();
				this.checkmarkbit.texture = RES.getRes("checkmark_png");
				//这意思是把对号移动到元素中心位置啊
				this.checkmarkbit.x = (this.bitmap.width - this.checkmarkbit.width) / 2;
				this.checkmarkbit.y = this.bitmap.height + this.bitmap.y - this.checkmarkbit.height / 2;
				this.addChild(this.checkmarkbit);
				this.removeChild(this.bittext);
			}
		} else {
			this.bittext.text = val.toString();
		}
	}

	public get num(): number {
		return Number(this.bittext.text);
	}

	private init() {
		this.touchChildren = false;
		if (!this.bitmap) {
			this.bitmap = new egret.Bitmap();
		}
		var bitwidth: number = (GameData.stageW - 40) / GameData.MaxColumn;
		this.bitmap.width = bitwidth;
		this.bitmap.height = bitwidth;	//正方形呗
		this.addChild(this.bitmap);

		this.bittext = new egret.BitmapText();
		this.bittext.font = RES.getRes("number_fnt");
		this.bittext.text = "0"
		this.bittext.x = (bitwidth - this.bittext.width) / 2;
		this.bittext.y = this.bitmap.height + this.bitmap.y - this.bittext.height / 2
	}

	//设置关卡纹理,这样可以根据不同关卡设置不同的背景图了
	public setTexture(val:string){
		this.bitmap.texture = RES.getRes(val);
	}
}