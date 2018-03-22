class MovieType
{
    // /**
    //  * tile类型
    //  * @type {number}
    //  */
    // Idle = 1,        //待机
	// Move = 2,  		//移动
	// Hurt = 3, 		//受伤
	// Win = 4, 		//胜利
	// Lose = 5			//失败
	public static Idle:string = "idle";
    public static Move:string = "move";
	public static Hurt:string = "hurt"; 		
    public static Win:string = "win";
    public static Lost:string = "lose";
}

class Player extends egret.DisplayObjectContainer
{
	public uid:string;
	public name:string;
	public icon:string;

	public isStart:boolean = true;		//是否开始
	public isEnd:boolean = false;		//是否结束
	public isTrap:boolean = false;		//是否陷阱

	public view:BattleView;
	
	private h:number = 90;
	private w:number = 100;

	private currentIndex = 1;	//当前步
	private currentRow = 1;		//当前行
	private currentCol = 1; 	//当前列
	private direction = 1;		//当前朝向

	private oldTile:MapTile = null;	//上一个格子
	
	private mc:egret.MovieClip;
	private bitmap:egret.Bitmap;
	public constructor() 
	{
		super();
		// this.bitmap = new egret.Bitmap();
		// this.addChild(this.bitmap);
	}

	public initData(data:any):void
	{
		this.uid = data.uid;
		this.name = data.name;
		this.icon = data.icon;

		if (GlobalData.userModel.isOwn(this.uid))		 
		{
			this.mc = App.MovieClipFactory.createMC("hero", "hero");
		}
		else
		{
			//this.mc = App.MovieClipFactory.createMC("monster", "monster");
			this.mc = App.MovieClipFactory.createMC("hero", "hero");
			this.alpha = 0.5;
		}			
		
		//this.texture = RES.getRes("role_yongshi");		 	 
		this.addChild(this.mc);
		this.mc.gotoAndStop("idle");
		this.mc.anchorOffsetX = this.mc.width / 2;
	}

	public initPosition(data:any):void
	{
		 this.x = (data.col - 1) * BattleData.tileWidth + this.w / 2;
         this.y = -(data.row - 1) * BattleData.tileHeight - this.h;
		
		 this.oldTile = data;
	}

	//自己
	private currentStep:number;

	public nextStep(step:number)
	{		

		if (!this.isStart)
			return;
		
		if (this.isEnd)
			return;

		if (this.isTrap)
			return;

		this.currentStep = step;

		var targetIndex = this.currentIndex + step;

		var tile:MapTile = this.view.cells[targetIndex];
		
		if (tile == null)
			return;
		
		if (step > 0)
			this.sendData(step);		//同步坐标

		this.goTo(tile.row, tile.col);		
		this.changeDirection(tile.face);			
		this.changePlayerStateByTile(tile);
		//this.changeTileState(tile);

		if (tile.type == TileType.End)
		{
			this.view.applyFunc(BattleConst.Move_End, this.uid);
		}

		this.mapTo(tile);		//这里应该发送nextstep消息，然后地图接收消息地图负责自己是否需要移动 待优化..

		this.currentIndex = targetIndex;
		this.oldTile = tile;
	}

	public lastStep(step:number)
	{
		this.nextStep(step * -1);
	}

	//远程
	public nextStepByServer(step:number)
	{
		var targetIndex = this.currentIndex + step;
		if (!this.view.cells.hasOwnProperty(targetIndex.toString()))
			return;

		var tile:MapTile = this.view.cells[targetIndex];
		this.goTo(tile.row, tile.col);		
		this.changeDirection(tile.face);				
		this.changePlayerStateByTile(tile);
		//this.changeTileState(tile);
		this.currentIndex = targetIndex;
		this.oldTile = tile;
	}

	private sendData(step:number)
	{
		var msg:any = 
		{
            "uid":this.uid,
			"step":step
        };
		App.Socket.sendSocketMsg(ServerConst.MOVE_C2S, msg);
	}

	public goTo(row:number, col:number)
	{
		var posX = (col - 1) * BattleData.tileWidth + this.w / 2;
        var posY = -(row - 1) * BattleData.tileHeight - this.h;
	
		// this.x = posX;
		// this.y = posY;
		egret.Tween.removeTweens(this);
		var tw = egret.Tween.get(this);
		tw.to({x:posX, y:posY}, 100);
	}

	private changeDirection(f:number)
	{
		this.direction = f;
		this.scaleX = f;		
	}

	private oldState:string;
	private changePlayerState(state:string)
	{
		if (this.oldState != state)
			this.playAnimation(state);
		
		this.oldState = state;
	}

	private changePlayerStateByTile(tile:MapTile)
	{
		if (tile.type == TileType.Trap)
		{
			this.isTrap = true;
			//播放陷阱动画
			this.waitCD();
			this.changePlayerState(MovieType.Hurt);			
		}

		else if (tile.type == TileType.End)
		{
			this.isEnd = true;
			this.changePlayerState(MovieType.Win);
		}
		else
		{
			this.changePlayerState(MovieType.Move);
		}
	}

	private playAnimation(name:string):void
	{
		this.mc.gotoAndPlay(name, 1);
	}

	private waitCD():void
	{
		App.TimerManager.doTimer(2000, 1, this.waitOver, this);
	}

	private waitOver():void
	{
		this.isTrap = false;
		this.lastStep(this.currentStep);
	}

	private onHurtComplete():void
	{
		this.lastStep(this.currentStep);
		//this.mc.removeEventListener(egret.Event.COMPLETE,this.onHurtComplete,this);		
	}

	// private changeTileState(tile:MapTile)
	// {
	// 	this.oldTile.up();
	// 	tile.down();
	// }

	private mapTo(tile:MapTile)
	{
		if (tile.row <= 2)
			return;
		
		if (tile.type == TileType.Trap)
			return;
		
		var num:number = tile.row - this.oldTile.row;

		if (num > 0)
		{
			egret.Tween.removeTweens(this.view.gameObjcetLayer);
			var tw = egret.Tween.get(this.view.gameObjcetLayer);
			var targetY = this.view.gameObjcetLayer.y + BattleData.tileHeight * num;
			//this.view.gameObjcetLayer.y = targetY;
			tw.to({y:targetY}, 100);
		}
	}
}