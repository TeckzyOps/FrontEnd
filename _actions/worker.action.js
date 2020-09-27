import Service from "../utils/ApiService";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
export const workerActions = {
	createWorker,
	submitMedia,
	getWorker,
	getMedia,
	bookDate,
	getbookDate,
};

function createWorker(payload) {
	let apiEndpoint = "";
	if (payload.Worker_id) {
		apiEndpoint = "editWorkerId";
	} else {
		apiEndpoint = "createWorkerId";
	}
	return Service.post(apiEndpoint, payload);
}

function getWorker(payload) {
	let apiEndpoint = "createWorkerId";
	return Service.get(apiEndpoint, payload);
}

function bookDate(payload) {
	let apiEndpoint = "WorkerBooking";
	return Service.post(apiEndpoint, payload);
}

function getbookDate(payload) {
	let apiEndpoint = "WorkerBooking";
	return Service.get(apiEndpoint, payload);
}

function submitMedia(payload) {
	let apiEndpoint = "uploadWorkerFile";
	return Service.post(apiEndpoint, payload);
}

function getMedia(payload) {
	let apiEndpoint = "getWorkerFile";
	return Service.get(apiEndpoint, payload);
}
