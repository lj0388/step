class BattleScene extends BaseScene {
    /**
     * 构造函数
     */
	public constructor() 
	{
		super();
	}

    /**
     * 进入Scene调用
     */
	public onEnter(...param:any[]): void 
	{
		super.onEnter();

		this.addLayerAt(LayerManager.Game_Main, 0);
		this.addLayer(LayerManager.UI_Main);
		
		App.ViewManager.open(ViewConst.Battle);
		App.ViewManager.open(ViewConst.BattleUI);
 		
		//播放背景音乐
		//App.SoundManager.playBg("sound_bg");

		//var matchPlayer:any = param[0];

		//App.ControllerManager.applyFunc(ControllerConst.Battle, BattleConst.BattleInit);
	}

    /**
     * 退出Scene调用
     */
	public onExit(): void 
	{
		super.onExit();
	}
}