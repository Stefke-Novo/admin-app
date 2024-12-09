const adminTaskService = require("../services/AdminTaskService")
const { Router } = require("express");
const { admin_request_check } = require("../services/RoleService");
const adminTaskController = Router()
/**
 * @swagger
 *   tags:
 *     name: Admin
 *     description: account with role Admin
 */
/**
 * @swagger
 * /admin/all_tasks:
 *   post:
 *     summary: return all tasks based on admin info
 *     tags: [Admin]
 *     description: return all tasks based on admin info
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               admin:
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
 *           examples:
 *             example 1:
 *               value:
 *                 admin:
 *                   email: "user1@gmail.com"
 *                   role: "admin"
 *                 pagination:
 *                   page: 2
 *                   offset: 0
 *                   order: [["created","ASC"]]
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
 *       500:
 *         description: Unexpected error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Unexpected error
 */
adminTaskController.post("/all_tasks",admin_request_check,
    async (req,res)=>{
        const pagination = req.body.pagination
        res.send(await adminTaskService.all_tasks(pagination))
    }
)
/**
 * @swagger
 * /admin/update_task:
 *   post:
 *     summary: return updated task for any user
 *     tags: [Admin]
 *     description: return updated task for any user
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               admin:
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
 *         description: Successful response with updated task
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *       401:
 *         description: Unauthorized role
 *         content:
 *           text/plain:
 *              example: Unauthorized role
 *       400:
 *         description: Bad request
 *         content:
 *           text/plain:
 *             example: Task with the id 31 is not registered
 *       500:
 *         description: Unexpected error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Unexpected error
 */
adminTaskController.post("/update_task",admin_request_check,
    async (req,res)=>{
        const task = req.body.task
        try{
            res.send(200, {"id": await adminTaskService.update_task(task.id,task.body)})
        }catch(error){
            res.send(400, error.message)
        }
    }
)
/**
 * @swagger
 * /admin/delete_task:
 *   post:
 *     summary: return id of deleted task
 *     tags: [Admin]
 *     description: return id of deleted task
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               admin:
 *                 type: object
 *                 properties:
 *                   role:
 *                     type: string
 *               task:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *     responses:
 *       200:
 *         description: Successful response with updated task
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *       401:
 *         description: Unauthorized role
 *         content:
 *           text/plain:
 *              example: Unauthorized role
 *       400:
 *         description: Bad request
 *         content:
 *           text/plain:
 *             example: Task with the id 31 is not registered
 *       500:
 *         description: Unexpected error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Unexpected error
 */
adminTaskController.post("/delete_task",admin_request_check,
    async (req,res)=>{
        try{
            res.send(200, {"id": await adminTaskService.delete_task(req.body.task.id)})
        }catch(error){
            res.send(400, error.message)
        }
    }
)

module.exports = adminTaskController;