let count=createState(0)

function MainPage(){
    onConnect(function(e){
        e.className="fade-in"
    })
    onRemove(()=>console.log("Goodbye!"))

    Watch(()=>{
        console.log("Count Set",count())
    })

    return html`
    <div onclick=${()=>count(e=>e+1)}>
        Count:${count}
        <button class="hello" onclick=${()=>navigate("/about")}>About</button>
    </div>
    `
}

let MemoizedMainPage=Memo(MainPage)

export default function(){
    if(getQueryParams().count){
        count(Number(getQueryParams().count))
    }

    RenderContent(MemoizedMainPage)
}