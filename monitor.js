const puppeteer = require('puppeteer');
class Monitor{
    constructor(options,resultCallback){
        if(!options){
            throw new Error('options is needed')
        }
        if(!options.url){
            throw new Error('未知的目标网址')
        }
        if(!options.headless){
            this.headless=false
        }
        else{
            this.headless=options.headless
        }
        this.url=options.url
        if(!options.keySelector){
            throw new Error('关键特征选择器缺失')
        }
        this.keySelector=options.keySelector
        if(!options.waitQueue){
            options.waitQueue=[]
        }
        this.waitQueue=options.waitQueue
        if(!options.period){
            period=60000
        }
        this.period=options.period
        if(!options.name){
            options='Unknow Task'
        }
        this.name=options.name
        if(typeof resultCallback!=='function'){
            throw new Error('resultCallback must be function')
        }
        this.resultCallback=resultCallback
    }
    async excute (){
        const browser = await puppeteer.launch({headless: this.headless});
        const page = await browser.newPage();
        await  page.goto(this.url,{timeout:0,waitUntil:'networkidle2'})
        //设置视口大小
        page.setViewport({
            width:1280,
            height:960
        })
        while(true){
            //初始化

            if(this.waitQueue&&this.waitQueue instanceof Array){
                for(let i=0;i<this.waitQueue.length;i++){
                    await page.waitFor(this.waitQueue[i])
                }
            }
            await page.waitFor(5000)
            const result = await page.evaluate((keySelector) => {
                return document.querySelector(keySelector)===null
            },this.keySelector);
            console.log(result)
            this.resultCallback(result)
            await page.waitFor(this.period)
            await page.reload({timeout:0})
        }


    }
}

module.exports=Monitor