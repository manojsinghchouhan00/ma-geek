import User from "../Model/userSchema.js";


export const postLogin = (req, res) => {

    try {

        const { email } = req.body;
        const { password } = req.body;

        User.find({ email, password })
            .then(response => {
                if (response.length > 0) {
                    res.status(200).json({
                        message: "success",
                        login: response,
                        isAuthenticated: true
                    })
                } else {
                    res.status(200).json({
                        message: "User Details Not Found",
                        login: response,
                        isAuthenticated: false
                    })
                }
            })
            .catch(error => {
                res.status(500).json({ error: err });

            })

    } catch (error) {
        res.status(500).json({ message: error })
    }

}

export const postSignUp = async (req, res) => {

    try {

        const { username } = req.body;
        const { email } = req.body;

        const exist = await User.find({ $or: [{ username, email }] });

        if (exist.length > 0) {
            res.status(200).json({ message: "exist" });

        } else {
            const userData = req.body;
            const newUser = new User(userData);
            await newUser.save();
            res.status(200).json({
                message: userData
            })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }

}