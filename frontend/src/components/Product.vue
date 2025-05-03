<template>
    <Header/>
    <section id="barNav" class="bg-dark text-light p-5 text-center">
        <div class="container border border-white pb-3 rounded-3">
            <div class="p-2">
                <h1>Product</h1>
                <div class="container">
                    <form action="">
                        <div class="row text-center">
                                <div class="col-md mt-2">
                                    <input type="text"  placeholder="Name" v-model="product_search.name" class="form-control"/>
                                </div>
                                <div class="col-md mt-2">
                                    <input type="text"  placeholder="Code" v-model="product_search.default" class="form-control"/>
                                </div>
                                <div class="col-md mt-2">
                                    <input type="text"  placeholder="Type" v-model="product_search.product_type" class="form-control"/>
                                </div>
                                <div class="col-md mt-2">
                                    <input type="text"  placeholder="Invoice Policy" v-model="product_search.invoice_policy" class="form-control"/>
                                </div>


                            </div>
                            <div class="row text-center">
                                <div class="col-md mt-2">
                                    <input type="text"  placeholder="Sale Price" v-model="product_search.sale_price" class="form-control"/>
                                </div>
                                <div class="col-md mt-2">
                                    <input type="text"  placeholder="Cost" v-model="product_search.cost" class="form-control"/>
                                </div>
                                <div class="col-md mt-2">
                                    <input type="text"  placeholder="Category" v-model="product_search.category" class="form-control"/>
                                </div>

                            </div>

                            <div class="row text-center">
                                <div class="col-md mt-2">
                                    <input type="button" value="Search" @click="getData" class="btn btn-dark w-100">
                                </div>
                            </div>


                    </form>
                </div>
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
                    <h5>Product Form</h5>
                    <button class="btn-close" aria-label="close" data-bs-dismiss="modal" @click="clearData" ></button>
                </div>
                <div class="modal-body">
                    <div class="form">

                        <div class="row">
                            <div class="col-md mt-2">
                                <label for="" class="label-control mt-2">Photo</label>
                                <input type="file" name="photo"  @change="handleChange"  class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md mt-2">
                                <label for="" class="label-control mt-2">Name</label>
                                <input type="text" name="name"  @change="handleChange"  v-model="product.name" class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md mt-2">
                                <label for="" class="label-control mt-2">Code</label>
                                <input type="text" @change="handleChange"   v-model="product.default_code" name="default_code" class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md mt-2">
                                <label for="" class="label-control mt-2">Product Type</label>
                                <!-- <input type="text"    v-model="product.name" class="form-control"> -->
                                    <select  class="form-control" @change="handleChange" v-model="product.product_type" name="product_type">
                                        <option value="">Choose A Type</option>
                                        <option value="Service">Service</option>
                                        <option value="Storable">Storable</option>
                                        <option value="Consu">Consu</option>
                                    </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md mt-2">
                                <label for="" class="label-control mt-2">Invoice Policy</label>
                                <!-- <input type="text"    v-model="product.name" class="form-control"> -->
                                    <select  class="form-control" @change="handleChange" v-model="product.invoice_policy" name="invoice_policy">
                                        <option value="">Choose A Type</option>
                                        <option value="Service">Service</option>
                                        <option value="Storable">Storable</option>
                                        <option value="Consu">Consu</option>
                                    </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md mt-2">
                                <label for="" class="label-control mt-2">Sale Price</label>
                                <input type="text" @change="handleChange"    v-model="product.sale_price" name="sale_price" class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md mt-2">
                                <label for="" class="label-control mt-2">Cost</label>
                                <input type="text" @change="handleChange"    v-model="product.cost" name="cost" class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md mt-2">
                                <label for="" class="label-control mt-2">Category</label>
                                <select name="category" @change="handleChange" v-model="product.category" class="form-control">
                                        <option value="">Choose A Type</option>
                                        <option :key="c._id" v-for="c in dataCategory" :value="c._id">{{c.name}}</option>

                                    </select>
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
<br>
<br>
    <section className="py-5">
      <div className="container">
        <!-- <div class="fw-bolder h5 mb-2"  v-for="(value, key) in categories">{{value}}</div> -->
         <div :key="categories" v-for="c in categories">
             <div class="fw-bolder h5 mb-2">{{c}}</div>
        <swiper
    :modules="modules"
    :slides-per-view="4"
    :space-between="50"
    :pagination="{ clickable: true }"
    :scrollbar="{ draggable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    :breakpoints="{
            '@0.00': {slidesPerView: 1},
            '@0.75': {slidesPerView: 2},
            '@1.00': {slidesPerView: 2},
            '@1.50': {slidesPerView: 4},
}"

  >
  
  <swiper-slide :key="products" v-for="p in products.filter(p => p.category.name === c)">
          <div   class="card">
            <div class="card-body">
                <img 
                    :src="API_URL+'/product/getPhoto/'+p._id"
                    alt=""
                    className="card-img-top img-main img-fluid imgProduct"
                  />
                  <div class="card-title text-center mt-3">{{p.name}}</div>
                    <div class="card-text text-center">
                        <div className="d-flex text-start">
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Code</div>
                          <div className="fw-normal">{{p.default_code}}</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Price</div>
                          <div className="fw-normal">{{ p.sale_price }} $</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Cost</div>
                          <div className="fw-normal">{{p.cost}}</div>
                        </div>
                      </div>
                    </div>
                    <div class="card-text text-center">
                      <input type="button" value="Delete"  @click="deletData(p._id)" class="btn btn-dark w-100 mb-2">
                      <br>
                      <input type="button" value="Update" @click="loadData(p)"  data-bs-toggle="modal" data-bs-target="#modelForm" class="btn btn-dark w-100">
                    </div>
            </div>
        </div>
        <br/><br/>
    </swiper-slide>
