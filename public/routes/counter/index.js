import { count } from "/store/counter.js"


function Counter(){
    let refP=null
    onRemove((e)=>e.className="fade-out")
    Watch(()=>{
        if(refP){
            if(count()<0){
                refP.style.color="red"
            }else{
                refP.style.color="black"
            }
        }
    })

    return html`
    <div class="fade-in">
        <h1 class="transition" style=${()=>count()<0?"color:red":""}>Counter Page!</h1>
        <p class="transition" use=${function(){refP=this}}>Count:${count}</p>
        <div style="display:flex;">
        <button onclick=${()=>count(e=>e+1)}>Increase</button>
        <button onclick=${()=>count(e=>e-1)}>Decrease</button>
        </div>
        <br>
        <div>
            <button onclick=${()=>navigate("")}>HomePage</button>
        </div>
        <style>
            .transition{
                transition:.3s ease-in;
            }
        </style>
    </div>
    `
}

let memoized=Memo(Counter)

export default function(){
    RenderContent(memoized)
} 