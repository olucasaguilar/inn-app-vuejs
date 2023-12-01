const app = Vue.createApp({
    data(){
        return{
            listInns: []
        }
    },

    async mounted() {
        await this.getData();
    },


    methods:{
        async getData() {

            let response = await fetch('http://localhost:3000/api/v1/inns');
            let data = await response.json();

            data.forEach(item => {                
                var inn = new Object();

                inn.name = item.name;
                inn.social_name = item.social_name;
                inn.cnpj = item.cnpj;
                inn.phone = item.phone;
                inn.email = item.email;
                inn.address = item.address;            
            
                this.listInns.push(inn);
            });
        }
    }
})

app.mount('#app');