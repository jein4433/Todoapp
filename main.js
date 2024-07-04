// 유저는 할일을 추가할 수 있다.
// 각 할일에 삭제와 체크버튼이 있다.
// 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
// 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".tabs div");
let underline = document.getElementById("under-line")
let taskList = [];
let mode = 'all';
let filterList = [];
let list = [];
let deleteAll = document.getElementById("delete-all");


if (mode === "ongoing"){
    list.isComplete === false;
}else if (mode === "done"){
    list.isComplete === true;
}

if(mode === "all"){
    list = taskList;
}else if(mode === "ongoing" || mode === "done"){
    list = filterList;
}

deleteAll.addEventListener("click",deleteList);
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown",(event) => {
    if(event.key === 'Enter') {
        addTask();
    }
})


for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){
        filter(event);
    });
}

console.log(tabs);

function addTask(){
    let task = {
        id: randomID(),
        taskContent: taskInput.value,
        isComplete: false,
    };
    if (taskInput.value != ''){
    taskList.push(task);
    render();
    console.log(taskList);
    taskInput.value = ""
    }

}

function render(){
    list = []
    if(mode === "all"){
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
        list = filterList
    }
    let resultHTML="";
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
        resultHTML += `<div class="task">
         <div class = "task-done">${list[i].taskContent}</div>
         <div>
             <button onclick="toggleComplete('${list[i].id}')" class = "task-button"><i class="fa-solid fa-rotate-left"></i></button>
             <button onclick="deleteTask('${list[i].id}')" class = "task-button"><i class="fa-solid fa-circle-minus"></i></button>
        </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')" class = "task-button"><i class="fa-solid fa-circle-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')" class = "task-button"><i class="fa-solid fa-circle-minus"></i></button>
        </div>
    </div>`;
    
    }
 
 }

    document.getElementById("task-board").innerHTML = resultHTML;
}


function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if (taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function deleteTask(id) {
     list = list.filter(task => task.id !== id);
     filterList = filterList.filter(task => task.id !== id);
     taskList = taskList.filter(task => task.id !== id);
    render();
}

function filter(event) {
    if(event){
     mode = event.target.id;
    }
     underline.style.left = event.currentTarget.offsetLeft + "px"
     underline.style.width = event.currentTarget.offsetWidth + "px"
     underline.style.top = (event.currentTarget.offsetHeight - 4) + "px"

   filterList = [];
if(mode === "all"){
    render();
}if(mode === "ongoing"){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete === false){
            filterList.push(taskList[i])
        }
    }
    render();
    console.log("진행중",filterList)
}if(mode === "done"){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete == true){
            filterList.push(taskList[i])
         }let mode = "done"
    } 
    render();
}  
  for(let i=0; i<list.length; i++){

    if(taskList[i].isComplete === true && mode === "done"){
        list.splice(i,1);
    }if (taskList[i].isComplete === false && mode === "ongoing"){
        list.splice(i,1);
    }
}
}

function deleteList(){
    taskList.splice(0,taskList.length)
    filterList.splice(0,filterList.length)
    render();
}

function randomID(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
addTask();
