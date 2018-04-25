class Eyu extends egret.DisplayObjectContainer
{
	public maxX:number = 400;
	public minX:number = 200;

	private mc:egret.MovieClip;

	//private currentDis:number = 0;
	private speed:number = 2;

	private direction:number = 1;
	private timeOnEnterFrame = 0;

	public constructor() 
	{
		super();

		this.mc = App.MovieClipFactory.createMC("eyu", "eyu");
		this.addChild(this.mc);		
		this.mc.frameRate = 12;
		this.mc.gotoAndPlay("start", -1);

		//this.mc.x = -this.mc.width / 2;
		App.TimerManager.doTimer(30,0, this.onTimer, this);
	}

	private onTimer(event:egret.TimerEvent) 
	{
		this.x += this.speed * this.direction;

		//console.log("currentDis " + this.x + " / speed " + this.speed);
		
		if (this.x > this.maxX)
		{
			this.x = this.maxX;
			this.direction = -this.direction;
			this.mc.scaleX = -this.mc.scaleX;
		}

		if (this.x < this.minX)
		{
			this.x = this.minX;
			this.direction = -this.direction;
			this.mc.scaleX = -this.mc.scaleX;
		}
	}	 
}