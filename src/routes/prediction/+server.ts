import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const latitude = url.searchParams.get('latitude');
	const longitude = url.searchParams.get('longitude');

	if (!latitude || !longitude) {
		return json({ error: 'Latitude et longitude requises' }, { status: 400 });
	}

	const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m`;

	try {
		const response = await fetch(apiURL);

		if (!response.ok) {
			return json(
				{ error: 'Impossible de récupérer les données météo' },
				{ status: response.status }
			);
		}

		const data = await response.json();

		return json(data);
	} catch (error) {
		return json({ error: 'Erreur serveur' }, { status: 500 });
	}
};
