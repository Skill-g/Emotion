class UserController {
    async registration(req, res, next) {
        const {login, password, role} = req.body
        if(!login || !password ) {
            return next(Api.error.badRequest("Не правильный login или пароль"))
        }
        const cond = await User.findOne({where: {login}})
        if (cond) {
            return next(Api.error.badRequest("Такой пользователь уже существует"))
        }
        const hashpass = await bcrypt.hash(password, 5)
        const user = await User.create({login, role, password: hashpass})
        const jwt = jwt.sign({id: user.id, password, role }, process.env.SECRET_KEY
    }
}