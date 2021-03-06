class MapControl {
	public constructor() {
	}

	public createElementAllMap() {
		this.createAllMap();
	}

	//创建任意数量类型
	public createElements(num: number): string[] {
		var types: string[] = [];
		for (var i = 0; i < num; i++) {
			types.push(this.createType());
		}
		return types;
	}

	//针对某个元素更新他的类型
	public changeTypeById(id: number) {
		GameData.elements[id].type = this.createType();
	}

	//根据当前删除的元素,刷新地图所有元素的位置
	public updateMapLocation() {
		var ids: number[] = [];
		var len: number = LinkLogic.lines.length; //需要更改的元素的所有信息

		for (var i = 0; i < len; i++) {
			var l: number = LinkLogic.lines[i].length;
			for (var j = 0; j < l; j++) {
				var rel: boolean = false;
				var ll: number = ids.length;
				//这个循环是用于去重的
				for (var r = 0; r < ll; r++) {
					if (ids[r] == LinkLogic.lines[i][j]) {
						rel = true;
					}
				}
				if (!rel) {	//这个判断是用于去除重复ID,如果重复的话就为true了  
					this.changeTypeById(LinkLogic.lines[i][j]);	//消除的元素重新设置类型
					ids.push(LinkLogic.lines[i][j]);	//新元素类型加入这个数组  把二维数组转化成一维的
				}
			}
		}


		len = ids.length;
		var colarr: number[] = [];	//记录列编号

		for (i = 0; i < len; i++) {
			rel = false;

			//这个循环应该也是去重
			for (var j = 0; j < colarr.length; j++) {
				if (colarr[j] == GameData.elements[ids[i]].location % GameData.MaxColumn) {
					return true;
				}
			}

			if (!rel) {
				colarr.push(GameData.elements[ids[i]].location % GameData.MaxColumn);
			}
		}

		var colelids: number[];	//列当中的元素id
		len = colarr.length;	//整列处理  所以是 列编号的列都得处理

		for (var i = 0; i < len; i++) {
			var newcolids: number[] = [];	//新列id
			var removeids: number[] = [];	//移除id
			for (var j = GameData.MaxRow - 1; j >= 0; j--) {
				rel = false;
				for (var k = 0; k < ids.length; k++) {
					removeids.push(ids[k]);	//移除的id
					rel = true;
				}
				if (!rel) {
					if (GameData.mapData[j][colarr[i]] != -1) {
						newcolids.push(GameData.mapData[j][colarr[i]]);	//把id放入新id数组里
					}
				}
			}
			newcolids = newcolids.concat(removeids);	//也就是把删除的元素放到了数组的最后边 也就相当于最顶上吧
			for (var j = GameData.MaxRow - 1; j >= 0; j--) {
				if (GameData.mapData[j][colarr[i]] != -1) {
					GameData.mapData[j][colarr[i]] = newcolids[0];	//赋值id
					GameData.elements[newcolids[0]].location = j * GameData.MaxRow + colarr[i];	//location数值
					newcolids.shift();	//删除头部元素
				}
			}
		}

	}

	//创建地图空白元素
	private createAllMap() {
		var len: number = GameData.MaxRow * GameData.MaxColumn;
		var type: string = "";
		var havelink: boolean = true;
		var id: number = 0;
		var ztype: string = "";
		var htype: string = "";
		for (var i = 0; i < GameData.MaxRow; i++) {
			for (var j = 0; j < GameData.MaxColumn; j++) {
				while (havelink) {
					type = this.createType();
					if (i > 1 && GameData.mapData[i - 1][j] != -1 && GameData.mapData[i - 2][j] != -1) {
						//生成地图时 三连是不允许出现的	
						//纵向三连
						if (GameData.elements[GameData.mapData[i - 1][j]].type == GameData.elements[GameData.mapData[i - 2][j]].type) {
							ztype = GameData.elements[GameData.mapData[i - 1][j]].type;
						}
					}

					//横向三连
					if (i > 1 && GameData.mapData[i][j - 1] != -1 && GameData.mapData[i][j - 2] != -1) {
						//生成地图时 三连是不允许出现的	
						if (GameData.elements[GameData.mapData[i][j - 1]].type == GameData.elements[GameData.mapData[i][j - 2]].type) {
							htype = GameData.elements[GameData.mapData[i][j - 1]].type;
						}
					}

					if (type != ztype && type != htype) {
						havelink = false;
					}
				}
				id = GameData.unusedElements[0];
				GameData.elements[id].type = type;
				GameData.elements[id].location = i * GameData.MaxRow + j;
				GameData.mapData[i][j] = id;
				GameData.unusedElements.shift();
				havelink = true;
				ztype = htype = "";
			}
		}
	}

	private createType(): string {
		return GameData.elementTypes[Math.floor(Math.random() * GameData.elementTypes.length)].toString();
	}
}