</swiper>      <!-- <div className="row tableData"> -->

            </div>

    <!-- <swiper-slide>
        <div class="card">
            <div class="card-body">
                <img 
                    src=""
                    alt=""
                    className="card-img-top img-main img-fluid imgProduct"
                  />
                  <div class="card-title text-center mt-3">Product 1</div>
                    <div class="card-text text-center">
                        <div className="d-flex text-start">
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Name</div>
                          <div className="fw-normal">Name</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Price</div>
                          <div className="fw-normal">50 $</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Category</div>
                          <div className="fw-normal">Cat</div>
                        </div>
                      </div>
                    </div>
            </div>
        </div>
        <br/><br/>
    </swiper-slide>
    <swiper-slide>
        <div class="card">
            <div class="card-body">
                <img 
                    src=""
                    alt=""
                    className="card-img-top img-main img-fluid imgProduct"
                  />
                  <div class="card-title text-center mt-3">Product 1</div>
                    <div class="card-text text-center">
                        <div className="d-flex text-start">
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Name</div>
                          <div className="fw-normal">Name</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Price</div>
                          <div className="fw-normal">50 $</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Category</div>
                          <div className="fw-normal">Cat</div>
                        </div>
                      </div>
                    </div>
            </div>
        </div>
        <br/><br/>
    </swiper-slide>
    <swiper-slide>
        <div class="card">
            <div class="card-body">
                <img 
                    src=""
                    alt=""
                    className="card-img-top img-main img-fluid imgProduct"
                  />
                  <div class="card-title text-center mt-3">Product 1</div>
                    <div class="card-text text-center">
                        <div className="d-flex text-start">
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Name</div>
                          <div className="fw-normal">Name</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Price</div>
                          <div className="fw-normal">50 $</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Category</div>
                          <div className="fw-normal">Cat</div>
                        </div>
                      </div>
                    </div>
            </div>
        </div>
        <br/><br/>
    </swiper-slide>
    <swiper-slide>
        <div class="card">
            <div class="card-body">
                <img 
                    src=""
                    alt=""
                    className="card-img-top img-main img-fluid imgProduct"
                  />
                  <div class="card-title text-center mt-3">Product 1</div>
                    <div class="card-text text-center">
                        <div className="d-flex text-start">
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Name</div>
                          <div className="fw-normal">Name</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Price</div>
                          <div className="fw-normal">50 $</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Category</div>
                          <div className="fw-normal">Cat</div>
                        </div>
                      </div>
                    </div>
            </div>
        </div>
        <br/><br/>
    </swiper-slide>
    <swiper-slide>
        <div class="card">
            <div class="card-body">
                <img 
                    src=""
                    alt=""
                    className="card-img-top img-main img-fluid imgProduct"
                  />
                  <div class="card-title text-center mt-3">Product 1</div>
                    <div class="card-text text-center">
                        <div className="d-flex text-start">
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Name</div>
                          <div className="fw-normal">Name</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Price</div>
                          <div className="fw-normal">50 $</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Category</div>
                          <div className="fw-normal">Cat</div>
                        </div>
                      </div>
                    </div>
            </div>
        </div>
        <br/><br/>
    </swiper-slide>
    <swiper-slide>
        <div class="card">
            <div class="card-body">
                <img 
                    src=""
                    alt=""
                    className="card-img-top img-main img-fluid imgProduct"
                  />
                  <div class="card-title text-center mt-3">Product 1</div>
                    <div class="card-text text-center">
                        <div className="d-flex text-start">
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Name</div>
                          <div className="fw-normal">Name</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Price</div>
                          <div className="fw-normal">50 $</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Category</div>
                          <div className="fw-normal">Cat</div>
                        </div>
                      </div>
                    </div>
            </div>
        </div>
        <br/><br/>
    </swiper-slide> -->


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
        
    <!-- </div> -->
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
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
  // Import Swiper styles
  import 'swiper/css';
  import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
