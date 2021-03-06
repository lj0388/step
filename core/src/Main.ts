//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() 
    {
        super();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) 
    {
        this.stage.orientation = egret.OrientationMode.AUTO;
        //this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
       this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;
        //注入自定义的素材解析器
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        // egret.lifecycle.addLifecycleListener((context) => {
        //     // custom lifecycle plugin

        //     context.onUpdate = () => {
        //         console.log('hello,world')
        //     }
        // })

        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }

        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }

        
        //初始化
        this.initScene();
        //this.initModule();

        //设置加载进度界面
        //App.SceneManager.runScene(SceneConsts.LOADING);
  
        var j:any = this;

        FBInstant.initializeAsync().then(function()
        {
            j.loadResVersion();
            FBInstant.logEvent("initialize", 1);
        }
        ).catch(function(e) 
        {
            console.log(e);
        });

    }

   
    private loadResVersion(): void 
    {
        //初始化Resource资源加载库
        App.ResourceUtils.addConfig("resource/step.res.json", "resource/");
        //App.ResourceUtils.addConfig("resource/default.res.json", "resource/");
        // App.ResourceUtils.addConfig("resource/resource_core.json", "resource/");
        //App.ResourceUtils.addConfig("resource/resource_ui.json", "resource/");
        //App.ResourceUtils.addConfig("resource/resource_battle.json", "resource/");
        // App.ResourceUtils.addConfig("resource/resource_rpg.json", "resource/");
        App.ResourceUtils.loadConfig(this.onConfigComplete, this);
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(): void 
    {
        FBInstant.logEvent("configLoadComplete", 1);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }


    private onThemeLoadComplete(): void 
    {
        //new GameTest();
        new StepFBTest();
        // FBInstant.startGameAsync().then(function ()
        // {
        //     new StepFBTest();
        // });        
    }

    /**
     * 初始化所有场景
     */
    private initScene(): void 
    {
        App.SceneManager.register(SceneConsts.LOADING, new LoadingScene());
        App.SceneManager.register(SceneConsts.Login, new LoginScene());
        App.SceneManager.register(SceneConsts.Index, new IndexScene());
        App.SceneManager.register(SceneConsts.Battle, new BattleScene());
    }

    /**
     * 初始化所有模块
     */
    // private initModule(): void 
    // {
    //     App.ControllerManager.register(ControllerConst.Loading, new LoadingController());
    // }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    // private onConfigComplete(event: RES.ResourceEvent): void {
    //     RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
    //     RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
    //     RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
    //     RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
    //     RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
    //     RES.loadGroup("preload");
    // }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    // private onResourceLoadComplete(event: RES.ResourceEvent) {
    //     if (event.groupName == "preload") {
    //         this.stage.removeChild(this.loadingView);
    //         RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
    //         RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
    //         RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
    //         RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
    //         this.createGameScene();
    //     }
    // }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    // private onItemLoadError(event: RES.ResourceEvent) {
    //     console.warn("Url:" + event.resItem.url + " has failed to load");
    // }

    // /**
    //  * 资源组加载出错
    //  *  The resource group loading failed
    //  */
    // private onResourceLoadError(event: RES.ResourceEvent) {
    //     //TODO
    //     console.warn("Group:" + event.groupName + " has failed to load");
    //     //忽略加载失败的项目
    //     //Ignore the loading failed projects
    //     this.onResourceLoadComplete(event);
    // }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    // private onResourceProgress(event: RES.ResourceEvent) {
    //     if (event.groupName == "preload") {
    //         this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
    //     }
    // }

    // private textfield: egret.TextField;

    // /**
    //  * 创建游戏场景
    //  * Create a game scene
    //  */
    // private createGameScene() {
    //     let sky = this.createBitmapByName("bg_jpg");
    //     this.addChild(sky);
    //     let stageW = this.stage.stageWidth;
    //     let stageH = this.stage.stageHeight;
    //     sky.width = stageW;
    //     sky.height = stageH;

    //     let topMask = new egret.Shape();
    //     topMask.graphics.beginFill(0x000000, 0.5);
    //     topMask.graphics.drawRect(0, 0, stageW, 172);
    //     topMask.graphics.endFill();
    //     topMask.y = 33;
    //     this.addChild(topMask);

    //     let icon = this.createBitmapByName("egret_icon_png");
    //     this.addChild(icon);
    //     icon.x = 26;
    //     icon.y = 33;

    //     let line = new egret.Shape();
    //     line.graphics.lineStyle(2, 0xffffff);
    //     line.graphics.moveTo(0, 0);
    //     line.graphics.lineTo(0, 117);
    //     line.graphics.endFill();
    //     line.x = 172;
    //     line.y = 61;
    //     this.addChild(line);


    //     let colorLabel = new egret.TextField();
    //     colorLabel.textColor = 0xffffff;
    //     colorLabel.width = stageW - 172;
    //     colorLabel.textAlign = "center";
    //     colorLabel.text = "Hello Egret";
    //     colorLabel.size = 24;
    //     colorLabel.x = 172;
    //     colorLabel.y = 80;
    //     this.addChild(colorLabel);

    //     let textfield = new egret.TextField();
    //     this.addChild(textfield);
    //     textfield.alpha = 0;
    //     textfield.width = stageW - 172;
    //     textfield.textAlign = egret.HorizontalAlign.CENTER;
    //     textfield.size = 24;
    //     textfield.textColor = 0xffffff;
    //     textfield.x = 172;
    //     textfield.y = 135;
    //     this.textfield = textfield;

    //     //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
    //     // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
    //     RES.getResAsync("description_json", this.startAnimation, this)
    // }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    // private createBitmapByName(name: string) {
    //     let result = new egret.Bitmap();
    //     let texture: egret.Texture = RES.getRes(name);
    //     result.texture = texture;
    //     return result;
    // }

    // /**
    //  * 描述文件加载成功，开始播放动画
    //  * Description file loading is successful, start to play the animation
    //  */
    // private startAnimation(result: string[]) {
    //     let parser = new egret.HtmlTextParser();

    //     let textflowArr = result.map(text => parser.parse(text));
    //     let textfield = this.textfield;
    //     let count = -1;
    //     let change = () => {
    //         count++;
    //         if (count >= textflowArr.length) {
    //             count = 0;
    //         }
    //         let textFlow = textflowArr[count];

    //         // 切换描述内容
    //         // Switch to described content
    //         textfield.textFlow = textFlow;
    //         let tw = egret.Tween.get(textfield);
    //         tw.to({ "alpha": 1 }, 200);
    //         tw.wait(2000);
    //         tw.to({ "alpha": 0 }, 200);
    //         tw.call(change, this);
    //     };

    //     change();
    // }
}


