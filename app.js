const linebotSDK=required("@line/bot-sdk");

const koa = require("koa");
const koaBodyparser = require("koa-bodyparser");
const koaRouter = require("koa-router");

const channelSecret = process.env.channelSecret;

const lineAPI = new LinebotSDK.LineBotApi(process.env.channelAccessToken);

const app = new koa();
const router = new koaRouter();

app.use(koaBodyparser());

router.post("/",function(abc){
    if(LinebotSDK.validateSignature(abc.request.body,channelSecret)){
        abc.status =200;
    }else{
        abc.status=401;
        abc.body="Authorize failed.";
    }
});

app.use(router.routes());

const server =app.listen(process.env.PORT || 8080);




