class Eyu extends egret.DisplayObjectContainer
{
	private mc:egret.MovieClip;

	private distance:number = 400;
	private currentDis:number = 0;
	private speed:number = 5;
	private direction:number = 1;

	public constructor() 
	{
		super();

		this.mc = App.MovieClipFactory.createMC("eyu", "eyu");

		this.addChild(this.mc);

		this.mc.play();
		
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}

	private onEnterFrame(e:egret.Event)
	{
		this.currentDis += this.speed * this.direction;

		if (this.currentDis >= this.distance || this.currentDis <= 0)
		{
			this.direction = -this.direction;
			this.mc.scaleX = -this.mc.scaleX;
		}
	}
	 
}