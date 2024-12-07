const Task = require("../models/Task")

async function create_task(body){
    const created_task = await Task.create({body: body});
    return created_task.id
}

async function update_task({id, body}){
    const updated_task = await Task.update({id: id,body: body});
    return updated_task.id;
}

async function all_tasks(user,pagination){
    return await Task.findAndCountAll({
        subQuery: false,
        where:{
            user_id: user.email
        },
        limit: pagination.page,
        offset: pagination.offset,
        order: pagination.order,
    })
}
module.exports = {create_task,update_task, all_tasks};