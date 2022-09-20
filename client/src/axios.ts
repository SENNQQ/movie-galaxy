import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

// instance.interceptors.request.use((config) => {
//
//     config.headers!.Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTliYzVlN2YwMmQ2MjU2YzRlMTcyYjBjZTMxMGNjYSIsInN1YiI6IjYzMTRjYjMxMTUxMWFhMDA5MjRkYTkyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DD6fdBjLinqW5PmXhvFBnLO_r40Y_41nT_lUmafJSNc';
//     return config;
// });

export default instance;