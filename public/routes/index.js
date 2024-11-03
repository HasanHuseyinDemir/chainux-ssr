function MainPage(){
    let count=createState(0)
    
    onConnect(()=>console.log("Hello"))
    onRemove(()=>console.log("Goodbye!"))

    return html`
    <div onclick=${()=>count(e=>e+1)}>
        Count:${count}
        <button onclick=${()=>navigate("/about")}>About</button>
    </div>
    `
}

let MemoizedMainPage=Memo(MainPage)

export default function(){
    RenderContent(MemoizedMainPage)
}