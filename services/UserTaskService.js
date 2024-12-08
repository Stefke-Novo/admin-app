const Task = require("../models/Task")

async function create_task(body, email){
    const created_task = (await Task.create({body: body, user_id: email, created: new Date()}));
    return created_task.id
}

async function update_task({id, body}){
    console.log("parameters:", id, body)
    const updated_task = await Task.update({body: body},{where : {id: id}});
    if(updated_task[0])
        return id;
    else
        throw new Error("No element with the id")
}

async function all_tasks(user,pagination){
    return (await Task.findAndCountAll({
        subQuery: false,
        where:{
            user_id: user.email
        },
        limit: pagination.page,
        offset: pagination.offset,
        order: pagination.order,
    })).rows
}
module.exports = {create_task,update_task, all_tasks};