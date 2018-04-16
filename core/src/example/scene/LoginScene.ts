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

        this.addLayer(LayerManager.UI_Main);
        // this.addLayer(LayerManager.UI_Popup);
        // this.addLayer(LayerManager.UI_Message);
        // this.addLayer(LayerManager.UI_Tips);

        //初始登录界面
        App.ViewManager.open(ViewConst.Login);


        if (GlobalData.isDev)
        {
            GlobalData.userId = "u0001";
            GlobalData.contextId = "c0001";       
            GlobalData.userName = "name: " + GlobalData.userId;
            GlobalData.userIcon = "https://image.flaticon.com/icons/png/512/809/809476.png";     
        }
        
        App.ControllerManager.applyFunc(ControllerConst.Login, UserConst.Invite_LOGIN_C2S, GlobalData.userId,GlobalData.userName,GlobalData.userIcon,GlobalData.contextId,GlobalData.senderId);                 
    }

    /**
     * 退出Scene调用
     */
    public onExit():void
	{
        super.onExit();
    }