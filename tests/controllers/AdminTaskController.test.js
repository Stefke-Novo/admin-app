const app = require("../../index")
const request = require('supertest');

//SERVICES SHOULD BE MOCKED - THE CONCEPT IS ALREADY SHOWN. FOCUS IS ON DOCKER

describe("AdminTaskController.all_tasks",()=>{
    test("return list of tasks from all_task route",async ()=>{
        const response =await request(app).post("/admin/all_tasks").send({
            admin: {
              email: "user1@gmail.com",
              role: "admin"
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
// describe("AdminTaskController.delete_task",()=>{
//   test("return task from create_task",async ()=>{
//       const response =await request(app).post("/admin/create_task").send({
//         task: {
//           body: "body1"
//         },
//         admin: {
//           role: "admin",
//           email: "user1@gmail.com"
//         }
//       })
//         .set('Content-Type', 'application/json')
//         .set('Accept', 'application/json')
//         expect(response.status).toBe(200);
//         expect(response.body).toBeInstanceOf(Object)
//   })
// })

describe("AdminTaskController.update_task",()=>{
  test("return updated task from update_task",async ()=>{
      const response =await request(app).post("/admin/update_task").send({
        admin: {
          role: "admin"
        },
        task: {
          id: 5,
          body: "body1"
        }
      })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object)
  })
})