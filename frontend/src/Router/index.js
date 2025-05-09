import {createRouter,createWebHistory} from "vue-router";
import Login from  '../components/Login.vue';
import Signing from "@/components/Signing.vue";
import Users from "@/components/Users.vue";
import Category from "@/components/Category.vue";
import Product from "@/components/Product.vue";
const routes=[
    {path:"/Login",name:"Login",component:Login},
    {path:"/Signin",name:"Signin",component:Signing},
    {path:"/users",name:"users",component:Users},
    {path:"/Category",name:"Category",component:Category},
    {path:"/Product",name:"Product",component:Product},

]
const router=createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),routes
});

router.beforeEach((to,from)=>{
    from
    console.log(to.name)
    console.log(from.name)
    if(to==undefined && from==undefined){
        if(to.name==from.name)
        return {name:'Home'}
    }
});

export default router;