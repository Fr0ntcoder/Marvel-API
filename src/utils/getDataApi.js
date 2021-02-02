import {API_KEY} from "../constans/api"
import axios from 'axios';

class GetDataMarvel {
    async getData(url) {
        try {
            const response = await axios.get(url, {
                params: {
                    apikey: API_KEY,
                    limit: 100
                }
            })
            return response.data.data.results;
        }catch(e) {
            console.log(e.message)
        }
    }
}

export const getDataMarvel = new GetDataMarvel()