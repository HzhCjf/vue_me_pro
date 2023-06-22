import Mock from "mockjs";
import banner from '@/mock/data/banner.json'
import floor from '@/mock/data/floor.json'

Mock.mock('/banner/list','get',{
    code:200,
    data:banner,
    message:'成功',
    ok:true
})

Mock.mock('/floor/list','get',{
    code:200,
    data:floor,
    message:'成功',
    ok:true
})
