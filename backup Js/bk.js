let saveData = () => {
    localStorage.setItem('2828', JSON.stringify(listData));
}
const saveItem = JSON.parse(localStorage.getItem('2828'));

let listData;

if (Array.isArray(saveItem)) {
    listData = saveItem;
} else {
    listData = [
        {
            active_menu: "1menu",
            ctn_id: "ctn1",
            activeEdit: false,
        },
        {
            key: "Task",
            english: "Hi",
            spanish: "Hola",
        },
        {
            key: "Task",
            english: "Thank you",
            spanish: "Gracias",
        },
    ]
}

saveData();

// menu ===>
const menu_function = () => {
    const div_menu = document.querySelectorAll("p");
    const active_menu = document.getElementById(listData[0].active_menu);
    active_menu.classList = "border_button_p";
    const ctn = document.getElementById(listData[0].ctn_id)
    ctn.classList = "mk_container";
    
    div_menu.forEach(Get_menu_id => {
        Get_menu_id.addEventListener("click", () => {
            if (Get_menu_id.id === `${Get_menu_id.id[0]}menu`) {
                listData[0].active_menu = Get_menu_id.id;
                listData[0].ctn_id = `ctn${Get_menu_id.id[0]}`
                location.reload();
                saveData();
            }
        });
    });
    //===========================================>


    //: remember Do less code 
}
menu_function();
// menu ===>

// add Task ===>
const addTask = () => {
    const addEnglish = document.getElementById("addEnglish");
    const addSpanish = document.getElementById("addSpanish");
    const submit_task = document.getElementById("submit_addTask");

    submit_task.addEventListener("click", () => {
        let addTask_check = addEnglish.value === "" || addSpanish.value === "";

        if (addTask_check) {
        } else {
            if (listData[0].activeEdit === false) {
                listData.push({
                    key: "Task",
                    english: `${addEnglish.value}`,
                    spanish: `${addSpanish.value}`,
                });
                saveData();
    
                addEnglish.value = "";
                addSpanish.value = "";
                location.reload();

            }
        }
    });
}
addTask();
// add Task ===>

// Create Task List ===>
const TaskList = () => {
    const tableTaskList = document.getElementById("taskList_table");
    let TaskNum = 0
    listData.forEach(taskData => {
        
        if (taskData.key === "Task") {
            TaskNum += 1;

            const createTr = document.createElement("tr");
            tableTaskList.append(createTr);
            
            //For English Task
            const createTh_english = document.createElement("th");
            createTh_english.id = `${TaskNum}English`;
            createTr.append(createTh_english);

            //For Spanish Task
            const createTh_spanish = document.createElement("th");
            createTh_spanish.id = `${TaskNum}Spanish`;
            createTr.append(createTh_spanish);

            createTh_english.textContent = `${TaskNum}: ${taskData.english}`;
            createTh_spanish.textContent = taskData.spanish;

            //For Edit button Th
            const EditTask_th = document.createElement("th");
            EditTask_th.id = "edit_remove_btn";
            createTr.append(EditTask_th);
            
            //Edit button
            const EditBtn = document.createElement("button");
            EditBtn.textContent = "Edit";
            EditBtn.id = `${TaskNum}EditBtn`
            EditTask_th.append(EditBtn);

            //Delete Button
            const DeleteTask = document.createElement("button");
            DeleteTask.className = "DeleteTask";
            DeleteTask.textContent = "Delete";
            DeleteTask.id = `${TaskNum}DeleteTask`
            EditTask_th.append(DeleteTask)
        }

    })
    // console.log(listData);
}
TaskList();
// Create Task List ===>

// Edit Button ===>
const editTask_Function = () => {
    const getEditBtn = document.querySelectorAll("button");
    getEditBtn.forEach(Edit_Btn => {
        Edit_Btn.addEventListener("click", () => {
            const EditBtnContent = Edit_Btn.textContent === "Edit";
            const SaveEditBtnContent = Edit_Btn.textContent === "Save";
            const SpanishEdit = document.createElement("input");
            SpanishEdit.id = "spanishEdit";

            const EnglishEdit = document.createElement("input");
            EnglishEdit.id = "EnglishEdit";
            
            if (Edit_Btn.id === `${Edit_Btn.id[0]}EditBtn` && EditBtnContent && listData[0].activeEdit === false) {
                let ECM = Edit_Btn.id[0]

                const spanishData = document.getElementById(`${Edit_Btn.id[0]}Spanish`);

                //English Data
                const EnglishData = document.getElementById(`${Edit_Btn.id[0]}English`)
                EnglishEdit.value = listData[ECM].english
                EnglishData.textContent = "";
                EnglishData.append(EnglishEdit);

                //Spanish Data
                SpanishEdit.value = listData[ECM].spanish
                spanishData.textContent = "";
                spanishData.append(SpanishEdit);

                console.log(Edit_Btn.id);
                Edit_Btn.textContent = "Save";
                listData[0].activeEdit = true;
                saveData();
            }
            if (Edit_Btn.id === `${Edit_Btn.id[0]}EditBtn` && SaveEditBtnContent) {
                const EnglishEdit = document.getElementById("EnglishEdit");
                const spanishEdit = document.getElementById("spanishEdit");

                if (EnglishEdit.value === "" || spanishEdit.value === "") {
                    console.log("working");
                } else {
                    listData[Edit_Btn.id[0]].english = EnglishEdit.value;
                    listData[Edit_Btn.id[0]].spanish = spanishEdit.value;
                    Edit_Btn.textContent = "Edit";
                    location.reload()
                    listData[0].activeEdit = false
                    saveData();
                }

            }

            //Continue Delete Button tomorrow
        })
    })
}
editTask_Function();
// Edit Button ===>

// Delete Button ===>
const RemoveTaskBtn = () => {
    const allDeleteBtn = document.querySelectorAll(".DeleteTask");
    allDeleteBtn.forEach(deleteBtn => {
        let CRNSelected = deleteBtn.id[0];
        deleteBtn.addEventListener("click", () => {
            if (listData[0].activeEdit === false) {
                listData.splice(CRNSelected, 1);
                location.reload();
                saveData();
            }
        });
    });
}
RemoveTaskBtn();
// Delete Button ===>


// Plan
// For every 5 list change it

// Test ====>
// const test = () => {
//     let listDataLength = listData.length -1;
    
//     if (listDataLength >= 4) {

//     }
//     // let collection = [...listData];
//     // listData.splice(1, listData.length)
//     // console.log(listData)
//     // console.log(collection1)
// }
// test();
// Test ====>