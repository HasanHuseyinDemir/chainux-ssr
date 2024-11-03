window.RootElement=document.querySelector("#app")

window.navigate = async function(url) {
    try {
        const sanitizedUrl = url.replace(/\/+/g, '/'); // Birden fazla '/' olan kısımları tek '/' ile değiştirir
        const module = await import(`/public/routes/${sanitizedUrl}/index.js`);
        if(module.default){
            module.default();
            window.history.pushState({ route: sanitizedUrl }, '', sanitizedUrl);
        }else{
            throw new Error("Error loading module")
        }
    } catch (error) {
        let errpage=await import("/public/routes/404.js")
        errpage.default()
    }
};

window.RenderContent=function(html){
    if(RootElement){
        if(RootElement.firstElementChild&&RootElement.firstElementChild.isEqualNode(html)){
            return 
        }else{
            RootElement.firstElementChild.remove()
        }
        RootElement.append(html)
    }
}

/*ROUTER*/
window.onpopstate = (event) => {
    if (event.state) {
        navigate(event.state.route);
    } else {
        navigate('/'); // Varsayılan sayfa
        console.log("default")
    }
};

const initialRoute = window.location.pathname.replace(/^\/|\/$/g, ''); // Başlangıçta '/' veya sonundaki '/' temizle
navigate(initialRoute||"");