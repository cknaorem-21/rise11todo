const signUpUser = (req, res) => {
    res.end("response from sign up user")
}

const logInUser = (req, res) => {
    res.end("response from loginUser")
}

const logOutUser = (req, res) => {
    res.end("response from logOutUser")
}

export {
    signUpUser,
    logInUser,
    logOutUser
}