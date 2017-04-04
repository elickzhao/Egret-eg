class LinkLogic {

	public static lines: number[][];
	//判断是否有消除的元素
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

	// 是否无法消除,刷新地图
	public static isNextHaveLine(): boolean {
		for (var i = 0; i < GameData.MaxRow; i++) {
			for (var j = 0; j < GameData.MaxColumn; j++) {
				if (GameData.mapData[i][j] != -1) {
					if (j < (GameData.MaxColumn - 1) && GameData.mapData[i][j + 1]! - 1 && GameData.elements[GameData.mapData[i][j]].type == GameData.elements[GameData.mapData[i][j + 1]].type) {
						if (j > 0 && GameData.mapData[i][j - 1] != -1) {
							//左侧三个方块  
							// 左上
							if (i > 0 && j > 0 && GameData.mapData[i - 1][j - 1] && GameData.mapData[i - 1][j - 1] != -1 && GameData.elements[GameData.mapData[i - 1][j - 1]].type == GameData.elements[GameData.mapData[i][j]].type) {
								return true;
							}
							//这是从右边界往里数两个格子  左下
							if (i < (GameData.MaxRow - 1) && j > 0 && GameData.mapData[i + 1][j - 1] && GameData.mapData[i + 1][j - 1] != -1 && GameData.elements[GameData.mapData[i + 1][j - 1]].type == GameData.elements[GameData.mapData[i][j]].type) {
								return true;
							}
							//这个是同行 往外数两列  左侧
							if (j > 1 && GameData.mapData[i][j - 2] && GameData.mapData[i - 1][j - 2] && GameData.mapData[i - 1][j - 2] != -1 && GameData.elements[GameData.mapData[i - 1][j - 2]].type == GameData.elements[GameData.mapData[i][j]].type) {
								return true;
							}
						}
						if (j > (GameData.MaxColumn - 1) && GameData.mapData[i][j + 2] != -1) {
							//右侧三个方块  
							// 右上	加2是这个原因啊  因为是当前位置 而且必须下一个横向位置与当前位置类型相同  所以必须跳过下一个位置 也就是两个相同元素并列 现在的当前位置是左侧第一个元素
							if (j < (GameData.MaxColumn - 2) && i > 0 && GameData.mapData[i - 1][j + 2] && GameData.mapData[i - 1][j + 2] != -1 && GameData.elements[GameData.mapData[i - 1][j + 2]].type == GameData.elements[GameData.mapData[i][j]].type) {
								return true;
							}
							//这是从右边界往里数两个格子  右下
							if (j < (GameData.MaxColumn - 2) && i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][j + 2] && GameData.mapData[i + 1][j + 2] != -1 && GameData.elements[GameData.mapData[i + 1][j + 2]].type == GameData.elements[GameData.mapData[i][j]].type) {
								return true;
							}
							//这个是同行 往外数两列  右侧
							if (j < (GameData.MaxColumn - 3) && GameData.mapData[i][j + 3] && GameData.mapData[i][j + 3] != -1 && GameData.elements[GameData.mapData[i][j + 3]].type == GameData.elements[GameData.mapData[i][j]].type) {
								return true;
							}
						}
					}
					// 纵向判断
					if (i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][j] != -1 && GameData.elements[GameData.mapData[i][j]].type == GameData.elements[GameData.mapData[i + 1][j]].type) {
						if (i > 0 && GameData.mapData[i - 1][j] != -1) {
							//上方三个方块  
							// 前
							if (i > 1 && GameData.mapData[i - 2][j] && GameData.mapData[i - 2][j] != -1 && GameData.elements[GameData.mapData[i - 2][j]].type == GameData.elements[GameData.mapData[i][j]].type) {
								return true;
							}
							//左
							if (i > 0 && j > 0 && GameData.mapData[i - 1][j - 1] && GameData.mapData[i - 1][j - 1] && GameData.mapData[i - 1][j - 1] != -1 && GameData.elements[GameData.mapData[i - 1][j - 1]].type == GameData.elements[GameData.mapData[i][j]].type) {
								return true;
							}
							//右
							if (i > 0 && j < (GameData.MaxColumn - 1) && GameData.mapData[i - 1][j + 1] && GameData.mapData[i - 1][j + 1] != -1 && GameData.elements[GameData.mapData[i - 1][j + 1]].type == GameData.elements[GameData.mapData[i][j]].type) {
								return true;
							}
						}
						if (i < (GameData.MaxRow - 2) && GameData.mapData[i + 2][j] != -1) {
							//下方三个方块  
							// 左
							if (j > 0 && GameData.mapData[i + 2][j - 1] && GameData.mapData[i + 2][j - 1] != -1 && GameData.elements[GameData.mapData[i + 2][j - 1]].type == GameData.elements[GameData.mapData[i][j]].type) {
								return true;
							}
							//右	 //这里他写的是 GameData.MaxColumn - 2 我有点疑问 我觉得是 -1
							if (j < (GameData.MaxColumn - 1) && GameData.mapData[i + 2][j + 1] && GameData.mapData[i + 2][j + 1] != -1 && GameData.elements[GameData.mapData[i + 2][j + 1]].type == GameData.elements[GameData.mapData[i][j]].type) {
								return true;
							}
							//后
							if (i < (GameData.MaxRow - 3) && GameData.mapData[i + 3][j] && GameData.mapData[i + 3][j] != -1 && GameData.elements[GameData.mapData[i + 3][j]].type == GameData.elements[GameData.mapData[i][j]].type) {
								return true;
							}
						}
					}
					//XXX 方式二
					//横向右侧相隔一个方块的类型是否相同
					if (j < (GameData.MaxColumn - 2) && GameData.mapData[i][j + 2] != -1 && GameData.elements[GameData.mapData[i][j]].type == GameData.elements[GameData.mapData[i][j + 2]].type) {
						//中间这个格子是可用的
						if (GameData.mapData[i][j + 1] != -1) {
							if (i > 0 && GameData.mapData[i - 1][j + 1] && GameData.mapData[i - 1][j + 1] != -1 && GameData.elements[GameData.mapData[i - 1][j + 1]].type == GameData.elements[GameData.mapData[i][j]].type) {
								console.log("-2能消除项目1!!!", i, j);
								return true;
							}
							// 因为需要+1 所以必须 GameData.MaxRow - 1 要不该加出界外了
							if (i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][j + 1] && GameData.mapData[i + 1][j + 1] != -1 && GameData.elements[GameData.mapData[i + 1][j + 1]].type == GameData.elements[GameData.mapData[i][j]].type) {
								console.log("-2能消除项目1!!!", i, j);
								return true;
							}
						}
					}
					if (i < (GameData.MaxRow - 2) && GameData.mapData[i + 2][j] != -1 && GameData.elements[GameData.mapData[i][j]].type == GameData.elements[GameData.mapData[i + 2][j]].type) {
						//中间这个格子是可用的
						if (GameData.mapData[i + 1][j] != -1) {
							// 下面 i < (GameData.MaxRow - 1) 好像是可以不写的 是因为上面的条件  i < (GameData.MaxRow - 2)  必然 i < (GameData.MaxRow - 1) 但是作者写了 先留着吧
							if (i < (GameData.MaxRow - 1) && j > 0 && GameData.mapData[i + 1][j - 1] && GameData.mapData[i + 1][j - 1] != -1 && GameData.elements[GameData.mapData[i + 1][j - 1]].type == GameData.elements[GameData.mapData[i][j]].type) {
								console.log("-2能消除项目1!!!", i, j);
								return true;
							}
							// 因为需要+1 所以必须 GameData.MaxColumn - 1 要不该加出界外了 i 是因为上面的条件  GameData.MaxRow - 2) 所以不用在约定了
							if (j < (GameData.MaxColumn - 1) && GameData.mapData[i + 1][j + 1] && GameData.mapData[i + 1][j + 1] != -1 && GameData.elements[GameData.mapData[i + 1][j + 1]].type == GameData.elements[GameData.mapData[i][j]].type) {
								console.log("-2能消除项目1!!!", i, j);
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	}

	//判断是否能交换位置 只要位置相邻 就可以移动
	public static canMove(id1: number, id2: number): boolean {
		//id为初始时排序位置与location相同,不过随着游戏进行 方块不停移动, location将不断变化 但id将是唯一的 所以不能作为位置信息
		var l1row: number = Math.floor(GameData.elements[id1].location / GameData.MaxRow);
		var l1col: number = GameData.elements[id1].location & GameData.MaxColumn;

		var l2row: number = Math.floor(GameData.elements[id2].location / GameData.MaxRow);
		var l2col: number = GameData.elements[id2].location & GameData.MaxColumn;

		//行相同
		if (l1row == l2row) {
			if (Math.abs(l1col - l2col) == 1) {
				return true;
			}
		}

		//列相同
		if (l1col == l2col) {
			if (Math.abs(l1row - l2row) == 1) {
				return true;
			}
		}

		return false;
	}

	//全局乱序算法
	public static changeOrder() {
		var arr: number[] = [];
		for (var i = 0; i < GameData.MaxRow; i++) {
			for (var j = 0; j < GameData.MaxColumn; j++) {
				if (GameData.mapData[i][j] != -1) {
					arr.push(GameData.mapData[i][j]);
				}
			}
		}
		var index: number = 0;
		for (var i = 0; i < GameData.MaxRow; i++) {
			for (var j = 0; j < GameData.MaxColumn; j++) {
				index = Math.floor(Math.random() * arr.length);	//Math.random()是产生一个0~1的随机数 所以乘以几 就是0~几的随机数
				GameData.mapData[i][j] = arr[index];	//把随机一个数组位置放入当前位置.
				GameData.elements[arr[index]].location = i * GameData.MaxRow + j;		//所移动的元素的位置,应与地图位置相符
				//arr.slice(index,i);	//选取元素 slice(开始位置,结束位置) 	//这个不对把这是选取又不是删除数组中元素啊
				arr.splice(index, 1);  	// 应该是作者写错了, splice(开始位置,要删除个数,替换元素[可选]) 这个是删除后返回原数组 而slicen()根本不改变原数组 而是将选取赋予一个变量才行 var arr1 = arr.slicen(1,2);
			}
		}
	}

	//交换后判断消除
	public static isHaveLineByIndex(p1: number, p2: number): boolean {
		//说是暂存 但是下面根本没用到
		var p1n: number = p1;
		var p2n: number = p2;
		//获取p1元素id
		var p1id: number = GameData.mapData[Math.floor(p1 / GameData.MaxColumn)][p1 % GameData.MaxRow];
		//获取p12素id
		var p2id: number = GameData.mapData[Math.floor(p2 / GameData.MaxColumn)][p2 % GameData.MaxRow];

		//两个元素交换数值  //所以位置也就交换了  //改变地图上元素的数值
		GameData.mapData[Math.floor(p1 / GameData.MaxColumn)][p1 % GameData.MaxRow] = p2id;
		GameData.mapData[Math.floor(p2 / GameData.MaxColumn)][p2 % GameData.MaxRow] = p1id;

		//判断改变数值后 是否能消除	
		var rel: boolean = LinkLogic.isHaveLine();
		if (rel) {
			//如果能正常连线的话,就把元素的location属性进行改变.  p1的变成p2的 必须保持地图与元素location对应
			GameData.elements[p1id].location = p2;
			GameData.elements[p2id].location = p1;
			return true;
		} else {
			//不能交换就返回原来位置
			GameData.mapData[Math.floor(p1 / GameData.MaxColumn)][p1 % GameData.MaxRow] = p1id;
			GameData.mapData[Math.floor(p2 / GameData.MaxColumn)][p2 % GameData.MaxRow] = p2id;
		}

		return false;
	}
}
