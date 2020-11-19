import { useState, useEffect } from 'react';

const useFetch = (url) => {
	const [response, setResponse] = useState(null);
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(null);

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await fetch(url);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.errors);
			}

			setResponse(data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setHasError(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!url) return;
		fetchData();
	}, [url]); // eslint-disable-line react-hooks/exhaustive-deps

	return { response, loading, hasError };
};

export default useFetch;
