class ElementViewManageEvent extends egret.Event {

	public static TAP_TWO_ELEMENT: string = "top_two_element";
	public static REMOVE_ANIMATION_OVER: string = "remove_animation_over";
	public static UPDATE_MAP: string = "update_map";
	public static UPDATE_VIEW_OVER: string = "update_view_over";
	public static USER_PROP_CLICK: string = "user_prop_click";

	public propToElementLocation: number = 0; //携带道具点击的元素位置
	public ele1: number = 0; //第一个点击的元素
	public ele2: number = 0; //第二个点击的元素

	public constructor(type: string, bublles: boolean = false, cancelable: boolean = false) {
		super(type, bublles, cancelable);
	}
}