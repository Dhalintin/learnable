//Input form
const item = document.querySelector("#item");

//Submit Button
const submit = document.querySelector("#submit");

//Un-ordered list to put my items
const todolist = document.querySelector("#todolist");

//A placeholder I put to display if there are no items on the list
const placeholder = document.querySelector("#holder");

//Restoring deleted items
const restore = document.querySelector("#restore")


/*
    list arrays contains the items on the list
    memory array contains items deleted from the original list incase a user wants to restore them

*/
const list = [];
const memory = [];


//reRenderList() updates the items
const reRenderList = () =>{
    if(placeholder.textContent != null){
        placeholder.textContent = '';
    }
    if(list && list.length > 0){
        for(let i = 0; i < list.length; i++){
            todolist.innerHTML += `<li class="tdl" id="list${i}"> ${list[i]} <span class="close" onclick="deleteItem(list${i})">x</span></li>`
        }
    }else{
        placeholder.innerHTML = `<li id="holder"> You have no task yet </li>`
    }
}

window.addEventListener("load", ()=>{
    reRenderList();
})


//Submission action
submit.addEventListener("click", ()=>{
    const todo = item.value;
    if(placeholder.textContent != null){
        placeholder.textContent = '';
    }
    if(todo === ''){
        alert('You need to enter a value')
    }else{
        list.push(item.value);
        todolist.innerHTML += `<li class="tdl" id="list${list.length - 1}"> ${todo} <span class="close" onclick="deleteItem(list${list.length - 1})">x</span></li>`
        item.value = '';
    }
    
})


//Checking and unchecking an event
todolist.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
}, false);



//Deleting Items from the list
const deleteItem = (val) =>{
    const item = val.remove();
    const tdl = todolist.querySelectorAll(".tdl");
    if(tdl.length === 0){
        restore.removeAttribute("disabled");
        
        for(listItem of list){
            memory.push(listItem)
        }
        
        list.splice(0, list.length);
        reRenderList()
    }
}


//Restoring deleted item
restore.addEventListener("click", ()=>{
    if(memory.length > 0){
        for(listItem of memory){
            list.push(listItem)
        }

        memory.splice(0, memory.length);
        
        restore.setAttribute("disabled", "");
        reRenderList();
    }else{
        alert("You have nothing to restore")
    }
    
});