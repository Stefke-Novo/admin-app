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
        const {admin,pagination} = req.body
        res.send(await adminTaskService.all_tasks(admin, pagination))
    }
)

module.exports = adminTaskController;