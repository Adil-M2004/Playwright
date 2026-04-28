import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 200 }, // Ramp up to 200 users over 10 seconds
        { duration: '30s', target: 200 }, // Stay at 200 users for 30 seconds
        { duration: '10s', target: 0 }   // Ramp down to 0 users over 10 seconds
    ],
};

// export const options = {
//     vus: 10,
//     duration: '10s'
// }
export default () => {
    http.get('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    sleep(1);
};