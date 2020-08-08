import Mock from 'mockjs'

Mock.mock('/admin/adminMsg','get', {
    status: 200,
    message: '处理成功',
    checkin:'ok',
    data: {username: 'admin', password: '123456'}
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
           employeeName:'杨冀东',
           employeeWord:'123456',
           gender:'男',
           departmentName:'学生'
        },
        {

            employeeName:'大牛',
            employeeWord:'123456',
            gender:'男',
            departmentName:'军官'
        },
        {
            employeeName:'孙协志',
            employeeWord:'123456',
            gender:'女',
            departmentName:'学生'
        },
        {
            employeeName:'许婷',
            employeeWord:'123456',
            gender:'女',
            departmentName:'老师'
        },
        {
            employeeName:'俞银宁',
            employeeWord:'123456',
            gender:'女',
            departmentName:'学生'
        },
        {

            employeeName:'大牛',
            employeeWord:'123456',
            gender:'男',
            departmentName:'军官'
        },
        {
            employeeName:'大鼻',
            employeeWord:'123456',
            gender:'男',
            departmentName:'学生'
        },
        {
            employeeName:'傅超立',
            employeeWord:'123456',
            gender:'男',
            departmentName:'警察'
        },
        {
            employeeName:'杨冀东',
            employeeWord:'123456',
            gender:'男',
            departmentName:'学生'
        },
        {

            employeeName:'大牛',
            employeeWord:'123456',
            gender:'男',
            departmentName:'军官'
        },
        {
            employeeName:'大鼻',
            employeeWord:'123456',
            gender:'男',
            departmentName:'学生'
        },
        {
            employeeName:'许婷',
            employeeWord:'123456',
            gender:'女',
            departmentName:'老师'
        },
        {

            employeeName:'大牛',
            employeeWord:'123456',
            gender:'男',
            departmentName:'军官'
        },
        {
            employeeName:'大鼻',
            employeeWord:'123456',
            gender:'男',
            departmentName:'学生'
        },
        {
            employeeName:'许婷',
            employeeWord:'123456',
            gender:'女',
            departmentName:'老师'
        }]
})





