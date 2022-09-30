import User from "../models/User.js"

const Users = {
    getAllUsers: async (req, res) => {
        const users = await User.find()

        res.status(200).json({status: "OK",
                              moment: new Date().toLocaleString(), 
                              users
                            })
    },
    createUser: async (req, res) => {
        const user = new User(req.body)

        const uploadedUser = await user.save()
        
        res.status(201).json({status: "OK", moment: new Date().toLocaleString(), uploadedUser})
    },
    getUserById: async (req, res) => {
        const user = await User.findById(req.params.id)

        res.status(200).json({status: "OK", moment: new Date().toLocaleString(), user})
    },
    getUserByEmail: async (req, res) => {
        const user = await User.findOne({email: req.params.email})

        res.status(200).json({status: "OK", moment: new Date().toLocaleString(), user})
    },
    updateUser: async (req, res) => {
        const { id } = req.params
        const data = req.body

        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })

        res.status(200).json({status: "OK", moment: new Date().toLocaleString(), updatedUser})
    },
    patchUser: (req, res) => {

    },
    deleteUser: async (req, res) => {
        const { id } = req.params

        const deletedUser = await User.findByIdAndDelete(id)

        res.status(200).json({status: "OK", moment: new Date().toLocaleString(), deletedUser})
    }
}

export default Users