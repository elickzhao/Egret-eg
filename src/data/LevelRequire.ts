class LevelRequire {
	public reqElements: LevelRequireElement[];	// 过关条件 需要清除元素的数组

	public constructor() {
		this.reqElements = [];
	}

	//获得 每关要消除的元素种类的个数
	public getLevelReqNum(): number {
		return this.reqElements.length;
	}

	//添加 过关条件,关卡元素
	public addElement(type: string, num: number) {
		var ele: LevelRequireElement = new LevelRequireElement();
		ele.num = num;
		ele.type = type;
		this.reqElements.push(ele);
	}

	//过关后 清楚关卡元素
	public openChange() {
		this.reqElements = [];
	}

	//改变 过关条件 当消除几个 就要减去几个
	public changeReqNum(type: string, num: number) {
		var l: number = this.getLevelReqNum();
		for (var i = 0; i < l; i++) {
			if (this.reqElements[i].type == type) {
				this.reqElements[i].num -= num;
				return;	//结束当前循环
			}
		}
	}

	// 判断是否过关, 通过判断过关条件判断是否过关.
	public isClear(): boolean {
		var l: number = this.getLevelReqNum();
		for (var i = 0; i < l; i++) {
			if (this.reqElements[i].num > 0) {
				return false;
			}
		}
		return true;
	}
}