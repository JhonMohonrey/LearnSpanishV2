let saveData = () => {
    localStorage.setItem('2828', JSON.stringify(listData));
}
const saveItem = JSON.parse(localStorage.getItem('2828'));

let listData;

if (Array.isArray(saveItem)) {
    listData = saveItem;
} else {
    listData = [
        [
            {
                active_menu: "1menu",
                ctn_id: "ctn1",
                activeEdit: false,
                currentCollection: 1,
                collection_control: 1,
                Display: 0,
                switch: "english",
                disResult: "No answer"
            },
        ],
        [
            {
                key: "Task",
                english: "Good Morning",
                spanish: "Buenos dias",
                remark: "NA",
            },
            {
                key: "Task",
                english: "Excuse me",
                spanish: "Disculpe",
                remark: "NA",
            },
            {
                key: "Task",
                english: "How are you?",
                spanish: "Como esta usted",
                remark: "NA",
            },
            {
                key: "Task",
                english: "What is your name?",
                spanish: "Como se llama",
                remark: "NA",
            },
            {
                key: "Task",
                english: "Where are you from?",
                spanish: "De donde viene",
                remark: "NA",
            },
            {
                key: "Task",
                english: "How much does it cost?",
                spanish: "Cuanto cuesta eso?",
                remark: "NA",
            },
            {
                key: "Task",
                english: "Do you understand?",
                spanish: "Entiede",
                remark: "NA",
            },
            {
                key: "Task",
                english: "Can you help me?",
                spanish: "Puede ayudarme",
                remark: "NA",
            },
            {
                key: "Task",
                english: "Good bye",
                spanish: "Adios",
                remark: "NA",
            },
            {
                key: "Task",
                english: "Hi",
                spanish: "Hola",
                remark: "NA",
            },
        ],
    ]
}

const reset = () => {
    let count = listData[listData[0][0].collection_control].length;
    count -=1
    let x = -1

    while (x < count) {
        x += 1;
        listData[listData[0][0].collection_control][x].remark = "NA"
        saveData();
    }
}


if (listData.length === 1) {
    listData.push([{
        key: "Task",
        english: "Empty",
        spanish: "Empty",
    }])
    saveData();
}

saveData();

// menu ===>
const menu_function = () => {
    const div_menu = document.querySelectorAll("p");
    const active_menu = document.getElementById(listData[0][0].active_menu);
    active_menu.classList = "border_button_p";
    const ctn = document.getElementById(listData[0][0].ctn_id)
    ctn.classList = "mk_container";
    
    div_menu.forEach(Get_menu_id => {
        Get_menu_id.addEventListener("click", () => {
            if (Get_menu_id.id === `${Get_menu_id.id[0]}menu`) {
                listData[0][0].active_menu = Get_menu_id.id;
                listData[0][0].ctn_id = `ctn${Get_menu_id.id[0]}`
                listData[0][0].activeEdit = false
                location.reload();
                saveData();
                window.scrollTo(0, window.screenX)
            }
        });
    });
}
menu_function();
// menu ===>

const addEnglish = document.getElementById("addEnglish");
const addSpanish = document.getElementById("addSpanish");

