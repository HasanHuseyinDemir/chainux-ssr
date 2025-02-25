import {Content, current, x} from "../index.js"
import { Pages } from "../index.js"

export default function(){
    RenderContent(Pages)
    x((e)=>e+1)
    current("ME!")
}

export function onExit(){
console.log("Sayfadan çıkılmışkeaa")
}