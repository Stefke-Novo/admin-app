const { Router } = require("express");
const userTaskService = require("../services/UserTaskService");
const { user_request_check } = require("../services/RoleService");
const TaskController = Router()
/**
 * @swagger
 *   tags:
 *     name: User
 *     description: account with role User
 */
/**
 * @swagger
 * /user/create_task:
 *   post:
 *     summary: create new task with new body
 *     tags: [User]
 *     description: create new task with new body
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: object
 *                 properties:
 *                   body:
 *                     type: string
 *               user:
 *                 type: object
 *                 properties:
 *                   role:
 *                     type: string
 *                   email:
 *                     type: string
 *     responses:
 *       200:
 *         description: Successful response with id of created task
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 id:
 *                   type: string 
 *       500:
 *         description: Unexpected error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Unexpected error
 */
TaskController.post("/create_task",
    user_request_check,
    async (req,res)=>{
        res.send({id: (await userTaskService.create_task(req.body.task.body, req.body.user.email))})
    }
)

/**
 * @swagger
 * /user/all_tasks:
 *   post:
 *     summary: get all tasks for current user
 *     tags: [User]
 *     description: get all tasks for current user
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *               pagination:
 *                 type: object
 *                 properties:
 *                   page:
 *                     type: integer
 *                   offset:
 *                     type: integer
 *                   order:
 *                     type: array
 *                     items:
 *                       type: array
 *                       items:
 *                         type: string
 *     responses:
 *       200:
 *         description: Successful response with list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   body:
 *                     type: string
 *                   user_id:
 *                     type: string
 *                   created:
 *                     type: string
 *       401:
 *         description: Authorization information is missing or invalid.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Unauthorized user
 *       500:
 *         description: Server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Undexpected error
 */
TaskController.post("/all_tasks", user_request_check ,
    async (req,res)=>{
        result = await userTaskService.all_tasks(req.body.user,req.body.pagination)
        res.send(result)
    }
)
/**
 * @swagger
 * /user/update_task:
 *   post:
 *     summary: update particular task
 *     tags: [User]
 *     description: update particular task
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   role:
 *                     type: string
 *               task:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   body:
 *                     type: string
 *     responses:
 *       200:
 *         description: Successful response with task id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *       401:
 *         description: Authorization information is missing or invalid.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Unauthorized user
 *       500:
 *         description: Server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Undexpected error
 */
TaskController.post("/update_task", user_request_check,
    async (req,res)=>{
        const {id,body} = req.body.task
        try{
            const result = await userTaskService.update_task({id: id, body: body})
            res.send({"id": result})
        }catch(error){
            res.status(403).send(error.message)
        }
    }
)

module.exports = TaskController;