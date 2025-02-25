
export const x=createState(0)

export const current=createState("Yarrak")
function Page(){
return html`<div>
<h1>About</h1>
<p>Argüman</p>
<button onclick=${()=>x(y=>y+1)}>Increase ${x}</button>
<div id="content">${current}</div>
<button onclick=${()=>navigate("/about/me")}>ME!</button>
<button onclick=${()=>navigate("/about")}>About</button>
<button onclick=${()=>navigate("/")}>Anasayfa</button>
<h1>Kardeşim selamkeler</h1>
</div>`
}
export const Pages=Memo(Page)
export const Content=Pages.querySelector("#content")


export default function(){
    RenderContent(Pages)
    current("Yarrak")
}

export function onExit(){
    console.log("Abouttan ayrılınıyor!")
}
