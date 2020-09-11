<template>
<!--eslint-disable-->
    <section>
        <h1>Dashboard</h1>
        <h1>Hello ,{{user.username}}!! 👋</h1> 
        <button @click="logout()" type="submit" class="btn btn-primary">Logout</button>
        <br><br>
        <button @click="showForm = !showForm" class="btn btn-info">Create Note</button>
        <form v-if="showForm" @submit.prevent= "addnote()">
            <div class="form-group col-md-6">
                <label for="title">Title</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="title" 
                    aria-describedby="title-help" 
                    placeholder="Enter Your Title" 
                    v-model="newNote.title" 
                    required
                >
                <small id="title-help" class="form-text text-muted">Enter a title for your Note</small>
            </div>
             <div class="form-group col-md-6">
                <label for="Description">Description</label>
                <textarea 
                    class="form-control" 
                    id="Desciption" 
                    rows="3" 
                    placeholder="Enter Your Note" 
                    v-model="newNote.note" 
                    required
                ></textarea>
            </div>
            <div class="col-md-6 form-group">
                <button class="form-group btn btn-success">Add Note</button>
            </div>
        </form>
        
    </section>
</template>

<script>
/* eslint-disable */
const API_URL = 'http://localhost:5000/';
export default {
    data: ()=>({
        user: '',
        showForm : false,
        newNote : {
            title : '',
            note: '',
        }
    }),
    mounted() {
        fetch(API_URL ,{
            headers: {
                Authorization : 'Bearer '+ localStorage.token,
            }
        }).then(res=> res.json())
        .then((result)=>{
            if(result.user){
                //console.log(result.user);
                this.user = result.user;
            }else{
                this.logout;
            }
        })
    },
    methods: {
        logout(){
            localStorage.removeItem('token');
            this.$router.push('/login');
        },
        addnote(){
            fetch(`${API_URL}api/v1/notes`,{
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization : 'Bearer '+ localStorage.token,

                },
                body : JSON.stringify(this.newNote),
            }).then(res=>res.json())
            .then((note)=>{
                console.log(note);
            })
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
