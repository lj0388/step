class FriendMatchView extends BaseEuiView
{
	public imgIcon:IconImg;
	public lblName:eui.Label;
	public lblName2:eui.Label;

	public lblTime:eui.Label;
	public btnCancel:eui.Button;
	public btnRandomMatch:eui.Button;

	public hbox:eui.Group;

	public constructor(controller:BaseController, parent:eui.Group) 
	{
		super(controller, parent);

		this.skinName = "resource/skins/FriendMatchSkin.exml";
	}

	public initUI():void 
	{
		super.initUI();
		
		this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCancelClick, this);
		this.btnRandomMatch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnRandomMatchClick, this);
	}

	public open(...param:any[]):void 
	{
		console.log("friendMatch");
		
		var data:any = param[0];

		this.imgIcon.loadImage(GlobalData.userIcon);

		this.lblName.text = GlobalData.userName;

		this.showMatchTime(GlobalData.matchTime);		

		this.updateGroupRoles(GlobalData.contextId);		//更新对战角色信息
    }

	private btnCancelClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Match_Cancel);
	}

	private btnRandomMatchClick(e:egret.TouchEvent):void
	{
		//this.applyFunc(IndexConst.Random_Match);
		this.applyFunc(IndexConst.Match_Mode, MatchType.Random);
	}
	
	public updateGroupRoles(groupId:string)
	{	
		// if (GlobalData.contextId == "-1")
		// 	return;
		
		this.hbox.removeChildren();

		FBInstant.context.getPlayersAsync().then((players) => 
		{
			var len:number = players.length;

			if (len == 1)
			{
				var img:IconImg = new IconImg();
				img.width = img.height = 190;			
				this.hbox.addChild(img);			
				this.lblName2.text = "";
			}

			if (len == 2)
			{
				for (var i:number = 0; i < 2; i++)
				{
					if (players[i].getID() != GlobalData.userId)
					{
						var img:IconImg = new IconImg();	
						img.width = img.height = 190;				
						img.loadImage(players[i].getPhoto());
						this.hbox.addChild(img);		

						this.lblName2.text = players[i].getName();
					}
				}
			}

			if (len > 2)
			{
				var j:number = 0;

				for (var i:number = 0; i < players.length; i++)
				{
					if (players[i].getID() == GlobalData.userId)
						continue;
					
					if (j <= 2)
					{
						var img:IconImg = new IconImg();		
						img.width = img.height = 190;				
						img.loadImage(players[i].getPhoto());
						this.hbox.addChild(img);	
						j++;
					}								
				}			
				
				this.lblName2.text = players.length.toString() + " friends";
			}
			
		});		
	}

	private lastTime = 0;

	public showMatchTime(time:number):void
	{
		this.lastTime = time;
		this.lblTime.text = App.DateUtils.getFormatBySecond(this.lastTime, 3);

		App.TimerManager.doTimer(1000, time, this.onMatchTime, this, this.onMatchTimeOver);
	}

	private onMatchTime():void
	{
		this.lastTime--;
		this.lblTime.text = App.DateUtils.getFormatBySecond(this.lastTime, 3);
	}

	private onMatchTimeOver():void
	{
		App.TimerManager.remove(this.onMatchTime, this);
	
		this.lblTime.text = "00:00";	
		this.applyFunc(IndexConst.Match_TimeOver);
	}	

	public close(...param:any[]):void 
	{
		App.TimerManager.remove(this.onMatchTime, this);
    }

}