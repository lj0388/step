class MatchResultView extends BaseEuiView
{
	public imgIcon:eui.Image;
	public hbox:eui.Group;
	public lblName:eui.Label;
	public lblName2:eui.Label;
	public lblState:eui.Label;

	public btnCancel:eui.Button;
	public btnRandomMatch:eui.Button;
	
	public constructor(controller:BaseController, parent:eui.Group) 
	{
		super(controller, parent);

		this.skinName = "resource/skins/MatchResultSkin.exml";
	}

	public initUI():void 
	{
		super.initUI();		
	
		this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCancelClick, this);
		this.btnRandomMatch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnRandomMatchClick, this);
	}

	public open(...param:any[]):void 
	{
		var data:any = param[0];
		
		if (data.state == MatchState.Invalid)
		{
			this.lblState.text = "This challenge is no longer availble";
		}
		else if (data.state == MatchState.Refuse)
		{
			this.lblState.text = data.name + " has refused your challenge";
		}
		
		if (GlobalData.isDev)
			return;
			
		let imgLoader:egret.ImageLoader = new egret.ImageLoader();
		imgLoader.crossOrigin = "anonymous";
		imgLoader.once(egret.Event.COMPLETE, (evt:egret.Event) =>
		{
			var loader:egret.ImageLoader = <egret.ImageLoader>evt.currentTarget;
			this.imgIcon.bitmapData = loader.data;			
		}, this);		

		imgLoader.load(GlobalData.userModel.icon);

		this.lblName.text = GlobalData.userModel.name;

		this.updateGroupRoles(GlobalData.contextId);		//更新对战角色信息	
    }

	public updateGroupRoles(groupId:string)
	{	

		if (GlobalData.isDev)
			return;
		
		this.hbox.removeChildren();

		var j:number = 0;

		egretfb.EgretFBInstant.context.getPlayersAsync().then((players) => 
		{
			for (var i:number = 0; i < players.length; i++)
			{
				if (i >= 3)
					break;

				this.loadImg(players[i].getPhoto());
			}			

			this.lblName2.text = players.length.toString() + " friends";
		});		
	}

	private loadImg(icon:string):void
	{
		let imgLoader:egret.ImageLoader = new egret.ImageLoader();
		imgLoader.crossOrigin = "anonymous";
		imgLoader.once(egret.Event.COMPLETE, (evt:egret.Event) =>
		{
			var loader:egret.ImageLoader = <egret.ImageLoader>evt.currentTarget;
			
			var img:eui.Image = new eui.Image();
			img.width = 182;
			img.height = 182;
			img.bitmapData = loader.data;
			this.hbox.addChild(img);		
		
		}, this);		
		imgLoader.load(icon);
	}

	private btnCancelClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Match_Cancel);
	}

	private btnRandomMatchClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Match_Mode, MatchType.Random);
	}

	
}