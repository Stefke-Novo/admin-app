const { Router } = require("express");
const Task = require("../models/Task");
const userService = require("./../services/UserService")
const UserController = Router()
const create_task_route = "/create_task"
/**
 * @swagger
 *   tags:
 *     name: User
 *     description: account with role User
 */
/**
 * @swagger
 *   tags:
 *     name: Admin
 *     description: account with role Admin
 */
/**
 * @swagger
 * /user/create_task:
 *   post:
 *     summary: create new task with new body
 *     tags: [User]
 *     description: create new task with new body
 *     responses:
 *       200:
 *         description: Successful response with id of created task
 */
UserController.post("/create_task",(req,res)=>{
    res.send(userService.create_task(req.body))
})

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
 */
UserController.post("/all_tasks",async (req,res)=>{
    result = await userService.all_tasks(req.body.user,req.body.pagination)
    console.log(result)
    res.send(result)
})

module.exports = UserController;