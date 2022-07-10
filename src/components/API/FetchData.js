import axios from "axios";

const fetchData = (query, page) => {
    return axios.get(`https://pixabay.com/api/?q=${query}&page=${page}&key=27200028-8fc69fbb3d566c8420050baaa&image_type=photo&orientation=horizontal&per_page=12`);
}
export { fetchData };