const Task = require("../../models/Task")
jest.createMockFromModule('../../models/Task')
const adminService = require("../../services/AdminTaskService")


describe("adminTaskService.all_tasks",()=>{
    let task_list;
    beforeAll(()=>{
        task_list = [
            {
                id:1,
                user_id:"user1@gmail.com",
                created:"01-01-2024",
                body: "body1"
            },
            {
                id:2,
                user_id:"user1@gmail.com",
                created:"01-02-2024",
                body: "body2"
            }
        ]
    });

    afterEach(() => {
        jest.clearAllMocks();
      });

    test("should return all tasks list",()=>{
        //input
        const pagination = {
            page: 2,
            offset: 0,
            order: [["created","ACS"]]
        }
        //mocking
        Task.findAndCountAll = jest.fn()
        Task.findAndCountAll.mockResolvedValueOnce({count:2,rows:task_list})
        //testing
        adminService.all_tasks(pagination).then(result=>expect(result).toBe(task_list))
    })
})

describe("adminTaskService.update_task",()=>{

    test("should return all tasks list",()=>{
        //inputs
        const id = 1
        const body = "body 1"
        //mocking
        Task.update = jest.fn()
        Task.update.mockResolvedValueOnce([1])
        //testing
        adminService.update_task(id,body).then(result=>expect(result).toBe(id))
    })
})

describe("adminTaskService.delete_task",()=>{
    let id;

    beforeEach(()=>{
        //input
        id = 1;
        //mocking
        Task.destroy = jest.fn()
    })

    afterEach(() => {
        jest.clearAllMocks();
      });

    test("sould return id of deleted task",()=>{
        //mocking
        Task.destroy.mockResolvedValueOnce([1])
        //testing
        adminService.delete_task(id).then(result=>expect(result).toBe(id))
    })

    test("should throw error",()=>{
        //mocking
        Task.destroy.mockResolvedValueOnce([0])
        //testing
        adminService.delete_task(id).catch(error=>expect(error).toBeInstanceOf(Error))
    })
})