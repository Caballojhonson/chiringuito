const data = (() => {
	const API_KEY = 'cb979a42-3bd7-11ec-b95c-0242ac110002';
	const stockBinId = '0d75777de94a'
  	const orderBinId = 'a523dc4ff793'
	const supplierBinId = 'fc8ab6cfa458'

	const createBin = async function (object) {
		const response = await fetch('https://json.extendsclass.com/bin', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Api-key': API_KEY,
				'Security-key': 'VeryUnsecureKey',
				Private: true,
			},
			body: JSON.stringify(object),
		})
		return response.json();
	}

  const overwriteBin = async function (binId, object) {
    const request = await fetch(`https://json.extendsclass.com/bin/${binId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Security-key': 'VeryUnsecureKey',
        Private: true,
      },
      body: JSON.stringify(object)
    })
    return request.json();
  }

	const deleteBin = async function (binId) {
		const request = await fetch(`https://json.extendsclass.com/bin/${binId}`, {
			method: 'DELETE',
			headers: {
				'Security-key': 'VeryUnsecureKey',
			},
		});
		return request.json();
	};

	const getBins = async function () {
		const response = await fetch('https://json.extendsclass.com/bins', {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Api-key': API_KEY,
			},
		});
		return response.json();
	};

	const getData = async function (id) {
		const response = await fetch(`https://json.extendsclass.com/bin/${id}`, {
			method: 'GET',
			mode: 'cors',

			headers: {
				'Security-key': 'VeryUnsecureKey',
			},
		});
		return response.json();
	}

	const logAllBins = () => {
		getBins().then((bins) => bins.forEach((bin) => console.log(bin)));
	};

  const printAllBins = () => {
    getBins().then((bins) => bins.forEach((bin) => getData(bin)));
  }

	const deleteAllBins = () => {
		getBins().then((bins) => bins.forEach((bin) => deleteBin(bin)));
	};

	return {
		createBin,
		getBins,
		deleteBin,
		getData,
		printAllBins,
		deleteAllBins,
    	logAllBins,
    	overwriteBin,
		stockBinId,
		orderBinId,
		supplierBinId
	};
})();

export { data };
