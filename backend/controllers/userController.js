const pool = require("../config/db");

const createUser=async(req, res)=>{
    try {
        const {first_name, last_name, gender, dob, email}=req.body;
        const newUser=await pool.query("INSERT INTO users (first_name, last_name, gender, date_of_birth, email) VALUES ($1, $2, $3, $4, $5) RETURNING *", [first_name, last_name, gender, dob, email])
        res.json(newUser.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

const getAllUsers=async(req, res)=>{
    try {
        const allUsers=await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const getUserById=async(req, res)=>{
    try {
        const {id}=req.params;
        const user=await pool.query("SELECT * FROM users WHERE id=$1", [id])
        res.json(user.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const updateUser=async(req, res)=>{
    try {
        const {id}=req.params;
        const updates=req.body;

        const cols=['first_name', 'last_name', 'gender', 'date_of_birth', 'email'];

        const keys=Object.keys(updates).filter(key=>cols.includes(key));

        if(keys.length===0){
            return res.json({error: "No valid fields provided"});
        }

        const setClause=keys.map((key, index)=> `"${key}" = $${index + 1}`).join(", ");

        const queryValues=keys.map(key=>updates[key]);
        queryValues.push(id);

        const updatedUser=await pool.query(`UPDATE users SET ${setClause} WHERE id = $${queryValues.length} RETURNING *;`, 
            queryValues);

        res.json(updatedUser.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

const deleteUser=async(req, res)=>{
    try {
        const {id}=req.params;
        const deletedUser=await pool.query("DELETE FROM users WHERE id=$1", [id]);
        res.json("user deleted");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={createUser, getAllUsers, getUserById, updateUser, deleteUser};