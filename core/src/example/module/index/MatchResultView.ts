class MatchResultView extends BaseEuiView
{
	public imgIcon:IconImg;
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

	private tms:number = 0;
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
		
		this.imgIcon.loadImage(GlobalData.userModel.icon);

		this.lblName.text = GlobalData.userModel.name;

		this.updateGroupRoles(GlobalData.contextId);		//更新对战角色信息

		this.tms = egret.setTimeout(this.closeUI,this,3000);
    }

	private closeUI():void
	{
		if (this.tms > 0)
		{
			egret.clearTimeout(this.tms);
			App.ViewManager.closeView(this);
			this.tms = 0;
		}	
	}

	public updateGroupRoles(groupId:string)
	{	
		if (GlobalData.contextId == "-1")
			return;
		
		this.hbox.removeChildren();

		var j:number = 0;

		FBInstant.context.getPlayersAsync().then((players) => 
		{
			this.lblName2.text = players.length.toString() + " friends";

			for (var i:number = 0; i < players.length; i++)
			{
				if (i >= 3)
					break;

				var img:IconImg = new IconImg();
				img.width = 182;
				img.height = 182;
				img.loadImage(players[i].getPhoto());
				this.hbox.addChild(img);				
			}			
		});		
	}

	private btnCancelClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Match_Cancel);
	}

	private btnRandomMatchClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Match_Mode, MatchType.Random);
	}

	public close(...param:any[]):void 
	{
		this.closeUI();
    }
}