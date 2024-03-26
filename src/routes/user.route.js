import Router from "express"
import {changeCurrentPassword, getCurrentUser, 
   loginUser, logoutUser, refreshAccessToken, 
    registerUser,updateAccountDetails} from "../controllers/user.controller.js"
import { verifyToken } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);

//secured route


userRouter.route('/logout').post(verifyToken , logoutUser);
//not need to use middleware all the logic is decoded in the function only
userRouter.route('/refresh-token').post(refreshAccessToken);
userRouter.route('/change-password').post(verifyToken , changeCurrentPassword);
userRouter.route('/current-user').get(verifyToken , getCurrentUser);
userRouter.route('/update-details').patch(verifyToken , updateAccountDetails);

export {userRouter}