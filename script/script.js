    //Getting elements
    const inputBox = document.getElementById('inputBox');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    const deleteAllBtn = document.getElementById('deleteAll');


    inputBox.onkeyup = () => {
        let userData = inputBox.value; //getting user entered data
        if(userData.trim() != 0 ){ //if user values aren´t only spaces
            addBtn.classList.add("active"); //active the add button
        } else {
            addBtn.classList.remove("active"); //unactive the add button
        }
    }; 

    showTasks();

    //if user click on the add button
    addBtn.onclick = () => {
        let userData = inputBox.value; //getting user entered data
        let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
        if (getLocalStorage == null) {
            listArr = []; //creating blank array
        } else {
            listArr = JSON.parse(getLocalStorage); //transforming JS String into a JS Object
        };
        listArr.push(userData); //pushing or adding user data
        localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming JS Object into a JS String

        showTasks();
        addBtn.classList.remove("active"); //unactive the add button
    }

    //function to add task list inside ul 
    function showTasks() {
        let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
        if (getLocalStorage == null) {
            listArr = []; //creating blank array
        } else {
            listArr = JSON.parse(getLocalStorage); //transforming JS String into a JS Object
        }

        const pendingNumb = document.getElementById('pendingNumb');
        pendingNumb.textContent = listArr.length; //passing the length value in pendingNumb

        if(listArr.length > 0) {
            deleteAllBtn.classList.add("active");
        } else {
            deleteAllBtn.classList.remove("active");
        }

        let newLitag = "";
        listArr.forEach((element, index) => {
            newLitag += `<li>${element}<span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
        });
        todoList.innerHTML = newLitag; //adding new li tag inside ul tag
        inputBox.value = ""; //once task added leave the input field blank
    }

    //delete task function
    function deleteTask(index) {
        let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
        listArr = JSON.parse(getLocalStorage);
        listArr.splice(index, 1); //delete or remove the particular indexed li
        
        //after remove the li again update the local storage
        localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming JS Object into a JS String
        showTasks();
    }

    //delete all tasks function
    deleteAllBtn.onclick = () => {
        listArr = []; //empty an array
        //after delete all tasks again update the local storage
        localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming JS Object into a JS String

        showTasks();
    }