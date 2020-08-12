import Mock from 'mockjs'

Mock.mock('/admin/adminMsg','get', {
    status: 200,
    message: '登陆成功',
    token:'HYUKSNFDGE7WSDA6',
    data: {employeeName: 'admin', password: '123456'}
})

Mock.mock('/admin/Users','post',function(option){
        console.log(option)
        return Mock.mock({
            status:200,
            message:'@cword(2)',
        })
}),


Mock.mock('/admin/Users','get',{
    status: 200,
    message: '处理成功',
    data: [{
           id:'1',
           employeeName:'杨冀东',
           employeeWord:'123456',
           gender:'1',
           departmentName:'学生',
           admin:'1'
        },
        {
            id:'2',
            employeeName:'大牛',
            employeeWord:'123456',
            gender:'1',
            departmentName:'军官',
            admin:'1'
        },
        {
            id:'3',
            employeeName:'孙协志',
            employeeWord:'123456',
            gender:'0',
            departmentName:'学生',
            admin:'1'
        },
        {
            id:'4',
            employeeName:'许婷',
            employeeWord:'123456',
            gender:'0',
            departmentName:'老师',
            admin:'1'
        }]
})





