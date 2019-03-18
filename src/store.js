import createStore from "unistore";
import axios from "axios";

const initialState = {
    api_key: "",
    email: "",
    password: "",
    avatar: "",
    username: "",
    is_login: false
}

export const store = createStore(initialState)

export const actions = store => ({
    setField: (state, event) => {
        return {[event.target.name]: event.target.value};
    },

    postLogout: async state => {
        await store.setState({is_login: false});
    },

    postLogin: async state => {
        const data = {username: state.username, password: state.password};
        await axios
            .post("https://api-todofancy.herokuapp.com/api/auth", data)
            .then(function(response){
                console.log(response.data);
                if (response.data.hasOwnProperty("status")){
                    store.setState({
                        is_login: true,
                        username: response.data.user_data.username,
                        email: response.data.user_data.email,
                        avatar: response.data.user_data.avatar
                    })
                }
            })
            .catch(function(error){
                console.log(error);
            });
    }
})