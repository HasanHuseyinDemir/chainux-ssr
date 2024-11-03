let count=createState(0)

function MainPage(){
    onRemove(()=>console.log("Goodbye!"))

    Watch(()=>{
        console.log("Count Set",count())
    })

    return html`
    <div class="fade-in" onclick=${()=>count(e=>e+1)}>
        Count:${count}
        <button  onclick=${()=>navigate("/about")}>About</button>
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