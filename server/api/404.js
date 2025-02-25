module.exports=function(req,rep,method,APISTATE){
    return `CHAINUX API |${method}| ERROR
API-STATE:${APISTATE?"Active":"Passive"}
    `
}