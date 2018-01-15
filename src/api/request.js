import axios from 'axios';
import _ from 'lodash';

export default function createApi() {
    const token = sessionStorage.getItem('token');

    return {
        get(url, query) {

            axios({
                method: 'get',
                url: url,
                data: _.assign({
                    token: token,
                }, query),
            });
        },
    }

}