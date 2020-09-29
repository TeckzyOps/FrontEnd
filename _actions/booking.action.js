import Service from "../utils/ApiService";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
export const bookingActions = {
	bookDate,
	getbookDate,
};
function bookDate(payload, apiFor) {
	let apiEndpoint = apiFor + "Booking";
	return Service.post(apiEndpoint, payload);
}

function getbookDate(payload, apiFor) {
	let apiEndpoint = apiFor + "Booking";
	return Service.get(apiEndpoint, payload);
}
