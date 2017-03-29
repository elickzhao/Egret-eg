class GameElement extends BaseElement {
	//id为初始时排序位置与location相同,不过随着游戏进行 方块不停移动, location将不断变化 但id将是唯一的 所以不能作为位置信息
	public id:number = 0;			// 元素id
	public location:number = 0;		// 元素位置
}