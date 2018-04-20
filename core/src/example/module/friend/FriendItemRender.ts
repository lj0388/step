// TypeScript file

class FriendItemRender extends eui.ItemRenderer 
{
    public hbox:eui.Group;
    public lblNum:eui.Label;
    public btnFriendMatch:eui.Button;

    public constructor() 
    {
        super();

        //this.skinName = "resource/skins/FriendItemSkin.exml";
        // this.hbox.touchEnabled = false;
        // this.lblNum.touchEnabled = false;
    }

    public dataChanged() 
    {
        super.dataChanged();

        this.hbox.removeChildren();  
        
        var friends:any[] = this.data.friends;
        var groupId:string = this.data.groupId;
        
        var len:number = friends.length;
        
        for (var i:number = 0; i < len; i++)
        {
            var img:IconImg = new IconImg();
            img.width = 86;
            img.height = 86;
            img.loadImage(friends[i].icon);
            this.hbox.addChild(img);		
        }

        this.lblNum.text = friends.length.toString();

    }

    // public dataChanged() 
    // {
    //     super.dataChanged();

    //     var friends:any[] = this.data.friends;
    //     var groupId:string = this.data.groupId;

    //     //this.hbox.removeChildren();  
    //     var num:number = this.hbox.numChildren;
    //     var len:number = friends.length;

    //     var j:number = 0;
    //     for (var i:number = 0; i < num; i++)
    //     {
    //         this.hbox.getChildAt(i).visible = false;

    //         if (i >= len)
    //             continue;
            
    //         this.hbox.getChildAt(i).visible = true;

    //         var obj:any = friends[i];
    //         let imgLoader:egret.ImageLoader = new egret.ImageLoader();
    //         imgLoader.crossOrigin = "anonymous";
    //         imgLoader.once(egret.Event.COMPLETE, (evt:egret.Event) =>
    //         {
    //             var loader:egret.ImageLoader = <egret.ImageLoader>evt.currentTarget;
                
    //             //var ii:number = i;
    //             var img:eui.Image = this.hbox.getChildAt(j) as eui.Image;
    //             img.bitmapData = loader.data;

    //             j++;
    //             // let texture = new egret.Texture();
    //             // texture.bitmapData = loader.data;
    //             // img.texture = texture;
               
    //         }, this);
            
    //         imgLoader.load(obj.icon);
    //     }

    //     this.lblNum.text = friends.length.toString();
    // }

   
}