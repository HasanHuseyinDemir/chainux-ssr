function MainPage(){
    onRemove((e)=>e.className="fade-out")
    return html`
    <div class="fade-in">
        <button onclick=${()=>navigate("/about")}>About</button>
        <button onclick=${()=>navigate("/counter")}>Counter</button>
    </div>
    `
}
const XD=Memo(MainPage)
// To enhance performance, you can cache data to reduce unnecessary rendering.
// use : let MemoizedMainPage=Memo(MainPage)
// But...
// Currently, Memo does not perform memoization for child components. 
// If you're using child components, it's recommended to use Render for better results at this time.


export default function(){
    RenderContent(Render(XD))
    const old=new Date()
    fetch("/",{
        method:"GET",
    })
    const approx=new Date()-old
    console.log(approx*1000)
    document.title="Anasayfa"
}