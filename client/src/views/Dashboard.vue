<template>
<!--eslint-disable-->
    <section>
        <h1>Dashboard</h1>
        <h1>Hello ,{{user.username}}!! 👋</h1> 
        <button @click="logout()" type="submit" class="btn btn-primary">Logout</button>
    </section>
</template>

<script>
/* eslint-disable */
const API_URL = 'http://localhost:5000/';
export default {
    data: ()=>({
        user: '',

    }),
    mounted() {
        fetch(API_URL ,{
            headers: {
                Authorization : 'Bearer '+ localStorage.token,
            }
        }).then(res=> res.json())
        .then((result)=>{
            console.log(result);
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
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
