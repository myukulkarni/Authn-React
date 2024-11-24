import axios from "axios";
import Cookies from "js-cookie";

// Configure Axios to include CSRF token in all requests
axios.defaults.headers.common["X-CSRFToken"] = Cookies.get("csrftoken");

export default axios;
