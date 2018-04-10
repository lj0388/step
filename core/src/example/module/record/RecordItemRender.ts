class RecordItemRender extends eui.ItemRenderer 
{

    public imgIcon:eui.Image;
	public imgIcon2:eui.Image;
	public lblScore:eui.Label;
	public lblName:eui.Label;
	public lblName2:eui.Label;


    public constructor() 
    {
        super();
     
        this.touchEnabled = false;
    }


    public dataChanged() 
    {
		super.dataChanged();

		this.lblScore.text = "4:3";
    }

    public partAdded(partName:string, instance:any):void 
    {
        super.partAdded(partName, instance);
       
        if (!this.data)
            return;
        
        var imgLoader:egret.ImageLoader = new egret.ImageLoader();
		imgLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
		imgLoader.crossOrigin = "anonymous";
		imgLoader.load(this.data.icon);   
    }

    private loadCompleteHandler(event:egret.Event):void 
    {
        var imageLoader = <egret.ImageLoader>event.currentTarget;
        let texture = new egret.Texture();
        texture._setBitmapData(imageLoader.data);
		this.imgIcon.texture = texture;
        // var bitmap:egret.Bitmap = new egret.Bitmap(texture);
        // this.hbox.addChild(bitmap);
    }
}