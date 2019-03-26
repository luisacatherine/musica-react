import createStore from "unistore";
import axios from "axios";

const initialState = {
    baseUrl: "http://localhost:5000",
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
    data_kategori: '',
    tanggal: '',
    data_status: ''
}

export const store = createStore(initialState)

export const actions = store => ({
    setField: (state, event) => {
        return {[event.target.name]: event.target.value};
    },

    postLogout: async state => {
        await store.setState({is_login: false});
    },

    addToCart: function (state, item, qty_item) {
        const token = localStorage.getItem("token");
        axios
            .post(initialState.baseUrl + "/transdetail", {
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
            })
            .catch(function(error){
                console.log(error)
            })
    },

    getKategori: function() {
        axios({method: 'get', url: initialState.baseUrl + '/category'})
        .then(function(response){
            store.setState({data_kategori: response.data.kategori})
        })
        .catch(function(error){
            console.log(error)
        })
    },

    getStatus: function(state, id) {
        axios({method: 'get', url: initialState.baseUrl + '/status',
            params: {'id': id}})
        .then(function(response){
            store.setState({data_status: response.data.status_transaksi})
        })
        .catch(function(error){
            console.log(error)
        })
    },

    getProvinsi: function() {
        axios({ method: 'get', url: initialState.baseUrl + '/provinsi'})
        .then(function(response){
            store.setState({data_provinsi: response.data.provinsi})
        })
        .catch(function(error){
            console.log(error)
        })
    },

    getKota: function(state, provinsi) {
        axios({ method: 'get', url: initialState.baseUrl + '/kota', params: {'provinsi': provinsi}})
        .then(function(response){
            store.setState({data_kota: response.data.kota})
        })
        .catch(function(error){
            console.log(error)
        })
    },

    checkOut: function(state, transID, payment, alamat, kota) {
        const token = localStorage.getItem("token");
        axios({ 
            method: 'put', 
            url: initialState.baseUrl + '/transaction' + '/' + transID, 
            headers: {'Authorization': 'Bearer ' + token}, 
            data: {'payment_method': payment, 'alamat': alamat, 'kota': kota}})
        .then(function(response){
        })
        .catch(function(error){
            console.log(error)
        })
    },

    formatDate: (state, date) => {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        const hasil = [year, month, day].join('-')
        store.setState({tanggal: hasil})
    }
})