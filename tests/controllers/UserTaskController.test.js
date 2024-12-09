const app = require("../../index")
const request = require('supertest');

//SERVICES SHOULD BE MOCKED - THE CONCEPT IS ALREADY SHOWN. FOCUS IS ON DOCKER

describe("UserTaskController.all_tasks",()=>{
    test("return list of tasks from all_task route",async ()=>{
        const response =await request(app).post("/user/all_tasks").send({
            user: {
              email: "user1@gmail.com",
              role: "user"
            },
            pagination: {
              page: 2,
              offset: 0,
              order: [
                [
                  "created",
                  "ASC"
                ]
              ]
            }
          })
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Array)
    })
})
describe("UserTaskController.create_task",()=>{
  test("return task from create_task",async ()=>{
      const response =await request(app).post("/user/create_task").send({
        task: {
          body: "body1"
        },
        user: {
          role: "user",
          email: "user1@gmail.com"
        }
      })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object)
  })
})

describe("UserTaskController.update_task",()=>{
  test("return updated task from update_task",async ()=>{
      const response =await request(app).post("/user/update_task").send({
        user: {
          role: "user"
        },
        task: {
          id: 4,
          body: "body1"
        }
      })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object)
  })
})