class RecordItemRender extends eui.ItemRenderer 
{

    public imgIcon:IconImg;
	public imgIcon2:IconImg;
	public lblScore:eui.Label;
	public lblName:eui.Label;
	public lblName2:eui.Label;
    public imgRandom:eui.Image;

    public constructor() 
    {
        super();
     
        this.touchEnabled = false;
    }


    public dataChanged() 
    {
		super.dataChanged();

        this.imgIcon.loadImage(GlobalData.userIcon);
        this.lblName.text = GlobalData.userName;        
        this.lblScore.text = this.data.result;
        
        if (this.data.groupId == "-1")
        {
             //this.imgIcon2.texture = RES.getRes("random_icon_png");
             this.imgIcon2.visible = false;
             this.imgRandom.visible = true;
             this.lblName2.text = "Random"
        }
        else
        {
            this.imgIcon2.visible = true;
            this.imgRandom.visible = false;
          
            this.imgIcon2.loadImage(this.data.icon);
            this.lblName2.text = this.data.name;
        }
        
    }

}