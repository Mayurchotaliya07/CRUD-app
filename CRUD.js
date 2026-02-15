const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let task = []

function yesOrno(){
    rl.question("Do you want to see main menu(yes or no)? ", (a2) => {
        a2 = a2.toLowerCase().trim()
        
        if(a2 !== "yes" && a2 !== "no"){
        console.log("Please enter yes or no correctly")
        yesOrno()
        return
        } 
        
        if(a2 === "yes"){
            ask()
        } else {
            console.log("Thank you")
            rl.close()
        }                             
    })
}

function view(){
    if(task.length === 0){
        console.log("You don't have any Task to see")
        return
    } 
    console.log(task)
}

function ask(){
    
    console.log("Welcome to the Task Manager app");
    console.log("1. Add Task");
    console.log("2. View Task");
    console.log("3. Update Task");
    console.log("4. Delete Task");
    console.log("5. Exit")
    
    rl.question("what do you want to do? ", (answer) => {
        answer = Number(answer)

        if(isNaN(answer)){
            console.log("Please enter correct number")
            ask()
            return
        }

        if(answer === 1){
            function addTask(){
                rl.question("Which Task do you want to add: ", (answer1) => {
                    if(answer1.trim() === ""){
                        console.log("Enter your task correctly: ")
                        addTask()
                        return
                    }

                    const newTask = {
                        id: task.length + 1,
                        Task: answer1
                    }

                    task.push(newTask)

                    rl.question("Do you want to add more task?(yes or no): " , (a) => {
                        a = a.toLowerCase().trim()

                        if(a !== "yes" && a !== "no"){
                            console.log("Please enter yes or no correctly")
                            rl.question("Do you wwant to add more task?(yes or no): ", (a1) => {
                                a1 = a1.toLowerCase().trim()
                                if(a1 === "yes"){
                                    addTask()
                                } else {
                                    yesOrno()
                                }
                            })
                        }

                        if(a === "yes"){
                            addTask()
                        } else {
                            yesOrno()
                        }
                    })
                })
            }

            addTask()
        }

        else if(answer === 2){
            view()
            yesOrno()
        }

        else if(answer === 3){
            function Update(){
                
                if(task.length === 0){
                    console.log("You don't have any task to update")
                    ask()
                    return
                }

                view()

                rl.question("Which task do you want to update: " , (u) => {
                    u = Number(u)

                    if(isNaN(u)){
                        console.log("please enter correct id")
                        Update()
                        return
                    }

                    const index = task.findIndex(t => t.id === u);

                    if (index === -1) {
                        console.log("Task with this id does not exist");
                        Update();
                        return;
                    }
                        
                    rl.question("Enter your new task: " , (u1) => {
                        task[index].Task = u1;
                        console.log("Task updated succesfully")
                        yesOrno()
                    })
                    }


                )
            }
            Update()
        }

        else if (answer === 4){
            function del(){
                if(task.length === 0){
                    console.log("You don't have any task to delete")
                    ask()
                    return
                }

                view()

                rl.question("Which task do you want to delete: ", (d) => {
                    d = Number(d)

                    if(isNaN(d)){
                        console.log("please enter correct id")
                        del()
                        return
                    }

                    const index = task.findIndex(t => t.id === d);

                    if (index === -1) {
                        console.log("Task with this id does not exist");
                        del();
                        return;
                    }

                    task.splice(index, 1);   
                    console.log("Task deleted successfully");

                    yesOrno()

                })

            }

            del()
            
        }

        else if(answer === 5){
            console.log("thank you")
            rl.close()
        }

        else{
            console.log("Enter a correct number")
            ask()
        }
    })

}

ask()