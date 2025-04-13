<template>
    <Header/>
    <section id="barNav" class="bg-dark text-light p-5 text-center">
        <div class="container border border-white pb-3 rounded-3">
            <div class="p-2">
                <h1>Categories</h1>
            </div>
        </div>
    </section>

    <section>
    <div class="" style="position: absolute !important;left:8% !important;">
      <div class="mt-3 mb-0">
        <div class="col-md">
            <button  class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modelForm">New</button>

        </div>
      </div>
    </div>
  </section>    
    <section class="modal fade" id="modelForm">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Category Form</h5>
                    <button class="btn-close" aria-label="close" data-bs-dismiss="modal" @click="clearData" ></button>
                </div>
                <div class="modal-body">
                    <div class="form">

                        <div class="row">
                            <div class="col-md mt-2">
                                <label for="" class="label-control mt-2">First Name</label>
                                <input type="text"  v-model="category.name"  class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md mt-2">
                                <label for="" class="label-control mt-2">Last Name</label>
                                <input type="text"    v-model="category.description" class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md mt-2">
                                <input type="button"   value="Submit" @click="submitData" class="btn btn-dark">
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

        <DataTable
      :columns="columns"
      :options="options"
      :data="data"
      class="display nowrap"
      width="100%"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th class="text-start" style="width: 180px;">&nbsp;&nbsp;&nbsp;</th>
        </tr>
      </thead>
    </DataTable>
        <!-- <table id="example" class="table">
            <thead>
                <tr>
                    <th class="text-start">Id</th>
                    <th class="text-start">First Name</th>
                    <th class="text-start">Last Name</th>
                    <th class="text-start">Email</th>
                    <th class="text-start">Phone</th>
                    <th class="text-start">Role</th>
                    <th class="text-start" style="width: 180px;">&nbsp;&nbsp;&nbsp;</th>

                </tr>
            </thead>
            <tbody id="dataEvent">

            </tbody>
        </table> -->
        
    </div>
</div>

</section>

    </template>
    <script>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-responsive';
import 'datatables.net-select';

DataTable.use(DataTablesCore);

     import Header from './Header.vue';
    //  import Breadcrump from './breadcrumb.vue';
     export default {
        name:"Category",
//         mounted() {
//             this.getData()

// },

        data:function(){
return {
//     columns : [
//   { data: 'first_name' },
//   { data: 'last_name' },
//   { data: 'email' },
//   { data: 'phone' },
//   { data: 'role' },
//   { title: "Actions", 
//     data: null,
//     orderable: false,
//     render: function (data, type, row) {
//         console.log(row)
    
//       return `

//                              <button class="btn btn-sm btn-primary me-2"  data-bs-toggle="modal" data-bs-target="#modelForm"
//                 onclick="event.preventDefault(); window.vm.editRow('${row._id}','${row.first_name}','${row.last_name}','${row.email}','${row.phone}','${row.role}')">
//                 <i class="fas fa-edit"></i> Edit
//               </button>
//               <button class="btn btn-sm btn-danger" 
//                 onclick="event.preventDefault(); window.vm.deleteRow('${row._id}')">
//                 <i class="fas fa-trash"></i> Delete
//               </button>
//       `;
//     }
// }
// ],
// data:[],
// options: {
//   layout: {
//     // topStart: 'buttons',
//   },
//   responsive: true,
//   select: false,
// },

    API_URL:"http://localhost:4000/API",
    category:{
        name:"",
        description:"",
        _id:""
    }
}
        },
        methods:{
            submitData(){
            const {token}=JSON.parse(localStorage.getItem("user_info"));
            if(this.category.name!="" && this.category.description!=""){
                        fetch(`${this.API_URL}/category/submitData`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "authorization":`Bearer ${token}`
        },
        body:JSON.stringify(this.category)
    }
    ).then(res=>res.json()).then(res=>
    {
        if(res.message){
            this.$toast.success(res.message);
            // this.getData();
            
        }else if(res.err){
                        this.$toast.warning(res.err);                        
        }   
    }).catch(error=>{console.log(error)});
            }else{  
                this.$toast.warning("Please all the fields are required !!")
            }
            },
            clearData(){
                this.category.name="";
                this.category._id="";
                this.category.description="";                

            },
    //         updateUser(){
    //             if(this.user._id==""){
    //                 if(!(this.user.first_name!="" && this.user.last_name && this.user.phone && this.user.password!="")){
    //                   this.$toast.warning("Please all the fields are required !!")
    //                 }
    //             }
    //             const {token}=JSON.parse(localStorage.getItem("user_info"));
    //     this.userFormData.append("password",this.user.password)
    //     fetch(`${this.API_URL}/user/updateUser`,{
    //     method:"POST",
    //     headers:{
    //         "Accept":"application/json",
    //         // "Content-Type":"application/json",
    //         "authorization":`Bearer ${token}`
    //     },
    //     body:this.userFormData
    // }
    // ).then(res=>res.json()).then(res=>
    // {
    //     if(res.message){
    //         this.$toast.success(res.message);
    //         this.getData();
            
    //     }else if(res.err){
    //                     this.$toast.warning(res.err);                        
    //     }   
    // }).catch(error=>{console.log(error)});
    //         },
    //         handleChange(e){
    //         const value=e.target.name=="photo"?e.target.files[0]:e.target.value;
    //         console.log(e.target.name)
    //         this.userFormData.set(e.target.name,value);
    //     },

    //         editRow(_id,first_name,last_name,email,phone,role) {
    //             this.user.first_name=first_name;
    //             this.user._id=_id;
    //             this.user.last_name=last_name;
    //             this.user.email=email;
    //             this.user.phone=phone;
    //             this.user.role=role;
    //             this.userFormData.set("first_name",first_name);
    //             this.userFormData.set("_id",_id);
    //             this.userFormData.set("last_name",last_name);
    //             this.userFormData.set("email",email);
    //             this.userFormData.set("phone",phone);
    //             this.userFormData.set("role",role);
    // },
    // getData(){
    //     window.vm = this;
    //         const {token}=JSON.parse(localStorage.getItem("user_info"));

    //         fetch(`${this.API_URL}/user/getData`,{
    //                 method:"POST",
    //                 headers:{
    //                     "Accept":"application/json",
    //                     "Content-Type":"application/json",
    //                     "authorization":`Bearer ${token}`
    //                 },
    //                 body:JSON.stringify(this.user)
    //             }
    //             ).then(res=>res.json()).then(res=>
    //             {
    //                 if(res.data){
    //                     console.log(res.data);
    //                     this.data=res.data
    //                 }
    //             }).catch(error=>{console.log(error)});

    // },
//     deleteRow(id){
//         const {token}=JSON.parse(localStorage.getItem("user_info"));

// fetch(`${this.API_URL}/user/deleteUser/${id}`,{
//         method:"POST",
//         headers:{
//             "Accept":"application/json",
//             "Content-Type":"application/json",
//             "authorization":`Bearer ${token}`
//         },
//         body:JSON.stringify(this.user)
//     }
//     ).then(res=>res.json()).then(res=>
//     {
//         if(res.message){
//             this.$toast.success(res.message);
//             this.getData()
            
//         }
//     }).catch(error=>{console.log(error)});
// },

        },
        components:{
            Header
        },
     }
    </script>
<style>
@import 'datatables.net-dt';
@import 'datatables.net-buttons-dt';
@import 'datatables.net-responsive-dt';
@import 'datatables.net-select-dt';
</style>
