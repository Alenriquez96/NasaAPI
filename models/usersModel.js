const usersSchema = require("./usersSchema");


const getAllUsers = async() =>{
    try {
        const getAll = await usersSchema.find({},"-_id");
        return getAll;
    } catch (error) {
        console.log(error);
    }
}


const createUser = async(user) =>{
    try {
        const newUser = new usersSchema(user);
        await usersSchema.create(newUser);
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async(user) =>{
    try {
        const newUser = usersSchema(user.body);
        const oldUser = await usersSchema.findOne({ name: user.name});
        oldUser.overwrite(newUser);
        await oldUser.save();
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async(email) =>{
    try {
        await usersSchema.deleteOne({email: email});
    } catch (error) {
        console.log(error);
    }
}

const usersObj = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}

module.exports = usersObj;