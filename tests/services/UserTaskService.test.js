const Task = require("../../models/Task")
jest.createMockFromModule('../../models/Task')
const userService = require("../../services/UserTaskService")

describe("UserService.create_task",()=>{

    afterEach(() => {
        jest.clearAllMocks();
      });

    test("should return new Task instance id",()=>{

        //expected result
        const new_task = 1
        //mocking task
        Task.create = jest.fn()
        Task.create.mockResolvedValueOnce({"id":1})
        //testing
        userService.create_task("body1","user1@gmail.com").then((result)=>{expect(result).toBe(new_task)})
    })
     
})

describe("UserService.update_task",()=>{

    let task_to_update,expected_result;

    beforeEach(() => {
        //chosing input 
        task_to_update = {id: 1, body: "body1"}
        // expected result
        expected_result = 1
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should return updated task",()=>{
        
        //mocking task
        Task.update = jest.fn()
        Task.update.mockResolvedValueOnce([1])
        //testing
        userService.update_task(task_to_update).then((result)=>expect(result).toBe(expected_result))
    })

    test("should throw Error",async ()=>{
        //mocking task
        Task.update = jest.fn()
        Task.update.mockResolvedValueOnce([0])
        //testing
        userService.update_task(task_to_update).catch(error=>{
            expect(error).toBeInstanceOf(Error)
        })
    })
})

describe("UserService.all_tasks",()=>{

    afterEach(() => {
        jest.clearAllMocks();
    });
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
        Task.findAndCountAll = jest.fn()
        Task.findAndCountAll.mockResolvedValue({count:2, rows: result_list})
        //testing
        userService.all_tasks(user,pagination).then((result)=>expect(result).toBe(result_list))
    })
})