// add Task ===>
const addTask = () => {
    const submit_task = document.getElementById("submit_addTask");
    
    submit_task.addEventListener("click", () => {
        let addTask_check = addEnglish.value === "" || addSpanish.value === "";
        
        if (addTask_check) {
        } else {
            if (listData[0][0].activeEdit === false) {
                listData[listData[0][0].currentCollection].push({
                    key: "Task",
                    english: `${addEnglish.value}`,
                    spanish: `${addSpanish.value}`,
                    remark: "NA",
                });
                saveData();
                
                addEnglish.value = "";
                addSpanish.value = "";
                location.reload();
                
                //=== "Delete NoTask" ===>
                if (listData[1][0].english == "Empty") {
                    listData[1].splice(0, 1)
                    saveData();
                }
                //=== "Delete NoTask" ===>
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
    listData[listData[0][0].collection_control].forEach(taskData => {
        
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

            let secondNum = Edit_Btn.id[1]
            let firstNum = Edit_Btn.id[0]
            let convertFS = firstNum + secondNum
            let ECM = parseInt(convertFS)
            let ECM2 = parseInt(convertFS)

            
            if (Edit_Btn.id === `${ECM2}EditBtn` && EditBtnContent && listData[0][0].activeEdit === false) {
                let ValData = listData[listData[0][0].collection_control][ECM -=1];
                const spanishData = document.getElementById(`${ECM2}Spanish`);

                //English Data
                const EnglishData = document.getElementById(`${ECM2}English`)
                EnglishEdit.value = ValData.english
                EnglishData.textContent = "";
                EnglishData.append(EnglishEdit);

                //Spanish Data
                SpanishEdit.value = ValData.spanish
                spanishData.textContent = "";
                spanishData.append(SpanishEdit);
                Edit_Btn.textContent = "Save";
                listData[0][0].activeEdit = true;
                saveData();
            } 

            let x = listData[0][0].collection_control;
            let editBtnVar = ECM2

            if (Edit_Btn.id === `${ECM2}EditBtn` && SaveEditBtnContent) {
                const EnglishEdit = document.getElementById("EnglishEdit");
                const spanishEdit = document.getElementById("spanishEdit");

                if (EnglishEdit.value === "" || spanishEdit.value === "") {
                } else {
                    listData[x][editBtnVar -=1]
                    listData[x][editBtnVar].english = EnglishEdit.value;
                    listData[x][editBtnVar].spanish = spanishEdit.value;
                    Edit_Btn.textContent = "Edit";
                    location.reload()
                    listData[0][0].activeEdit = false
                    saveData();
                }

            }
        })
    })
}
editTask_Function();
// Edit Button ===>

// Delete Button ===>
const RemoveTaskBtn = () => {
    let crnCollection = listData[0][0].collection_control;
    const allDeleteBtn = document.querySelectorAll(".DeleteTask");
    allDeleteBtn.forEach(deleteBtn => {
        let spl = deleteBtn.id[0];
        spl -=1
        let CRNSelected = deleteBtn.id[0];
        deleteBtn.addEventListener("click", () => {
            if (listData[0][0].activeEdit === false) {
                listData[crnCollection].splice(spl, 1)
                location.reload();
                saveData();
            }
        });
    });
}
RemoveTaskBtn();
// Delete Button ===>

// Collection ===>
const collection = () => {
    let num = listData[0][0].currentCollection;
    if (listData[listData[0][0].currentCollection].length > 15) {
        listData[0][0].currentCollection += 1;
        location.reload()
        listData[0][0].collection_control = listData[0][0].currentCollection
        // alert("hey")
        saveData();
    }
    if (listData[num].length > 15) {
        let english = listData[num][15].english
        let spanish = listData[num][15].spanish
        listData.push([
            {
                key: "Task",
                english: `${english}`,
                spanish: `${spanish}`,
            },
        ])
        listData[num].splice(15, 1)
        reset()
        saveData();
    }
}
collection()
// Collection ===>

// == (Collection List) ==>
const function_control = () => {
    const Control_table = document.getElementById("table_collection_control");
    let num = 0
   
    listData.forEach(collections => {
        try {
            if (collections[0].key === "Task") {
                num +=1
                const tr = document.createElement("tr");
                Control_table.append(tr);
        
                const th = document.createElement("th");
                th.textContent = `Collection ${num}`;
                tr.append(th);
                
                const th_remark = document.createElement("th");
                th_remark.className = "collection_remarks"
                th_remark.id = num
                
                if (parseInt(th_remark.id) === listData[0][0].collection_control) {
                    th_remark.textContent = "Active"
                } else {
                    th_remark.textContent = "Disable"
                }
                tr.append(th_remark)
                
                //Control ==>
                const th_control = document.createElement("th")
                th_control.classList = "check_data";
                tr.append(th_control)
    
                const label = document.createElement("label");
                label.textContent = "Activate";
                th_control.append(label)
                
                const input = document.createElement("input");
                input.id = `${num}input`;
                input.type = "checkbox";
                th_control.append(input);
                
                const getInput = document.getElementById(`${num}input`);
                getInput.addEventListener("change", () => {
                    let collection_active = parseInt(getInput.id[0])
                    listData[0][0].collection_control = collection_active;
                    reset()
                    location.reload()
                    saveData();
                    // reset()
                })
                
                if (parseInt(getInput.id[0]) === listData[0][0].collection_control) {
                    getInput.checked = true;
                }
                //Control ==>
            }

        } catch {
            listData = listData.filter(element => element.length > 0)
            if (listData[0][0].currentCollection > 1) {
                let x = listData[0][0].currentCollection -= 1
                listData[0][0].collection_control = x
            }
            location.reload()
            saveData();
        }
    })
}
function_control();
// == (Collection List) ==>

const practiceFunction = () => {
    const getShuffleBtn = document.getElementById("shuffle_btn");
    const Display = document.getElementById("rand_question");
    const skip_btn = document.getElementById("skip_btn");
    const Switch_btn = document.getElementById("Switch_btn");
    const hint_btn = document.getElementById("hint_btn");
    const current_position = document.getElementById("current_position");
    let num = listData[0][0].collection_control
    let DisplayScreen = listData[0][0].Display
    
    const shuffleData = (array) => {
        return array.sort(() => Math.random() - 0.5);
    }
    
    getShuffleBtn.addEventListener("click", () => {
        shuffleData(listData[num])
        listData[0][0].Display = 0
        location.reload();
        saveData();
    })

    skip_btn.addEventListener("click", () => {
        let length = parseInt(listData[num].length);
        listData[0][0].disResult = "No answer"
        
        if (listData[0][0].Display < length) {
            listData[0][0].Display += 1
            location.reload();
            saveData();
        } else {
            listData[0][0].Display = 0
            location.reload()
            saveData();
        }
    });
    
    let Display_q = listData[0][0].switch
    Switch_btn.addEventListener("click", () => {
        location.reload()
        if (listData[0][0].switch === "english") {
            listData[0][0].switch = "spanish"
            shuffleData(listData[num])
            saveData();
        } else {
            listData[0][0].switch = "english"
            shuffleData(listData[num])
            saveData();
        }
    });
    
    try {
        if (Display_q === "english") {
            Display.textContent = `${listData[num][DisplayScreen].english}`
        } else {
            Display.textContent = `${listData[num][DisplayScreen].spanish}`
        }
    } catch {
        listData[0][0].Display = 0
        saveData();
        location.reload()
        
        if (Display_q === "english") {
            Display.textContent = `${listData[num][DisplayScreen].english}`
        } else {
            Display.textContent = `${listData[num][DisplayScreen].spanish}`
        }
    }

    hint_btn.addEventListener("click", () => {
        if (Display_q === "english") {
            let x = listData[num][DisplayScreen].spanish
            document.getElementById("hint_id").textContent = `Hint:  "${x[0]}"`
        } else {
            let x = listData[num][DisplayScreen].english
            document.getElementById("hint_id").textContent = `Hint:  "${x[0]}"`
        }

    });
    
    let x = 15;
    let y = 0
    let id = listData[0][0].Display
    id += 1

    while (y < x) {
        y += 1;
        const createDiv = document.createElement("div");
        createDiv.id = `${y}divPosition`
        createDiv.textContent = y;
        current_position.append(createDiv);
    }

    const colorDiv = document.getElementById(`${id}divPosition`);
    colorDiv.classList = "green";

    const submit_btn = document.getElementById("submit_btn");
    const userAnswer = document.getElementById("userAnswer")
    const display_result = document.getElementById("display_result");

    let displayR = listData[0][0].disResult;
    let remark = listData[num][DisplayScreen].remark
    display_result.textContent = `${displayR}`;

    //=====(Div) ==>
    let dataX = listData[num].length
    let dataY = 0
    let datYY = -1

    while (dataY < dataX) {
        dataY += 1
        datYY += 1
        const div_Display = document.getElementById(`${dataY}divPosition`);
        let currentPosition = div_Display.classList.value !== "green"
        if (listData[num][datYY].remark === "Correct" && currentPosition) {
            div_Display.style = "background-color: #3e92cc; color: black;"
        } else if (listData[num][datYY].remark === "Wrong" && currentPosition) {
            div_Display.style = "background-color: #ef233c; "
        }
    }
    //=====(Div) ==>

    //====(Reset Btn) ===>
    const resetBtn = document.getElementById("reset")
    resetBtn.addEventListener("click", () => {
        reset();
        listData[0][0].Display = 0
        location.reload()
        saveData();
    })
    //====(Reset Btn) ===>

    if (remark === "NA") {
        display_result.textContent = `No answer`;
    } else if (remark === "Correct") {
        display_result.textContent = `Correct`;
        display_result.style = "color: rgb(0, 133, 7);"
    } else {
        display_result.textContent = `Wrong`;
        display_result.style = "color: #ef233c;"
    }

    submit_btn.addEventListener("click", () => {
        let checkAnswerData = userAnswer.value
        checkAnswerData.toLowerCase()

        if (userAnswer.value !== "") {
            if (Display_q === "english") {
                let x = listData[num][DisplayScreen].spanish
                location.reload()
                
                if (checkAnswerData.toLowerCase() === x.toLowerCase()) {
                    listData[0][0].disResult = "Correct"
                    listData[num][DisplayScreen].remark = "Correct"
                } else {
                    listData[0][0].disResult = "Wrong"
                    listData[num][DisplayScreen].remark = "Wrong"
                }
            } else {
                location.reload()
                let x = listData[num][DisplayScreen].english
                
                if (checkAnswerData.toLowerCase() === x.toLowerCase()) {
                    listData[0][0].disResult = "Correct"
                    listData[num][DisplayScreen].remark = "Correct"
                } else {
                    listData[0][0].disResult = "Wrong"
                    listData[num][DisplayScreen].remark = "Wrong"
                }
            }
            saveData();
            userAnswer.value = ""
        } else {
            userAnswer.value = ""
        }
    })
}

practiceFunction()