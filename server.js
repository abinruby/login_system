const express=require('express')
const path=require('path');
const app =express();
const port =process.env.PORT||3000
const bodyparser=require ("body-parser")
const session=require("express-session");
const{v4:uuidv4}=require("uuid")
const router=require('./router')

app.set('view engine','ejs');
//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(function(req, res, next) {
    if (!req.user) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
    }
    next();
});
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));
app.use('/route',router)
// home route
app.get('/',(req,res)=>{
    res.render('base',{title:"Login System"})
})

app.listen(port,()=>{console.log('server started');})
