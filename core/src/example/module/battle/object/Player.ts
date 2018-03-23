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
	public static start:string = "start";
	public static Idle:string = "idle";
    public static Move1:string = "move1";
	public static Move2:string = "move2";
	public static Move3:string = "move3";
	public static Move4:string = "move4";
	public static Move5:string = "move5";
	public static Hurt:string = "hurt"; 		
    public static Win:string = "win";
    public static Lose:string = "lose";
}

class Player extends egret.DisplayObjectContainer
{
	private mc:egret.MovieClip;
	private bitmap:egret.Bitmap;
	public view:BattleView;

	public uid:string;
	public name:string;
	public icon:string;

	public isStart:boolean = true;		//是否开始
	public isEnd:boolean = false;		//是否结束
	public isTrap:boolean = false;		//是否陷阱
	public isMove:boolean = false;		//是否在移动
	public isLose:boolean = false;		//是否输了-远程角色

	private currentIndex = 1;		//当前步
	private currentRow = 1;			//当前行
	private currentCol = 1; 		//当前列
	private direction = 1;			//当前朝向

	private offsetX:number = 68;	//动物初始坐标与地格00点偏移量X
	private offsetY:number = 35;	//动物初始坐标与地格00点偏移量Y

	private oldTile:MapTile;		//上一个地格
	private currentTile:MapTile;	//当前地格
	private currentStep:number;		//当前几步
	

	public constructor() 
	{
		super();	
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
		this.mc.addEventListener(egret.MovieClipEvent.COMPLETE, this.OnMotionComplete, this);		
		this.addChild(this.mc);
		this.mc.gotoAndStop(MovieType.Idle);
		//this.mc.anchorOffsetX = this.mc.width / 2;
	}

	private OnMotionComplete(e:egret.MovieClipEvent):void
	{
		if (e.target.currentLabel == MovieType.Move1 || e.target.currentLabel == MovieType.Move2 || e.target.currentLabel == MovieType.Move3
		|| e.target.currentLabel == MovieType.Move4 || e.target.currentLabel == MovieType.Move5)
		{
			if (this.currentTile.type == TileType.Trap)
			{					
				this.changePlayerState(MovieType.Hurt);						
			}
			else if (this.currentTile.type == TileType.End)
			{
				this.changePlayerState(MovieType.Win);			
			}
			else
			{
				this.changePlayerState(MovieType.Idle);		
				//this.mapTo(this.currentTile);		
			}
			this.isMove = false;	
		}
	
		console.log(e.type,e.target.currentLabel,this.mc.currentFrame);
	}

	public initPosition(data:any):void
	{
		 this.x = (data.col - 1) * BattleData.tileWidth + this.offsetX;
         this.y = -(data.row - 1) * BattleData.tileHeight + this.offsetY;
		 this.oldTile = data;
	}

	public nextStep(step:number)
	{		
		if (!this.isStart)
			return;
		
		if (this.isEnd)
			return;

		if (this.isTrap)
			return;

		if (this.isMove)
			return;

		this.currentStep = step;

		var targetIndex = this.currentIndex + step;
	
		if (!this.view.cells.hasOwnProperty(targetIndex.toString()))
			return;
	
		this.currentTile = this.view.cells[targetIndex];

		this.sendData(step);			//同步坐标

		this.goTo(this.currentTile.row, this.currentTile.col);		
				
		this.changePlayerStateByTile(this.currentTile);
		//this.changeTileState(this.currentTile);

		if (this.currentTile.type == TileType.End)
		{
			this.view.applyFunc(BattleConst.Move_End, this.uid);
		}

		this.mapTo(this.currentTile);		//这里应该发送nextstep消息，然后地图接收消息地图负责自己是否需要移动 待优化..

		this.isMove = true;

		this.currentIndex = targetIndex;
		this.oldTile = this.currentTile;
	}

	public lastStep(step:number)
	{
		this.nextStep(step * -1);
	}

