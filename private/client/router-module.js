/*GIT user:HasanHuseyinDemir*/
window.RootElement = document.querySelector("#app");

let onPrevExit=null

function exit(){
    if(arguments.length){
        onPrevExit=arguments[0]
    }else{
        if(onPrevExit){
            onPrevExit()
            onPrevExit=null
        }
    }
}

window.navigate = async function (url, paramsobj) {
    try {
        const targetUrl = new URL(url, window.location.origin);
        const sanitizedPath = targetUrl.pathname.replace(/\/+/g, '/').replace(/^\/|\/$/g, '');
        const module = await import(`/public/routes/${sanitizedPath}/index.js`);
        if (paramsobj) {
            const searchParams = new URLSearchParams(targetUrl.search);
            for (const key in paramsobj) {
                searchParams.set(key, paramsobj[key]);
            }
            targetUrl.search = searchParams.toString()
            console.log(targetUrl.search)
        }
        if (module.default) {
            if (window.location.href !== targetUrl.href) {
                window.history.pushState({ route: sanitizedPath + targetUrl.search }, '', targetUrl.href);
            }
            exit()
            if(module.onExit){
                exit(module.onExit)
            }
            module.default(new URLSearchParams(window.location.search));
        } else {
            throw new Error("Error loading module");
        }
    } catch (error) {
        console.error("Error loading module:", error);
        const errPage = await import("/public/routes/404/index.js");
        if (errPage.default) {
            errPage.default();
            window.history.pushState({ route: '404' }, '', '/404');
        }
    }
};


window.RenderContent = function(html){
    if (html instanceof Node) {
        if (RootElement.firstChild && RootElement.firstChild.isEqualNode(html)) {
            return;
        }
        RootElement.textContent = "";
        RootElement.append(html);
    } else {
        console.error("RenderContent's first parameter must be an instance of an HTML element!");
    }
};


/* ROUTER */
window.onpopstate = (event) => {
    if (event.state) {
        navigate(event.state.route);
    } else {
        navigate(window.location.pathname);
    }
};

const initialRoute = window.location.pathname.replace(/^\/|\/$/g, '');
navigate(initialRoute);

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const paramsObj = {};
    for (const [key, value] of params.entries()) {
        paramsObj[key] = value;
    }
    return paramsObj;
}

window.getQueryParams = getQueryParams