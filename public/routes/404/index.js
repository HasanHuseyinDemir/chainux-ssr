
export default function(){
    RootElement.textContent="Oops 404 Error!Redirecting..."
    setTimeout(()=>{
        navigate("/")
    },2000)
}