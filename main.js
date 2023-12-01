const app = Vue.createApp({
    data(){
        return{
            currentPage : 'home',            
            searchText: '',
            listInns: [],
            inn: this.defaultInn()
        }
    },

    computed:{        
        listResult(){
            if(this.searchText){                
                return this.listInns.filter(inn => {
                    return inn.name.toLowerCase().includes(this.searchText.toLowerCase());
                });                
            }else{                
                return this.listInns;
            }
        }
    },

    async mounted() {
        await this.getDataInns();
    },


    methods:{
        async getDataInns() {
            let response = await fetch('http://localhost:3000/api/v1/inns');
            let data = await response.json();

            data.forEach(item => {                
                var inn = new Object();

                inn.id = item.id;
                inn.name = item.name;
                inn.social_name = item.social_name;
                inn.cnpj = item.cnpj;
                inn.phone = item.phone;
                inn.email = item.email;
                inn.address = item.address;            
            
                this.listInns.push(inn);
            });
        },

        async getInnDetails(id){
            let response = await fetch(`http://localhost:3000/api/v1/inns/${id}`);
            let data = await response.json();
            this.inn = data;
        },

        async getInnRooms(id){
            let response = await fetch(`http://localhost:3000/api/v1/inns/${id}/rooms`);
            let data = await response.json();
            this.inn.rooms = data;
        },


        showInnDetails(index){
            this.getInnDetails(index);
            this.getInnRooms(index);
            this.currentPage = 'details';
        },

        showInnList(){
            this.inn = this.defaultInn();
            this.currentPage = 'home';
        },

        defaultInn(){
            inn = {
                id: '',
                name: '',
                phone: '',
                email: '',
                status: '',
                address: {
                    street: '',
                    neighborhood: '',
                    state: '',
                    city: '',
                    zip_code: ''
                },
                average_rating: '',
                additionals: {
                    description: '',
                    policies: '',
                    check_in: '',
                    check_out: '',
                    pets: ''
                }
            }
        }
    }
})

app.mount('#app');