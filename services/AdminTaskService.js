const User = require("../models/User")
const Task = require("../models/Task")

async function all_tasks(pagination){
    return (await Task.findAndCountAll({
        subQuery: false,
        include:{
            model: User,
            required: true,
            where:{
                role: 'user',
            },
            attributes:[]
        },
        attributes:["id","body","user_id","created"],
        limit: pagination.page,
        offset: pagination.offset,
        order: pagination.order,
    })).rows
}

async function update_task(id,body){
    const effected_rows = (await Task.update({body:body},{
        include:{
            model: User,
            required: true,
            where:{
                role: 'user',
            },
            attributes:[]
        },
        where: {id: id}
    }))[0]
    if(effected_rows)
        return id;
    else
        throw new Error(`Task with the id ${id} is not registered`)
}

async function delete_task(id){
    const result = (await Task.destroy({where: {id: id}}))
    if(result)
        return id;
    else
        throw new Error(`Task with the id ${id} is not registered`)
}
module.exports = {all_tasks, update_task, delete_task};