class IconImg extends eui.Image
{
	public constructor() 
	{
		super();
	}

	public loadImage(url:string):void
	{
		let imgLoader:egret.ImageLoader = new egret.ImageLoader();
		imgLoader.crossOrigin = "anonymous";
		imgLoader.once(egret.Event.COMPLETE, (evt:egret.Event) =>
		{
			var loader:egret.ImageLoader = <egret.ImageLoader>evt.currentTarget;
			this.bitmapData = loader.data;			
		}, this);		

		imgLoader.load(url);
	}
}