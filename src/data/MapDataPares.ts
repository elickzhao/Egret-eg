class MapDataPares {
	public static createMapData(val:number[]):void{
		//val地图不出现的格子,因为l1为第一关所以val为空,即所有格子都出现. val便是l1.json里的map[]
		var len:number = val.length;	//地图数据长度	val里好像记录着不可用地图的编号
		GameData.unmapnum = len;

		var index:number = 0;
		for(var i = 0; i<len; i++){
			index = val[i];
			var row:number = Math.floor(index/GameData.MaxColumn);
			var col: number = index % GameData.MaxRow;
			GameData.mapData[row][col] = -1;	// 设置不可用的地图块,不过想现在还没有往可用地图块添加元素
		}

		GameData.currentElementNum = GameData.MaxRow * GameData.MaxColumn - len;	//可用地图块数量
	}
}