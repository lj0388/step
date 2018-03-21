class LoginScene extends BaseScene{
    /**
     * 构造函数
     */
    public constructor(){
        super();
    }

    /**
     * 进入Scene调用
     */
    public onEnter():void
	{
        super.onEnter();

        //this.addLayerAt(LayerManager.Game_Main, 0);
        this.addLayer(LayerManager.UI_Main);
        // this.addLayer(LayerManager.UI_Popup);
        // this.addLayer(LayerManager.UI_Message);
        // this.addLayer(LayerManager.UI_Tips);


        //初始登录界面
        App.ViewManager.open(ViewConst.Login);

        var uid:string = (Math.random()* 100000).toString();
        //var uid:string = GlobalData.testUid;
        var name:string = "name_" + uid;
        var icon:string = "icon_" + uid;

        //请求数据
        App.ControllerManager.applyFunc(UserConst.LOGIN_C2S, UserConst.LOGIN_C2S, uid.toString(),name,icon);
    }

    /**
     * 退出Scene调用
     */
    public onExit():void
	{
        super.onExit();
    }
}