class BattleController extends BaseController 
{
	private model:BattleModel;
	private proxy:BattleProxy;

	private battleView:BattleView;
    private battleUIView:BattleUIView;
	
    //private battleResultView:BattleResultView;
    private victoryView:VictoryView;
    private failView:FailView;

	public constructor() 
	{
		super();

		this.model = new BattleModel(this);
		this.proxy = new BattleProxy(this);
        GlobalData.battleModel = this.model;

		this.battleView = new BattleView(this, LayerManager.Game_Main);
        App.ViewManager.register(ViewConst.Battle, this.battleView);

        this.battleUIView = new BattleUIView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.BattleUI, this.battleUIView);

        this.victoryView = new VictoryView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Victory, this.victoryView);

        this.failView = new FailView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Fail, this.failView);

        // this.battleResultView = new BattleResultView(this, LayerManager.UI_Main);
        // App.ViewManager.register(ViewConst.BattleResultUI, this.battleResultView);

		//注册模块消息
        //this.registerFunc(BattleConst.BattleInit, this.InitBattle, this);
	    this.registerFunc(BattleConst.Move_End, this.onMoveEnd, this);		        //移动终点
        this.registerFunc(BattleConst.Get_Player, this.getPlayer, this);       

        this.registerFunc(BattleConst.MovePlayer_S2C, this.onMovePlayerMsg, this);     //远程角色移动
        this.registerFunc(BattleConst.MoveEnd_S2C, this.onMoveEndMsg, this);     //远程角色移动
	}


    private onMoveEnd(uid:string):void
    {
        
        this.proxy.moveEndC2S(uid);
        //this.showBattleResultUI(true);
        //App.ViewManager.open(ViewConst.Victory);
    }

    private onMoveEndMsg(data:any):void
    {        
        this.battleUIView.gameOver();
        
        var player:Player = this.battleView.getPlayer(data.uid);
        if (data.win == "1")
        {
            player.win();
            App.ViewManager.open(ViewConst.Victory, data);               
        }
        else
        {
            player.lose();
            App.ViewManager.open(ViewConst.Fail, data);
        }      
    }

	/**
     * 获取主角
     * @returns {Hero}
     */
    private getPlayer(uid:string):Player 
	{
        return this.battleView.getPlayer(uid);
    }

    private onMovePlayerMsg(data:any):void
    {
        var player:Player = this.battleView.getPlayer(data.uid);
        
        if (player == null)
            return;

        player.nextStepByServer(data.step);
    }

	
	// private InitBattle(matchPlayer: any)
    // {
    //     // this.gameModel.mapId = mapId;
    //     // this.gameModel.playerData = {
    //     //     mcName: "scenePlayer_0",
    //     //     propertyData: {
    //     //         name: "yangsong",
    //     //         title: "[开发者]",
    //     //         vip: 8,
    //     //         attackDis: 3,
    //     //         attackInterval: 1500,
    //     //         hp: 9999999
    //     //     }
    //     // }
    //     // this.gameModel.monsterNum = 200;

    //     App.ViewManager.open(ViewConst.Battle, this.model);
	// 	App.ViewManager.open(ViewConst.BattleUI, this.model)
    // }
}