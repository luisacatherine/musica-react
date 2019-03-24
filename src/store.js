import createStore from "unistore";
import axios from "axios";

const initialState = {
    api_key: "",
    email: "",
    password: "",
    avatar: "",
    username: "",
    is_login: false,
    kategori: "",
    urutan: "",
    allItems: [],
    data_provinsi: '',
    data_kota: '',
    data_kategori: ''
}

export const store = createStore(initialState)

export const actions = store => ({
    setField: (state, event) => {
        return {[event.target.name]: event.target.value};
    },

    postLogout: async state => {
        await store.setState({is_login: false});
    },

    onKategoriChanged: function (state, e) {
        console.log(e.target.value)
        store.setState({
            kategori: e.target.value
        });
        console.log(state.kategori)
    },

    onUrutanChanged: function (state, e) {
        console.log(e.target.value)
        store.setState({
            urutan: e.target.value
        });
        console.log(state.urutan)
    },

    hitungOngkir: function (state, o, d, w) {
        axios
            .get("http://localhost:5000/ongkir", {
                origin: 'Kabupaten Bandung',
                destination: 'Kota Bandung',
                weight: 1000
            })
            .then(function(response){
                console.log(response.data)
            })
            .catch(function(error){
                console.log(error)
            })
    },

    addToCart: function (state, item, qty_item) {
        const token = localStorage.getItem("token");
        axios
            .post("http://localhost:5000/transdetail", {
                product_id: item,
                qty: qty_item
            }, {
                headers : {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(function(response){
                if (response.data.status === 'gagal'){
                    alert(response.data.message)
                }
                console.log(response.data)
            })
            .catch(function(error){
                console.log(error)
            })
    },

    getKategori: function() {
        axios({method: 'get', url: 'http://localhost:5000/category'})
        .then(function(response){
            store.setState({data_kategori: response.data.kategori})
            console.log(response.data.kategori)
        })
        .catch(function(error){
            console.log(error)
        })
    },

    getProvinsi: function() {
        axios({ method: 'get', url: 'http://localhost:5000/provinsi'})
        .then(function(response){
            store.setState({data_provinsi: response.data.provinsi})
            console.log(response.data.provinsi)
        })
        .catch(function(error){
            console.log(error)
        })
    },

    getKota: function(state, provinsi) {
        axios({ method: 'get', url: 'http://localhost:5000/kota', params: {'provinsi': provinsi}})
        .then(function(response){
            store.setState({data_kota: response.data.kota})
            console.log(response.data.kota)
        })
        .catch(function(error){
            console.log(error)
        })
    },

    checkOut: function(state, transID, payment, alamat, kota) {
        const token = localStorage.getItem("token");
        axios({ 
            method: 'put', 
            url: 'http://localhost:5000/transaction' + '/' + transID, 
            headers: {'Authorization': 'Bearer ' + token}, 
            data: {'payment_method': payment, 'alamat': alamat, 'kota': kota}})
        .then(function(response){
            console.log(response.data)
        })
        .catch(function(error){
            console.log(error)
        })
    }

})