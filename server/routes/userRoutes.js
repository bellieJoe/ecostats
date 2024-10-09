
import express from "express"
const router = express.Router()
import UserModel from "../model/User.js";
import UserService from "../service/userService.js";

// Activate user account
router.patch('/:id/activate', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found.');
        }

        user.isActive = true;
        await user.save();

        return res.status(200).send('User account activated.');
    } catch (error) {
        return res.status(500).send('Server error.');
    }
});

// Deactivate user account
router.patch('/:id/deactivate', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found.');
        }

        user.isActive = false;
        await user.save();

        return res.status(200).send('User account deactivated.');
    } catch (error) {
        return res.status(500).send('Server error.');
    }
});

router.get("/test", async (req, res) => {
    const test = await UserService.test();
    return res.status(200).send(test)
});

export default router;
