class StepFBTest 
{
	public constructor() 
	{
		this.initSDK();
	}

    private initSDK()
    {
        egretfb.EgretFBInstant.initializeAsync().then
        {
            this.loadAssets();
        }
    }

    private loadAssets()
    {
        var groupName:string = "preload";
        var subGroups:Array<string> = ["step"];
        App.ResourceUtils.loadGroups(groupName, subGroups, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
    }

    private onResourceLoadProgress(itemsLoaded:number, itemsTotal:number):void 
    {
         egretfb.EgretFBInstant.setLoadingProgress(itemsLoaded / itemsTotal);        
    }

    private onResourceLoadComplete():void 
    {
        egretfb.EgretFBInstant.startGameAsync().then
        {
            GlobalData.userId = egretfb.EgretFBInstant.player.getID();
            GlobalData.userName = egretfb.EgretFBInstant.player.getName();
            GlobalData.userIcon = egretfb.EgretFBInstant.player.getPhoto();
            GlobalData.contextId = egretfb.EgretFBInstant.context.getID();
            GlobalData.contextType = egretfb.EgretFBInstant.context.getType();  
            var data:any = egretfb.EgretFBInstant.getEntryPointData();
            if (data.hasOwnProperty("senderId"))
                GlobalData.senderId = data.senderId;

            this.startGame();
        }      
    }

    private startGame()
    {
        this.initModule();       
	    App.Init();
		this.initSocket();

		//App.SceneManager.runScene(SceneConsts.Battle);
        //App.SoundManager.setBgOn(false);
        //App.SoundManager.setEffectOn(false);  
    }

	private serverUrl:string = "wss://sdk.vrseastar.com/step";

	private initSocket():void
	{
		if (GlobalData.isDev)
			App.Socket.connect();
		else
			App.Socket.connectByUrl(this.serverUrl);
		
        App.MessageCenter.addListener(SocketConst.SOCKET_CONNECT, ()=>
		{
            Log.trace("与服务器连接上");
            //send();
			 //进入游戏
	        App.SceneManager.runScene(SceneConsts.Login);

        }, this);

        App.MessageCenter.addListener(SocketConst.SOCKET_RECONNECT, ()=>
		{
            Log.trace("与服务器重新连接上");
            //send();
        }, this);

        App.MessageCenter.addListener(SocketConst.SOCKET_START_RECONNECT, ()=>
		{
            Log.trace("开始与服务器重新连接");
        }, this);

        App.MessageCenter.addListener(SocketConst.SOCKET_CLOSE, ()=>
		{
            Log.trace("与服务器断开连接");
        }, this);

        App.MessageCenter.addListener(SocketConst.SOCKET_NOCONNECT, ()=>
		{
            Log.trace("服务器连接不上");
        }, this);

        App.MessageCenter.addListener("1001", function(msg):void
		{
            Log.trace("收到服务器消息:", msg);
        }, this);
    }

	 /**
     * 初始化所有模块
     */
    private initModule(): void 
	{
        App.ControllerManager.register(ControllerConst.Login, new UserController());
        App.ControllerManager.register(ControllerConst.Index, new IndexController());
        App.ControllerManager.register(ControllerConst.Battle, new BattleController());
        App.ControllerManager.register(ControllerConst.Friend, new FriendController());
     
    }
}