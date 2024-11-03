/*
Chainux-R
Git:HasanHuseyinDemir
Repo:https://github.com/HasanHuseyinDemir/Chainux-R
License:MIT
*/
import {html,Component,onConnect,onRemove,Elements,createComputed,createReducer,createState,untrack,watch,Watch,Render,Memo,Mount} from "https://cdn.jsdelivr.net/gh/HasanHuseyinDemir/Chainux-R@master/versions/chainux-r-@0.3.beta.min.js"

//Can user can get server-components?
const isComponentPrivate=1
const isError=1

let orgComponent=Component
let privComponent=function(...args){
    if(isComponentPrivate){
        if(arguments.length>1||typeof arguments[0]=="function"){
            return orgComponent(...args)
        }else{
            isError?console.error("Server Component Access Error-Components must be a write-only!"):""
            return null
        }
    }else{
        return orgComponent(...args)
    }
}

Object.assign(window,
    {html,Component:privComponent,onConnect,onRemove,Elements,createComputed,createReducer,createState,untrack,watch,Watch,Render,Memo,Mount}
)