class LinkLogic {
	public static lines: number[][];
	public static isHaveLine(): boolean {
		LinkLogic.lines = [];
		var currentType: string = "";
		var typeNum: number = 0;

		//横向所有行每列循环
		// 每行
		for (var i = 0; i < GameData.MaxRow; i++) {
			//每列
			for (var j = 0; j < GameData.MaxColumn; j++) {
				// 如果为可填充地图块
				if (GameData.mapData[i][j] != -1) {
					// 当类型变化时
					if (currentType != GameData.elements[GameData.mapData[i][j]].type) { //这里是主播笔误了 的确如我所想 因为下面列循环改过来了//这句GameData[i][j]是有问题的 因为根本不存在 //感觉应该是GameData.mapData[i][j] 这里存的是id	
						//数量已经大于等于3
						if (typeNum >= 3) {
							//把以上几位id加入数组中
							var arr: number[] = [];
							for (var q = 0; q < typeNum; q++) {
								arr.push(GameData.mapData[i][j - q - 1]);	//从这句可以看出 mapData数组里保存的是id
							}
							//并把数组加入到二维数组
							LinkLogic.lines.push(arr);
						}
						// 小于3 就直接改变类型及数量
						currentType = GameData.elements[GameData.mapData[i][j]].type;
						typeNum = 1;
					} else {
						//类型相同数量+1
						typeNum++;
					}
				} else {
					//如果为不可填充地图块
					if (typeNum >= 3) {
						var arr: number[] = [];
						for (var q = 0; q < typeNum; q++) {
							arr.push(GameData.mapData[i][j - q - 1]);	//这里写 j -1 - q 更好理解 j为当前坐标,不过当前类型已经变了,所以为 上一个坐标开始往前的数量
						}
						LinkLogic.lines.push(arr);
					}
					//小于3 就直接清空重新计数 因为当前块为不可用所以 数量为0
					currentType = "";
					typeNum = 0;
				}
			}

			// 行末 进行判断 否则到最后一块 正好三个就不消除了 
			if (typeNum >= 3) {
				var arr: number[] = [];
				for (var q = 0; q < typeNum; q++) {
					arr.push(GameData.mapData[i][j - q - 1]);
				}
				LinkLogic.lines.push(arr);
			}
			//新起行 重新开始
			currentType = "";
			typeNum = 0;
		}

		// 循环列 纵向寻找
		for (var i = 0; i < GameData.MaxColumn; i++) {
			for (var j = 0; j < GameData.MaxRow; j++) {
				if (GameData.mapData[j][i] != -1) {
					if (currentType != GameData.elements[GameData.mapData[j][i]].type) {
						if (typeNum >= 3) {
							var arr: number[] = [];
							for (var q = 0; q < typeNum; q++) {
								arr.push(GameData[j - q - 1][i]);
							}
							LinkLogic.lines.push(arr);
						}
						currentType = GameData.elements[GameData.mapData[j][i]].type;
						typeNum = 1;
					} else {
						typeNum++;
					}
				} else {
					if (typeNum >= 3) {
						var arr: number[] = [];
						for (var q = 0; q < typeNum; q++) {
							arr.push(GameData.mapData[j - q - 1][i]);
						}
						LinkLogic.lines.push(arr);
					}
					currentType = "";
					typeNum = 0;
				}
			}
			if (typeNum >= 3) {
				var arr: number[] = [];
				for (var q = 0; q < typeNum; q++) {
					arr.push(GameData.mapData[j - q - 1][i]);
				}
				LinkLogic.lines.push(arr);
			}
			currentType = "";
			typeNum = 0;
		}

		if (LinkLogic.length != 0) {
			return true;
		} else {
			return false;
		}
	}
}