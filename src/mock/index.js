import Mock from 'mockjs'

Mock.mock('/api/user_data','get',{
    status: 200,
    message: '获取用户数据成功',
    data:[{username:'admin',password:'123456'},
          {name:'杨冀东',age:'24',pro:'学生'},
          {name:'何英泽',age:'24',pro:'学生'},
          {name:'傅大牛',age:'24',pro:'军人'},
          {name:'傅超立',age:'24',pro:'警察'},
          {name:'将露怡',age:'24',pro:'傅超立老婆'}]
})