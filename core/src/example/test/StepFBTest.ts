class StepFBTest 
{
	public constructor() 
	{
		this.initSDK();
	}

    private initSDK()
    {
        FBInstant.initializeAsync().then
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
         FBInstant.setLoadingProgress(itemsLoaded / itemsTotal);
    }

    private onResourceLoadComplete():void 
    {      
        
        FBInstant.startGameAsync().then
        {
            GlobalData.userId = FBInstant.player.getID();
            GlobalData.userName = FBInstant.player.getName();
            GlobalData.userIcon = FBInstant.player.getPhoto();
            GlobalData.contextId = FBInstant.context.getID();
            GlobalData.contextType = FBInstant.context.getType();  
        
            var data:any = FBInstant.getEntryPointData();
            if (data.hasOwnProperty("senderId"))
                GlobalData.senderId = data.senderId;

            this.startGame();
        }      
    }

    private startGame()
    {
        App.Init();

        this.initModule();       
	   
		this.initSocket();

        //App.SoundManager.setBgOn(false);
        //App.SoundManager.setEffectOn(false);  

        //App.SceneManager.runScene(SceneConsts.Battle);
    }

	private serverUrl:string = "wss://sdk.vrseastar.com/step";

	private initSocket():void
	{
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