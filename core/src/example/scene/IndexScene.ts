class IndexScene extends BaseScene 
{
	public constructor() 
	{
		super();
	}

	public onEnter():void
	{
		super.onEnter();
		
		this.addLayerAt(LayerManager.Game_Main, 0);
        this.addLayer(LayerManager.UI_Main);
        this.addLayer(LayerManager.UI_Popup);
        this.addLayer(LayerManager.UI_Message);
        this.addLayer(LayerManager.UI_Tips);

		 //运行RpgGame
       // App.ControllerManager.applyFunc(ControllerConst.RpgGame, RpgGameConst.GameInit, mapId);

        //开启UI部分
        App.ViewManager.open(ViewConst.Index);

        //播放背景音乐
        App.SoundManager.playBg("sound_bg");
	}
       
	public onExit():void
	{
        super.onExit();
    }
	
}