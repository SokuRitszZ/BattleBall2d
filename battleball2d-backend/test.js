const sequelize = require("./db/index");
const User = require("./db/models/User");
// 关闭连接API
// sequelize.close();

// 测试连接
const testConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connect Success");
  } catch (error) {
    console.log("Connect Failed");
  }
};


const testBuild = async () => {
  const andrew = User.build({
    username: "Andrew",
    password: "llyihs1729"
  });
  console.log(andrew instanceof User);
  await User.sync({force: false});
  // andrew.save().then(r => console.log(andrew.id));
};

const testCreate = async () => {
  const andrew = await User.create({
    username: "Andrew",
  });
  console.log(andrew instanceof User);
  console.log(andrew.toJSON());
};

const testQuery = async () => {
  const andrew = await User.findOne({
    where: {
      id: 3
    }
  });
  console.log(andrew.toJSON());
};

const testQuerys = async () => {
  const users = await User.findAll({
    where: {
      id: [1, 2, 3]
    }
  });
  console.log(users.map(user => user.toJSON()));
};

const testUpdate = async () => {
  await User.update({
    username: "SokuRitszZ"
  }, {
    where: {
      id: [1, 2, 3]
    }
  })
};

const testFindAll = async () => {
  const list = await User.findAll();
  console.log(list);
};

// testUpdate();

