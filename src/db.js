import axios from "axios"


const db = (() => {
    const salaries = {
        get: () => {
            axios.get('https://chiringuito-api.herokuapp.com/api/salaries')
            .then(res => res)
            .catch(err => console.error(err))
        }

    }

    return {
        salaries,
    }
})()

export {db}