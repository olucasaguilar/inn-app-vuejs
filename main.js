const app = Vue.createApp({
    data(){
        return{
            currentPage : 'home',            
            searchText: '',
            listInns: [],
            inn: {
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
                },
                rooms: []
            },

            availability: {}
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
        
        async getRoomAvailability(id, room_id, check_in, check_out, guests){
            let response = await fetch(`http://localhost:3000/api/v1/inns/${id}/rooms/${room_id}/availability?check_in=${check_in}&check_out=${check_out}&guests=${guests}`);
            let data = await response.json();
            this.availability = data;
        },

        showInnDetails(index){
            this.getInnDetails(index);
            this.getInnRooms(index);
            this.currentPage = 'details';
        },

        showInnList(){
            this.inn = this.defaultInn();
            this.searchText = '';
            this.currentPage = 'home';
            this.availability = {};
            this.checkIn = '';
            this.checkOut = '';
            this.guests = '';
        },

        verifyRoomAvailability(inn_id, room_id){     
            this.inn.current_room_id = room_id;       
            this.currentPage = 'availability';
        },

        checkAvailability(){
            this.getRoomAvailability(this.inn.id, this.inn.current_room_id, this.checkIn, this.checkOut, this.guests);
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
                },
                rooms: []
            }
        }
    }
})

app.mount('#app');