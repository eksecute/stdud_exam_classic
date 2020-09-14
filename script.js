const url = `${_spPageContextInfo.webAbsoluteUrl}/`;

class Requests {

	getItems(query) {
		return $.ajax({
		url: query,
		method: "GET",
		contentType: "application/json;odata=verbose",
		headers: {
			Accept: "application/json;odata=verbose",
			"Access-Control-Allow-Origin":"*"
		},
		});
	}
	getFields(query) {
		//получение всех полей списка
	
		return $.ajax({
		url: query,
		method: "GET",
		contentType: "application/json;odata=verbose",
		headers: {
			Accept: "application/json;odata=verbose",
		},
		});
	}
    
	async createData(webUrl, list, choices) {
	const query = `${webUrl}_api/web/lists/getbytitle(${list})/items`;
	const requestDigest = await this.getRequestDigest(webUrl); // получаем X-RequestDigest
	console.log(' > requestDigest: ' + requestDigest.d.GetContextWebInformation.FormDigestValue);
	const listItemType = await this.getListItemType(
		webUrl, "Orders"
	//   "Departments Sites"
	); // получаем ListItemType текущего списка
	
	console.log(' > listItemType: ' + listItemType);
	const changes = {
		Title: "NewOrderFromCode",
		Additional_x0020_info0: "Additional_x0020_info0----",
		Car_x0020_damaged: false,
		Drive_x0020_rate0: choices[1]
	// весь перечень чейсов можно получить, если вытянуть филды списка и посмотреть в свойстве Choices этого филда
	//   CarId: 1, 
	}; // формируем объект с изменениями
	console.log(changes)
	const objType = {
		__metadata: {
		type: listItemType.d.ListItemEntityTypeFullName,
		},
	};
	console.log(objType);
	const objData = JSON.stringify(Object.assign(objType, changes));

	return $.ajax({
		url: query,
		type: "POST",
		data: objData,
		headers: {
		// Accept: "application/json;odata=verbose",
		// "Content-Type": "application/json;odata=verbose",
		// "X-RequestDigest":
		//   requestDigest.d.GetContextWebInformation.FormDigestValue,
		// "IF-MATCH": "*",
		// "X-HTTP-Method": "MERGE",
		Accept: "application/json;odata=verbose",
		"Content-Type": "application/json;odata=verbose",
		"X-RequestDigest":
			requestDigest.d.GetContextWebInformation.FormDigestValue,
		"X-HTTP-Method": "POST",
		},
	});
	}  
	//same function but overwritten
	async uploadData(listName, choices) {
		const url = _spPageContextInfo.webAbsoluteUrl + '/';
		var itemType = this.getListItemType(url, listName);
		const requestDigest = await this.getRequestDigest(url); // получаем X-RequestDigest
		var item = {
			"__metadata": { "type": itemType },
			Title: "NewOrderFromCode",
			// Drive_x0020_rate0: choices[1]
			// "Title": newItemTitle
		};
	
		//STUCKS OVER HERE
		try {
			$.ajax({
				url: url + `_api/web/lists/getbytitle('${listName}')/items`,
				type: "POST",
				contentType: "application/json;odata=verbose",
				data: JSON.stringify(item),
				headers: {
					"Accept": "application/json;odata=verbose",
					"Access-Control-Allow-Origin":"*",
					// "X-RequestDigest": $("#__REQUESTDIGEST").val(),
					"X-RequestDigest": 
						requestDigest.d.GetContextWebInformation.FormDigestValue,
					"X-HTTP-Method": "POST",
				},
			});
			
		} catch (err) {
			console.log(err);
		}
	}

	// Get List Item Type metadata
	GetItemType(name) {
		return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
	}
	getRequestDigest(url) {
		return $.ajax({
			url: url + "_api/contextinfo",
			method: "POST",
			headers: {
				Accept: "application/json; odata=verbose",
			},
		});
	}	
	getListItemType(url, listTitle) {
		const query =
			url +
			"_api/Web/Lists/getbytitle('" + listTitle + "')/ListItemEntityTypeFullName";
		return this.getItems(query);
	}
}
const request = new Requests();


/*		start		*/
function start() {
	// getFields();
	addOrder();
}

/*    getting data    */
async function getAll(list, getQuery) {
	try {
		const query = `${url}_api/web/lists/getbytitle('${list}')/${getQuery}`;

		const res = await request.getItems(query);
		console.log(list);
		console.log(res);

		return res.d.results;
	  } catch (err) {
		console.error(err);
	  }
}
async function getFields(list, getFieldQuery) {
	try {
		// const query = `${url}_api/web/lists/getbytitle('${list}')/fields?$filter=EntityPropertyName eq 'Drive_x0020_rate0' or EntityPropertyName eq 'Title'`;
		const query = `${url}_api/web/lists/getbytitle('Orders')/fields`;

		fields = await this.getFields(query);
		console.log('fields:')
		console.log(fields);
		// return fields;
	  } catch (err) {
		console.error(err);
	  }
}

/*    adding data   */
async function addOrder() {
	const query = `${url}_api/web/lists/getbytitle('Orders')/fields?$filter=EntityPropertyName eq 'Drive_x0020_rate0' or EntityPropertyName eq 'Car' &$select=Id, Choices`;

	const res = await request.getFields(query);
	const rateChoices = res.d.results[0].Choices.results;

	console.log(5);
	// console.log(reateChoices);
	// try {
	// 	console.log(url);
	// 	const createdata = await request.createData(url, 'Orders', reateChoices);
		
	// 	console.log(createdata);
	//   } catch (err) {
	// 	console.log(err);
	//   }
	request.uploadData('Orders', rateChoices)
}


start();