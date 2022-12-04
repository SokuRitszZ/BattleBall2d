const crypto = require("crypto");
const R = require("../utils/R");
const User = require("../db/models/User");

const secretKey = "OWIEFHYGUIBRLKBHJLKHOIWEFHoewihwfou2y4r82hofbue";

const register = async (username, password, confirmedPassword) => {
  if (!username || !password || !confirmedPassword)
    return R.fail("输入项为空");
  username = username.trim()
  password = password.trim();
  confirmedPassword = confirmedPassword.trim();
  if (!username || !password || !confirmedPassword)
    return R.fail("输入项为空");

  if (!/^[a-zA-Z0-9_]+$/.test(username))
    return R.fail("用户名存在非法字符");

  if (!/^[a-zA-Z0-9.]+$/.test(password))
    return R.fail("密码存在非法字符");

  if (username.length > 12)
    return R.fail("用户名长度大于12");

  if (password.length > 32)
    return R.fail("密码长度大于32");

  if (password !== confirmedPassword)
    return R.fail("两次密码不一致");

  if (await User.findOne({ where: { username: username } }))
    return R.fail("此用户名已存在");

  password = crypto
    .createHmac("md5", secretKey)
    .update(password)
    .digest("hex");

  const newUser = await User.create({
    username,
    password
  });

  return R.ok({
    message: "注册成功",
    id: newUser.id
  });
};

const login = async (username, password) => {
  if (!username || !(username = username.trim()) || !password || !(password = password.trim()))
    return R.fail("输入项为空");

  password = crypto
    .createHmac("md5", secretKey)
    .update(password)
    .digest("hex")

  const user = await User.findOne({ where: { username, password } });
  if (!user)
    return R.fail("用户名或密码错误");

  return R.ok({
    message: "登录成功",
    id: user.id
  });
};

module.exports = {
  register,
  login
};