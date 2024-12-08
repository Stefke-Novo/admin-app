const userService = require("../../services/UserTaskService")
const Task = require("./../../models/Task")

jest.mock('./../../models/Task')

describe("UserService.create_task",()=>{

    test("should return new Task instance id",()=>{

        //expected result
        const new_task = 20
        //mocking task
        Task.create.mockResolvedValue({"id":20})
        //testing
        userService.create_task("body1","user1@gmail.com").then((result)=>{expect(result).toBe(new_task)})
    })
     
})

describe("UserService.update_task",()=>{

    test("should return updated task",()=>{
        //chosing input 
        const task_to_update = {id: 1, body: "body1"}
        // expected result
        const expected_result = 1
        //mocking task
        Task.update.mockResolvedValue({"id": expected_result})
        //testing
        userService.update_task(task_to_update).then((result)=>expect(result).toBe(expected_result))
    })
})

describe("UserService.all_tasks",()=>{
    test("return list of tasks",()=>{
        // chosing input
        const user = {email: "user1@gmail.com",role:"user"}
        const pagination = {page:2,offset:0,order:["created","ASC"]}
        //expected result
        const result_list = [
            {
                id: 1,
                body: "body1",
                user_id: "user1@gmail.com",
                created: "01-01-2024"
            },
            {
                id: 2,
                body: "body2",
                user_id: "user1@gmail.com",
                created: "01-02-2024"
            }
        ]
        //mocking task
        Task.findAndCountAll.mockResolvedValue({count:2, rows: result_list})
        //testing
        userService.all_tasks(user,pagination).then((result)=>expect(result).toBe(result_list))
    })
})