DataTable.use(DataTablesCore);

     import Header from './Header.vue';
    //  import Breadcrump from './breadcrumb.vue';
     export default {
        name:"Product",
        mounted() {
            this.getCategories()
            this.getData()

},

        data:function(){
return {

data:[],
dataCategory:[],
productFormData:new FormData(),
categories:[],
products:[],
product_search:{
    name:"",
    default_code:"",
    product_type:"",
    invoice_policy:"",
    sale_price:"",
    cost:"",
    category:"",
    _id:"",
},

product:{
    name:"",
    default_code:"",
    product_type:"",
    invoice_policy:"",
    sale_price:"",
    cost:"",
    category:"",
    _id:"",
},
    API_URL:"http://localhost:4000/API",
    // category:{
    //     name:"",
    //     description:"",
    //     _id:""
    // },
    // categorySearch:{
    //     name:"",
    //     description:""
    // }
}
        },
        methods:{
            handleChange(e){
            const value=e.target.name=="photo"?e.target.files[0]:e.target.value;
            this.productFormData.set(e.target.name,value);
        },
        deletData(_id){
          const {token}=JSON.parse(localStorage.getItem("user_info"));
            
            fetch(`${this.API_URL}/product/deleteProduct/${_id}`,{
                    method:"POST",
                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json",
                        "authorization":`Bearer ${token}`
                    },
                    // body:JSON.stringify(this.product_search)
                }
                ).then(res=>res.json()).then(res=>
                {
                  if(res.message){
            this.$toast.success(res.message);
            
            this.clearData();
            this.getData();
            
        }else if(res.error){
                        this.$toast.warning(res.error);                        
        }   
                }).catch(error=>{console.log(error)});


        },
loadData(data){
  this.product.name=data.name;
  this.product._id=data._id;
  this.product.category=data.category._id;
  this.product.cost=data.cost;
  this.product.sale_price=data.sale_price;
  this.product.product_type=data.product_type;
  this.product.invoice_policy=data.invoice_policy;
  this.product.default_code=data.default_code;
  this.productFormData.set("name",data.name);
  this.productFormData.set("_id",data._id);
  this.productFormData.set("category",data.category._id);
  this.productFormData.set("cost",data.cost);
  this.productFormData.set("sale_price",data.sale_price);
  this.productFormData.set("product_type",data.product_type);
  this.productFormData.set("invoice_policy",data.invoice_policy);
  this.productFormData.set("default_code",data.default_code);
},
        clearData(){
                this.product.name="";
                this.product._id="";
                this.product.category="";                
                this.product.cost="";                
                this.product.sale_price="";                
                this.product.product_type="";                
                this.product.invoice_policy="";                
                this.product.default_code="";
                this.productFormData.set("name","");
                this.productFormData.set("_id","");
                this.productFormData.set("category","");
                this.productFormData.set("cost","");
                this.productFormData.set("sale_price","");
                this.productFormData.set("product_type","");
                this.productFormData.set("invoice_policy","");
                this.productFormData.set("default_code","");                                
            },
            getData(){
            const {token}=JSON.parse(localStorage.getItem("user_info"));
            
            fetch(`${this.API_URL}/product/getData`,{
                    method:"POST",
                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json",
                        "authorization":`Bearer ${token}`
                    },
                    body:JSON.stringify(this.product_search)
                }
                ).then(res=>res.json()).then(res=>
                {
                    if(res.data){ 
                      this.products=res.data;
                      this.categories=res.categories
                    }
                }).catch(error=>{console.log(error)});


            },
        getCategories(){
            const {token}=JSON.parse(localStorage.getItem("user_info"));
            
            fetch(`${this.API_URL}/category/getData`,{
                    method:"POST",
                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json",
                        "authorization":`Bearer ${token}`
                    },
                    body:JSON.stringify({name:"",description:""})
                }
                ).then(res=>res.json()).then(res=>
                {
                    if(res.data){
                        this.dataCategory=res.data
                    }
                }).catch(error=>{console.log(error)});

        },
        submitData(){
            const {token}=JSON.parse(localStorage.getItem("user_info"));
            if(this.product._id=="")
            this.productFormData.set("_id","");
            if(this.product.name!=""){
                        fetch(`${this.API_URL}/product/submitProduct`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            // "Content-Type":"application/json",
            "authorization":`Bearer ${token}`
        },
        body:this.productFormData
    }
    ).then(res=>res.json()).then(res=>
    {
        if(res.message){
            this.$toast.success(res.message);
            
            this.clearData();
            this.getData();
            
        }else if(res.error){
                        this.$toast.warning(res.error);                        
        }   
    }).catch(error=>{console.log(error)});
            
}
else             this.$toast.warning("Please all the fields are required !!")
}

        },
        setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        onSwiper,
        onSlideChange,
        modules: [Navigation, Pagination, Scrollbar, A11y],
      };
    },
        components:{
            Header,
            Swiper,
            SwiperSlide,
        },
     }
    </script>
<style>
@import 'datatables.net-dt';
@import 'datatables.net-buttons-dt';
@import 'datatables.net-responsive-dt';
@import 'datatables.net-select-dt';
</style>
