/*
Author:Hasan Hüseyin Demir
Github:HasanHuseyinDemir https://github.com/HasanHuseyinDemir
*/

function destroy(o){
    if(typeof o!="string"){
        for(let val in o){
            let t=o[val]
            if(t&&isObj(t)){destroy(t)}
            else if(t instanceof Map){t.forEach((v,k)=>{destroy(v);t.delete(k);})}
            else if(t instanceof Set){t.forEach(v=>{destroy(v)});t.clear()}
            else if(Array.isArray(t)){t.forEach(v=>{destroy(v)})}
            delete o[val]
            t=null
        }
    }
}
let StateContext=[]
function createState(i){
    let set=new Set()
    let data={
        initial:i,
        get(){
            if(StateContext.length){
                StateContext[StateContext.length-1].add(set)
            }
            return data.initial
        },
        set(a){
            let before=data.initial
            let diff=before!==a
            data.initial=a
            if(diff){
                set.forEach((e)=>e({before,current:data.initial}))
            }
            return a
        }
    }

    function s(a){
        if(arguments.length){
            return data.set(typeof a=="function"?a(data.initial):a)
        }
        a=null
        if(data){
            return data.get()
        }
    }
    s.kill=function(){
        destroy({set,data})
        set=null
        data=null
        s.kill=null
        s=null
    }
    return s
}

function createReducer(i,f){
    let state=createState(i)
    let kill
    function dispatch(...args){
        if(arguments.length){
            state(f(state(),...args))
        }else{
            return state()
        }
    }
    dispatch.kill=()=>{
        kill=null
        state=null;
        dispatch=null
    }
    kill=state.kill
    state.kill=()=>{
        kill()
        dispatch.kill()
    }
    return dispatch
}

function createComputed(f){
    let state=createState(1)
    let watcher=watch(()=>{state(f())})
    let kill=state.kill
    state.kill=()=>{
        watcher.kill()
        kill()
        kill=null
        state=null
        watcher=null
        f=null
    }
    return state
}


function watch(f,assign){
    StateContext.push(new Set())
    let localF
    let settings={
        append(){kl.forEach(v=>{v.add(localF)})},
        remove(){kl.forEach(v=>{v.delete(localF)})},
        kill(){
            settings.remove()
            while(kl.length){kl.pop()}
            kl=null
            destroy(settings)
            if(f.kill){f.kill()}//fonksiyonunda kendini temizleme özelliği olabilir
            f=null
            localF=null
            settings=null
        },
        trigger(){localF()}
    }
    Object.assign(settings,assign)
    localF=()=>{f(settings)}
    let res=localF()
    let kl=StateContext.pop()
    if(kl.size==0){settings.kill();settings=null;return res}
    res=null
    settings.append()//init
    return settings
}
function untrack(f){
    StateContext.push(new Set())
    let res=f()
    void StateContext.pop()
    return res
}

module.exports={
    watch,untrack,createComputed,createReducer,createState
}
