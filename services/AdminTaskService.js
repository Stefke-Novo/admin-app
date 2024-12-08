const Task = require("./../models/Task")
const User = require("./../models/User")

async function all_tasks(admin,pagination){
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
module.exports = {all_tasks};