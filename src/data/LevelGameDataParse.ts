class LevelGameDataParse {
	public static parseLevelGameData(val:any){
		GameData.stepNum = val.step;	//当期玩家最大步数 当然也就是初始步数
		GameData.levelStepNum = val.step;	// 过关步数
		GameData.elementTypes = val.element;	//本关需要清除的元素类型数组
		GameData.levelBackgroundImageName = val.levelbgimg;	//背景图片
		LevelGameDataParse.parselLevelReq(val.levelreq);	//过关条件解析

	}

	private static parselLevelReq(val:any){
		GameData.levelreq.openChange();
		var len:number = val.length;
		for(var i = 0; i < len; i++ ){
			GameData.levelreq.addElement(val[i].type,val[i].num);
		}		
	}
}