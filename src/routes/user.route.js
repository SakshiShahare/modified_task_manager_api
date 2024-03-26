import Router from "express"
import {changeCurrentPassword, getCurrentUser, 
    getUserChannelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, 
    registerUser, updateUserAvatar, updateUserCoverImage ,updateAccountDetails} from "../controllers/user.controller.js"
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

//secured route


router.route('/logout').post(verifyToken , logoutUser);
//not need to use middleware all the logic is decoded in the function only
router.route('/refresh-token').post(refreshAccessToken);
router.route('/change-password').post(verifyToken , changeCurrentPassword);
router.route('/current-user').get(verifyToken , getCurrentUser);
router.route('/update-details').patch(verifyToken , updateAccountDetails);
