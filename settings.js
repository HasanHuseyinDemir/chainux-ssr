const SERVER={
    state:1,
    port:3000,
    logger:false,
    setState(bool){
        SERVER.state=Boolean(bool)
    },
}

const API={
    state:1,
    setState(bool){
        API.state=Boolean(bool)
    },
    error:require("./server/api/404")
}

//API.setState(true)

module.exports={API,SERVER}