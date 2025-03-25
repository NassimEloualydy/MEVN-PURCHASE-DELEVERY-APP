<template>
    <Header/>
    <section id="barNav" class="bg-dark text-light p-5 text-center">
        <div class="container border border-white pb-3 rounded-3">
            <div class="p-2">
                <h1>Users</h1>
            </div>
        </div>
    </section>

    <section>
    <div class="" style="position: absolute !important;left:8% !important;">
      <div class="mt-3 mb-0">
        <div class="col-md">
            <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modelForm">New</button>

        </div>
      </div>
    </div>
  </section>    
    <section class="modal fade" id="modelForm">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Category Form</h5>
                    <button class="btn-close" aria-label="close" data-bs-dismiss="modal" @click="clearData()" ></button>
                </div>
                <div class="modal-body">
                    <div class="form">
                        <div class="row">
                            <div class="col-md mt-2">
                                <label for="" class="label-control mt-2">Name</label>
                                <input type="text"    class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md mt-2">
                                <label for="" class="label-control mt-2">Description</label>
                                <input type="text"     class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md mt-2">
                                <input type="button"   value="submitButton" class="btn btn-dark">
                            </div>
                        </div>

                    </div>
                    </div>
                </div>
            </div>
    </section>

    <section className="py-5">
    <div className="container">

      <div className="row tableData">

        <table id="example" class="table">
            <thead>
                <tr>
                    <th class="text-start">Id</th>
                    <th class="text-start">First Name</th>
                    <th class="text-start">Last Name</th>
                    <th class="text-start">Email</th>
                    <th class="text-start">Phone</th>
                    <th class="text-start">Role</th>

                </tr>
            </thead>
            <tbody id="dataEvent">

            </tbody>
        </table>
        
    </div>
</div>

</section>

    </template>
    <script>
     import Header from './Header.vue';
    //  import Breadcrump from './breadcrumb.vue';
     export default {
        name:"Users",
        mounted() {
            const {token}=JSON.parse(localStorage.getItem("user_info"));

            fetch(`${this.API_URL}/user/getData`,{
                    method:"POST",
                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json",
                        "authorization":`Bearer ${token}`
                    },
                    body:JSON.stringify(this.user)
                }
                ).then(res=>res.json()).then(res=>
                {
                    if(res.data){
                        console.log(res.data)
                        $('#example').DataTable({
                data:res.data,
                columns: [
                    { data: "_id" ,visible: false},

                    { data: "first_name" ,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                        }
                    },
                    { data: "last_name" ,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                        }
                    },
                    { data: "email" ,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                        }
                    },

                    { data: "phone" ,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                        }
                    },
                    { data: "role" ,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                        }
                    },


                ],
                stateSave: true,
                "bDestroy": true,
 
            });

                    }
                }).catch(error=>{console.log(error)});


},

        data:function(){
return {

    activeurl:"Users",
    inactiveurl:[{name:"Home"}],
    API_URL:"http://localhost:4000/API",

    user:{
        email:"",
        password:""
    }
}
        },
        methods:{
            login(){
                // fetch(`${this.API_URL}/user/singIn`,{

                fetch(`${this.API_URL}/user/login`,{
                    method:"POST",
                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(this.user)
                }
                ).then(res=>res.json()).then(res=>{
                    if(res.message){
                        const {first_name,last_name,_id,role}=res.user;
                        const {token}=res;
                        localStorage.setItem("user_info",JSON.stringify({first_name,last_name,_id,token,role}));
                        this.$toast.success("Login With Success");
                        this.$router.push("/Home");
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
