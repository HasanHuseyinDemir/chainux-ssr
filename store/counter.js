/*EXAMPLE*/
export const count = createState(0);

// Use "watch" for reactivity outside of components,
// and "Watch" for reactivity within components.
let changeCount=0
watch((e) => {
    console.log("Count Changed!", count());
    if(changeCount>9){
        alert("Count changed 10 times!")
        e.remove()//deactivating
        console.log("Count watcher disabled from server!")
    }
    changeCount++
});

/* 
"watch" Tips:
- let counterWatch = watch(() => console.log(count()));
- counterWatch.remove(); // Clean up state listeners
- counterWatch.append(); // Reattach state listeners
- counterWatch.kill(); // Permanently clean up memory
*/
