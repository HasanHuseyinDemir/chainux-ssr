export default function(){
    let div=document.createElement("div")
    RenderContent(div)
    div.textContent=1
}

export function onExit(){
console.log("Sayfadan çıkılmışke")
}