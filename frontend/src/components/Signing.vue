<template>
    <Header/>
    <section id="barNav" class="bg-dark text-light p-5 text-center">
        <div class="container border border-white pb-3 rounded-3">
            <div class="p-2">
                <h1>Sign In</h1>
            </div>
        </div>
    </section>

<!-- <Breadcrump :activeurl="activeurl" :inactiveurl="inactiveurl"/> -->

<section class="m-3">
    <div class="container">
        <div class="row">
           <div class="card col-md-6 mx-auto">
            <div class="card-body">
                <div class="card-title">
                <h3>
                    Sign In Form
                </h3>
                 
                </div>
                <form>
                    <div class="row col-md mt-2">
                        <label for="" class="form-label">Photo</label>
                        <input type="file" name="photo"   required @change="handleChange" value="" class="form-control">

                    </div>

                    <div class="row col-md mt-2">
                        <label for="" class="form-label">First Name</label>
                        <input type="text" name="first_name" v-model="user.first_name" required @change="handleChange" value="" class="form-control">

                    </div>

  
                    <div class="row col-md mt-2">
                        <label for="" class="form-label">Last Name</label>
                        <input type="text" name="last_name" v-model="user.last_name" required @change="handleChange" value="" class="form-control">

                    </div>
                    <div class="row col-md mt-2">
                        <label for="" class="form-label">Phone</label>
                        <input type="text" name="phone" v-model="user.phone" required @change="handleChange" value="" class="form-control">

                    </div>

                    <div class="row col-md mt-2">
                        <label for="" class="form-label">Email</label>
                        <input type="text" name="email" v-model="user.email" required @change="handleChange" value="" class="form-control">

                    </div>
                    <div class="row col-md mt-2">
                        <label for="" class="form-label">Password</label>
                        <input type="text" name="pw" v-model="user.password" required @change="handleChange" value="" class="form-control">

                    </div>
                    <div class="row col-md mt-2">
                        <button type="button" @click="Signin" class="btn btn-dark text-white">Submit</button>
                    </div>

                </form>
            </div>
           </div>
           
        </div>
    </div>
</section>

    </template>
    <script>
     import Header from './Header.vue';
    //  import Breadcrump from './breadcrumb.vue';
     export default {
        name:"Signin",
        data:function(){
return {

    activeurl:"Signin",
    inactiveurl:[{name:"Home"}],
    API_URL:"http://localhost:4000/API",
    userFormData:new FormData(),
    user:{
        first_name:"",
        last_name:"",
        role:"",
        email:"",
        password:""
    }
}
        },
        methods:{
            handleChange(e){
            const value=e.target.name=="photo"?e.target.files[0]:e.target.value;
            this.userFormData.set(e.target.name,value);
        },

        Signin(){
            // this.$toast.success("Login With Success");
                fetch(`${this.API_URL}/user/singIn`,{
                    method:"POST",
                    headers:{
                        "Accept":"application/json",
                        // "Content-Type":"application/json"
                    },
                    body:this.userFormData
                }
                ).then(res=>res.json()).then(res=>{
                    if(res.message){
                        // const {first_name,last_name,_id,token,role}=res;
                        // localStorage.setItem("user_info",JSON.stringify({first_name,last_name,_id,token,role}));
                        this.$toast.success(res.message);                        
                        this.$router.push("/Login");
                    }else if(res.error){
                        this.$toast.warning(res.error);                        
                    }else{
                        console.log(res)
                    }
                }).catch(error=>{console.log(error)});
            }
        },
        components:{
            Header
        },
     }
    </script>
