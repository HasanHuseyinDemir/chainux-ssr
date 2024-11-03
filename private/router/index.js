import { count } from "/store/counter.js"
import hello from "/public/components/hello.js"

function MainPage(){
    onRemove((e)=>e.className="fade-out")
    return html`
    <div class="fade-in">
        <Hello-text/>
        Count:${count}
        <button onclick=${()=>count(e=>e+1)}>Increase</button>
        <button onclick=${()=>navigate("/about")}>About</button>
        <button onclick=${()=>navigate("/counter")}>Counter</button>
    </div>
    `
}

// To enhance performance, you can cache data to reduce unnecessary rendering.
// use : let MemoizedMainPage=Memo(MainPage)
// But...
// Currently, Memo does not perform memoization for child components. 
// If you're using child components, it's recommended to use Render for better results at this time.


export default function(){
    RenderContent(Render(MainPage))
}