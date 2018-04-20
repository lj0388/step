class IconHead extends eui.Group 
{
	public imgBg:eui.Image;
	public img:eui.Image;
	public circle:egret.Shape;

	public constructor() 
	{
		super();
		
		
		this.imgBg = new eui.Image();
		this.imgBg.x = 0;
		this.imgBg.y = 0;
		this.imgBg.width = 190;
		this.imgBg.height = 190;
		this.imgBg.horizontalCenter = 0;
		this.imgBg.verticalCenter = 0;
		this.addChild(this.imgBg);
		

		this.img = new eui.Image();
		this.img.width = 160;
		this.img.height = 160;
		this.img.x = 15;
		this.img.y = 15;
		this.addChild(this.img);

		this.circle = new egret.Shape();
		this.circle.graphics.beginFill(0x0000ff);
		this.circle.graphics.drawCircle(75,75,75);
		this.circle.graphics.endFill();
		this.circle.x = 20;
		this.circle.y = 20;
		this.addChild(this.circle);

		this.img.mask = this.circle;		
	}

	public loadImage(url:string):void
	{
		this.imgBg.texture = RES.getRes("icon_bg_png");

		var imgLoader:egret.ImageLoader = new egret.ImageLoader();
		imgLoader.crossOrigin = "anonymous";
		
		imgLoader.once(egret.Event.COMPLETE, (evt:egret.Event) =>
		{
			var loader:egret.ImageLoader = <egret.ImageLoader>evt.currentTarget;
			var t:egret.Texture = new egret.Texture();
			t.bitmapData = loader.data;			
			this.img.texture = t;					
			
		}, this);		

		imgLoader.load(url);
	}
}