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
       
    //    if (!this.hbox)
    //         return;

        var friends:any[] = this.data.friends;
        var groupId:string = this.data.groupId;

        //this.hbox.removeChildren();  
        var num:number = this.hbox.numChildren;
        var len:number = friends.length;

        var j:number = 0;
        for (var i:number = 0; i < num; i++)
        {
            this.hbox.getChildAt(i).visible = false;

            if (i >= len)
                continue;
            
            this.hbox.getChildAt(i).visible = true;

            var obj:any = friends[i];
            let imgLoader:egret.ImageLoader = new egret.ImageLoader();
            imgLoader.crossOrigin = "anonymous";
            imgLoader.once(egret.Event.COMPLETE, (evt:egret.Event) =>
            {
                var loader:egret.ImageLoader = <egret.ImageLoader>evt.currentTarget;
                
                //var ii:number = i;
                var img:eui.Image = this.hbox.getChildAt(j) as eui.Image;
                img.bitmapData = loader.data;

                j++;
                // let texture = new egret.Texture();
                // texture.bitmapData = loader.data;
                // img.texture = texture;
               
            }, this);
            
            imgLoader.load(obj.icon);
        }

        this.lblNum.text = friends.length.toString();
    }

    // public partAdded(partName:string, instance:any):void 
    // {
    //     super.partAdded(partName, instance);
       
    //     if (!this.data)
    //         return;
        
    //     var friends:any[] = this.data.friends;
    //     var groupId:string = this.data.groupId;

    //     for (var i:number = 0; i < friends.length; i++)
    //     {
    //         var obj:any = friends[i];
    //         //var img:eui.Image = new eui.Image();
    //         //img.source = 
    //         var imgLoader:egret.ImageLoader = new egret.ImageLoader();
    //         //imgLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
    //         imgLoader.crossOrigin = "anonymous";
    //         imgLoader.load(obj.icon);
    //     }
      
    //     this.lblNum.text = friends.length.toString();       
    // }

    // private loadCompleteHandler(event:egret.Event):void 
    // {
    //     var imageLoader = <egret.ImageLoader>event.currentTarget;
    //     let texture = new egret.Texture();
    //     texture._setBitmapData(imageLoader.data);
    //     var bitmap:egret.Bitmap = new egret.Bitmap(texture);
    //     this.hbox.addChild(bitmap);
    // }

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