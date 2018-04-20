class IconImg extends eui.Group 
{
	public imgBg:eui.Image;
	public img:eui.Image;
	public circle:egret.Shape;

	public constructor() 
	{
		super();
		
		console.log("wh11 " + this.width + " / " + this.height);
		
		this.touchEnabled = false;
		this.touchChildren = false;
	}

	protected createChildren(): void
	{
		super.createChildren();
		
		this.imgBg = new eui.Image();
		// this.imgBg.x = 0;
		// this.imgBg.y = 0;
		this.imgBg.width = this.width;
		this.imgBg.height = this.height;
		this.imgBg.horizontalCenter = 0;
		this.imgBg.verticalCenter = 0;
		this.addChild(this.imgBg);
		

		this.img = new eui.Image();
		this.img.width = this.width * 0.8;
		this.img.height = this.height * 0.8;
		// this.img.x = 15;
		// this.img.y = 15;
		this.img.horizontalCenter = 0;
		this.img.verticalCenter = 0;
		this.img.texture = RES.getRes("headnull_png");
		this.addChild(this.img);

		var r:number = this.width * 0.4;
		this.circle = new egret.Shape();
		this.circle.graphics.beginFill(0x0000ff);
		this.circle.graphics.drawCircle(r,r,r);
		this.circle.graphics.endFill();
		this.circle.x = (this.width - this.circle.width) / 2;
		this.circle.y = (this.height - this.circle.height) / 2;
	
		this.addChild(this.circle);

		this.img.mask = this.circle;	

		console.log("wh22 " + this.width + " / " + this.height);	
	}

	protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void
	{
		super.updateDisplayList(unscaledWidth, unscaledHeight);
		console.log("wh33 " + this.width + " / " + this.height);	

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

		imgLoader.load(this.url);
	}


	private url:string;

	public loadImage(url:string):void
	{
		this.url = url;
		this.invalidateDisplayList();	
	}
}

// class IconImg extends eui.Image
// {
// 	public constructor() 
// 	{
// 		super();
// 	}

// 	public loadImage(url:string):void
// 	{
// 		var imgLoader:egret.ImageLoader = new egret.ImageLoader();
// 		imgLoader.crossOrigin = "anonymous";
		
// 		imgLoader.once(egret.Event.COMPLETE, (evt:egret.Event) =>
// 		{
// 			var loader:egret.ImageLoader = <egret.ImageLoader>evt.currentTarget;
// 			var t:egret.Texture = new egret.Texture();
// 			t.bitmapData = loader.data;			
// 			this.texture = t;					
			
// 		}, this);		

// 		imgLoader.load(url);
// 	}
// }