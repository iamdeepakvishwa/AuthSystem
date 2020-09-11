<template>
<!--eslint-disable-->
    <section>
        <h1>Dashboard</h1>
        <h1>Hello ,{{user.username}}!! 👋</h1> 
        <button @click="logout()" type="submit" class="btn btn-primary">Logout</button>
        <br><br>
        <button @click="showForm = !showForm" class="btn btn-info">Create Note</button>
        <form v-if="showForm" @submit.prevent= "addnote()">
            <div class="form-group">
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
             <div class="form-group">
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
                <button type="submit" class="form-group btn btn-success">Add Note</button>
        </form>
        <section class="row mt-3">
            <div 
                class="col-6"
                v-for="note in notes"
                :key="note._id">
                <div class="card border-info mb-3">
                <div class="card-header">{{note.title}}</div>
                <div class="card-body">
                    <p class="card-text" v-html="renderMarkdown(note.note)"></p>
                </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
/* eslint-disable */
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

const API_URL = 'http://localhost:5000/';
export default {
    data: ()=>({
        user: '',
        showForm : false,
        newNote : {
            title : '',
            note: '',
        },
        notes: [],
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
                this.getNote();
            }else{
                this.logout;
            }
        })
    },
    methods: {
        renderMarkdown(note){
            return md.render(note);
        },
        getNote(){
            fetch(`${API_URL}api/v1/notes`,{
                headers: {
                    Authorization : 'Bearer '+ localStorage.token,
                }
            }).then(res=>res.json())
            .then((notes)=>{
                this.notes = notes;
            })
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
                this.newNote = {
                    title: '',
                    note: '',
                }
                this.showForm = false; 
                this.getNote();
            })
        },
        logout(){
            localStorage.removeItem('token');
            this.$router.push('/login');
        },
    }
};
</script>

<style>
.card {
  height: 90%;
}
.card-text img {
  width: 100%;
}
</style>
