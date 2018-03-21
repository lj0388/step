class GameTest
{
	public constructor() 
	{
        var groupName:string = "preload";
        var subGroups:Array<string> = ["step"];
        App.ResourceUtils.loadGroups(groupName, subGroups, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
		    
	}

    /**
     * 资源组加载完成
     */
    private onResourceLoadComplete():void 
    {
        this.initModule();
       
	    App.Init();

		this.initSocket();
        //App.SceneManager.runScene(SceneConsts.Battle);

        //音乐音效处理
        //App.SoundManager.setBgOn(false);
        //App.SoundManager.setEffectOn(false);   

    }

    /**
     * 资源组加载进度
     */
    private onResourceLoadProgress(itemsLoaded:number, itemsTotal:number):void 
    {
        App.ControllerManager.applyFunc(ControllerConst.Loading, LoadingConst.SetProgress, itemsLoaded, itemsTotal);
    }


	private initSocket():void
	{
        //发送一条消息到服务器
        // function send():void{
        //     var msg:any = {};
        //     // msg.key = "user_login_c2s";
        //     // msg.body = {
        //     //     "accid" : 888,
        //     //     "tstamp" : 999,
        //     //     "ticket": "yangsong"
        //     // };
        //     msg.key = "1001";
        //     msg.code = "0";
        //     msg.body = {"uid":111};
            
        //     App.Socket.send(msg);
        // }

        App.Socket.connect();
		
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
     
    }
}