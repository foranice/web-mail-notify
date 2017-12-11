
const nodemailer = require('nodemailer');
const Monitor=require('./monitor')
//设置发件人信息
let transporter = nodemailer.createTransport({
    host: 'smtp.exmail.qq.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'daily_report@meimiao.net',
        pass: 'Honeytime@1905'
    }
});
//设置收件人信息
let mailOptions = {
    from: '<daily_report@meimiao.net>', // sender address
    to: 'zhoujiapeng@meimiao.net;', // list of receivers
    subject: '可抢购提示',
};
let GameStopNES={
        name:'GameStop:Super NES Classic Edition',
        url:'https://www.gamestop.com/snes/consoles/super-nes-classic-edition/152771',
        keySelector:'.buttonna .ats-prodBuy-notAvail',
        waitQueue:['.ats-prodBuy-buyBoxSec div'],
        period:3000,
        headless:false
    }
let BHNES={
    name:'B&H:Nintendo Super NES Classic Edition',
    url:'https://www.bhphotovideo.com/c/product/1347308-REG/nintendo_snes_super_nintendo_classic_edition.html',
    keySelector:'a[data-selenium="notifyBtn"]',
    waitQueue:['.left-2-sections','.pPriceZoneRight '],
    period:3000,
    headless:false
}

/*let taskNES=new Monitor(GameStopNES,(result)=>{
    console.log(taskNES.name+':'+result)
    if(result){
        sendEmail(taskNES.name+'可以买了')
    }
})
taskNES.excute()*/

let taskNES2=new Monitor(BHNES,(result)=>{
    console.log(taskNES2.name+':'+result)
    if(result){
        sendEmail(taskNES2.name+'可以买了')
    }
})
taskNES2.excute()

function sendEmail(text) {
    mailOptions.text='text'
    //发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(info);
    });
}