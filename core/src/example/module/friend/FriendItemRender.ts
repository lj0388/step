// TypeScript file

class FriendItemRender extends eui.ItemRenderer 
{
    // public titleDisplay:eui.Label;
    // public priceDisplay:eui.Label;
    // public timeDisplay:eui.Label;
    // public iconDisplay:eui.Image;

    public imgGroup:eui.Group;
    public lblNum:eui.Label;
    public btnBattle:eui.Button;

    public constructor() 
    {
        super();
        this.imgGroup.touchEnabled = false;
        this.lblNum.touchEnabled = false;
    }


    public dataChanged() 
    {
        super.dataChanged();
       
        if (this.imgGroup) 
        {
           
        }
      
        if (this.lblNum) 
        {
           
        }
        if (this.btnBattle) 
        {
           
        }        
       
    }

    public partAdded(partName:string, instance:any):void 
    {
        super.partAdded(partName, instance);
       
        if (!this.data)
            return;
        
        var friends:any[] = this.data.friends;
        var groupId:string = this.data.groupId;

        for (var i:number = 0; i < friends.length; i++)
        {
            var obj:any = friends[i];
            //var img:eui.Image = new eui.Image();
            //img.source = 
            var imgLoader:egret.ImageLoader = new egret.ImageLoader();
            imgLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
            imgLoader.crossOrigin = "anonymous";
            imgLoader.load(obj.icon);
        }
      
        this.lblNum.text = friends.length.toString();       
    }

    private loadCompleteHandler(event:egret.Event):void 
    {
        var imageLoader = <egret.ImageLoader>event.currentTarget;
        let texture = new egret.Texture();
        texture._setBitmapData(imageLoader.data);
        var bitmap:egret.Bitmap = new egret.Bitmap(texture);
        this.imgGroup.addChild(bitmap);
    }

      // if (this.imgGroup) 
        // {
        //     egretfb.EgretFBInstant.context.getPlayersAsync().then((players) => 
        //     {
        //         players.map(function(player) 
        //         {
        //             //egret.ImageLoader.crossOrigin = "anonymous";
        //             var imgLoader:egret.ImageLoader = new egret.ImageLoader();
        //             imgLoader.crossOrigin = "anonymous";
        //             imgLoader.load(player.getPhoto());
        //             //var img:eui.Image = new eui.Image();
        //             //img.crossOrigin
                    
                    
        //             egret.log("photo: " + player.getPhoto);
        //         });
        //         egret.log('getPlayersAsync:', JSON.stringify(players));
        //     }, (err) => {
        //         egret.log('getPlayersAsync error', JSON.stringify(err));
        //     })
        // }
}