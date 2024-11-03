export default function(){
    RootElement.textContent="MEMEMEs"+JSON.stringify(getQueryParams())
}

export function onExit(){
console.log("Sayfadan çıkılmışke")
}