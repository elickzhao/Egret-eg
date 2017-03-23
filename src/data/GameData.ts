class GameData {

	public static unmapnum: number = 0;		//没用到的地图数 空白地图
	public static mapData: number[][];		//地图数据
	public static stepNum: number = 0;		//当前玩家剩余步数
	public static levelStepNum: number = 0;	//过关需要的最大步数
	public static elementTypes: number[];	//当前关卡出现的类型
	public static levelreq: LevelRequire;	//过关条件,就是需要消除不同类型元素的数量 还有一些操作方法
	public static elements: GameElement[];	//游戏元素对象池 //8*8最长64
	public static unusedElements: number[]; //未使用的元素
	public static levelBackgroundImageName: string = "";	//当前关卡背景图

	public static MaxRow: number = 8;		//最大行数
	public static MaxColumn: number = 8;		//最大列数
	public static currentElementNum: number = 0;	//地图可用元素数量, 不是正方形地图 有镂空的

	//初始化所有数据
	public static initData() {
		GameData.mapData = [];
		for (var i = 0; i < GameData.MaxRow; i++) {
			var arr:number[] = [];	//他这里有问题 这个没用到不说 下面也是一维数组 但定义的时候是二维的 
			for (var j = 0; j < GameData.MaxColumn; j++) {
				// 地图填充的都是元素id,初始化时 -1 为地图块不可用 -2 为可用,但未放置元素
				 //GameData.mapData[j].push(-2);	// 所以初始化的时候 把所有地图块设置为-2	//有可能不是 j 而是 i GameData.mapData[i].push(-2);
				 //GameData.mapData[i][j] = -2;	//我感觉应该这么写 // 恩这句应该和 GameData.mapData[i].push(-2); 等同 因为都是数字下标从0开始
				// arr.push(-2);	//或者这么写

				GameData.mapData[i].push(-2); //还是基于作者的写吧
			}
			//GameData.mapData.push(arr);
		}

		GameData.levelreq = new LevelRequire();	//关卡

		GameData.elements = [];	//元素
		GameData.unusedElements = []; //未使用元素
		var len: number = GameData.MaxRow * GameData.MaxColumn;
		for (var q = 0; q < len; q++) {
			var ele: GameElement = new GameElement();
			ele.id = q;	// 就是64个元素
			GameData.elements.push(ele);		//放入元素数组
			GameData.unusedElements.push(q);	//当前未开始 所以是未使用
		}

		GameData.stageW = egret.MainContext.instance.stage.stageWidth;
		GameData.stageH = egret.MainContext.instance.stage.stageHeight;

	}

	public static stageW: number = 0;
	public static stageH: number = 0;

}