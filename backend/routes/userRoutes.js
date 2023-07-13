import  compareSync  from 'bcryptjs'
import express from 'express'
import User from '../models/UserModel.js'
import { generateToken } from '../utils.js'
import expressAsyncHandler from 'express-async-handler'

const userRouter = express.Router()

userRouter.post('/signin', expressAsyncHandler(async(req, res) => {
  const user = User.findOne({email: req.body.email})
  if(user){
    if(bcrypt.compareSync(req.body.email, user.email)){
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user)
      })
      return
    }
  }
  res.status(401).send({ message: 'Invalid email or password!' })
}))

export default userRouter