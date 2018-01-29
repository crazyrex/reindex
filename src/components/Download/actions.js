import { DOWNLOAD_FILE } from './constants';

export function downloadFile(data) {
	console.log('data', data)
	return {
		type: DOWNLOAD_FILE,
		data,
	};
}