	//远程
	public nextStepByServer(step:number)
	{
		this.currentStep = step;
		var targetIndex = this.currentIndex + this.currentStep;
		if (!this.view.cells.hasOwnProperty(targetIndex.toString()))
			return;

		this.currentTile = this.view.cells[targetIndex];
		this.goTo(this.currentTile.row, this.currentTile.col);		
		//this.changeDirection(tile.face);				
		this.changePlayerStateByTile(this.currentTile);
		//this.changeTileState(tile);
		this.currentIndex = targetIndex;
		this.oldTile = this.currentTile;
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
		var posX = (col - 1) * BattleData.tileWidth + this.offsetX;
        var posY = -(row - 1) * BattleData.tileHeight + this.offsetY;
		
		//egret.Tween.removeTweens(this);
		var tw = egret.Tween.get(this);
		tw.wait(6/30*1000).to({x:posX, y:posY});
	}

	private changeDirection(f:number)
	{
		this.direction = f;
		this.scaleX = f;		
	}

	private oldState:string;
	private changePlayerState(state:string)
	{
		if (this.oldState == state)
		 	return;

		if (state == MovieType.Hurt)
		{
			this.isTrap = true;			
			this.hurtCD();
			this.mc.gotoAndPlay(state, 1);
			this.changeDirection(this.currentTile.face);	
		}
		else if (state == MovieType.Win)
		{
			this.isEnd = true;
			this.mc.gotoAndPlay(state, -1);			
		}
		else if (state == MovieType.Lose)
		{
			this.isEnd = true;
			this.mc.gotoAndPlay(state, -1);			
		}
		else if (state == MovieType.Idle)
		{
			this.mc.gotoAndStop(state);
			this.changeDirection(this.currentTile.face);
		}
		else
		{
			this.mc.gotoAndPlay(state, 1);
		}

		this.oldState = state;
	}

	private changePlayerStateByTile(tile:MapTile)
	{
		var rows:number = Math.abs(tile.row - this.oldTile.row);
		var cols:number = Math.abs(tile.col - this.oldTile.col);
		var num:number = tile.index - this.oldTile.index;
		
		if (rows == 0 && cols == 1)
			this.changePlayerState(MovieType.Move1);				
		else if (rows == 0 && cols == 2)
			this.changePlayerState(MovieType.Move2);
		else if (rows == 1 && cols == 0)
			this.changePlayerState(MovieType.Move3);			
		else if (rows == 2 && cols == 0)
			this.changePlayerState(MovieType.Move4);
		else if (rows == 1 && cols == 1)
			this.changePlayerState(MovieType.Move5);
	}

	private hurtCD():void
	{
		this.currentTile.hide();
		
		var lastTile:MapTile = this.view.cells[this.currentIndex - this.currentStep];		

		var posX = (lastTile.col - 1) * BattleData.tileWidth + this.offsetX;
        var posY = -(lastTile.row - 1) * BattleData.tileHeight + this.offsetY;

		//egret.Tween.removeTweens(this);
		var tw = egret.Tween.get(this);
		
		tw.wait(48/30*1000).to({x:posX, y:posY}).call(function (player:Player) 
		{
			player.isTrap = false;
			player.changePlayerState(MovieType.Idle);
			player.x = posX;
			player.y = posY;
			player.changeDirection(lastTile.face);
			player.oldTile = lastTile;
		    player.currentIndex -= player.currentStep;		
			this.currentTile.show();
		}, this, [this]);
		//App.TimerManager.doTimer(2000, 1, this.waitOver, this);
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
		
		// if (this.oldTile.row <= 2)
		// 	return;

		if (tile.type == TileType.Trap)
			return;
		
		var num:number = Math.abs(tile.row - this.oldTile.row);

		if (num > 0)
		{
			
			//egret.Tween.removeTweens(this.view.gameObjcetLayer);
			var tw = egret.Tween.get(this.view.gameObjcetLayer);
			var targetY;
			if (tile.row == 3)
				targetY = this.view.gameObjcetLayer.y + BattleData.tileHeight * 1;
			else
				targetY = this.view.gameObjcetLayer.y + BattleData.tileHeight * num;
			//this.view.gameObjcetLayer.y = targetY;
			tw.wait(200).to({y:targetY}, 200);
		}
	}

	public lose():void
	{
		this.changePlayerState(MovieType.Lose);
	}
}