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

        // if (!GlobalData.isDev)
        // {
        //     egretfb.EgretFBInstant.player
        // }
      
        // if (!GlobalData.isDev)
        // {
        //     rid = egretfb.EgretFBInstant.context.getID();
        // }

        var uid:string = GlobalData.userId;
        var name:string = GlobalData.userName;
        var icon:string = GlobalData.userIcon;
        var contextId:string = GlobalData.contextId;
        var senderId:string = GlobalData.senderId;

        if (GlobalData.isDev)
        {
            // uid = (Math.random()* 100000).toString();
            // name = "name_" + uid;
            // icon = "icon_" + uid;     
            // App.ControllerManager.applyFunc(ControllerConst.Login, UserConst.LOGIN_C2S, uid,name,icon);

            uid = "u0002";
            contextId = "c0001";
            GlobalData.contextId = contextId;
            name = "name_" + uid;
            icon = "https://image.flaticon.com/icons/png/512/809/809476.png";     
            App.ControllerManager.applyFunc(ControllerConst.Login, UserConst.LOGIN_C2S, uid, name, icon);

            return;      
        }

        //请求数据

        if (GlobalData.senderId != null)
        {
            App.ControllerManager.applyFunc(ControllerConst.Login, UserConst.Invite_LOGIN_C2S, uid,name,icon,contextId,senderId);
        }
        else
        {
            App.ControllerManager.applyFunc(ControllerConst.Login, UserConst.LOGIN_C2S, uid,name,icon);
        }       
    }

    /**
     * 退出Scene调用
     */
    public onExit():void
	{
        super.onExit();
    }
}