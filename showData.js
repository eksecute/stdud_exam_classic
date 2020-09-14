async function getAll(list, getQuery) {
    const url = `${_spPageContextInfo.webAbsoluteUrl}/`;

	try {
        console.log(123)
		const query = `${url}_api/web/lists/getbytitle('${list}')/${getQuery}`;
        const res = await request.getItems(query);

		return res.d.results;
	  } catch (err) {
		console.error(err);
	  }
}

//show cars
async function showCars() {
    const query = 'items?$select=Title,class,transmission'
    
    const cars = await getAll('Cars', query);

    renderCars(cars);
}
function renderCars(cars) {
    const carsRoot = document.getElementById("carsRoot");
    console.log(3)
    let table = "<table class='cars'>";

    if (cars.length) {
    
        const keys = Object.keys(cars[0]);
    
        if (keys.length) {
            table += "<thead><tr>";
            for (let i = 1; i < keys.length; i++) {
                table += `<th>${keys[i]}</th>`;
            }
            table += "</tr></thead>";
        }
    
        table += "<tbody>";
    
        for (let i = 0; i < cars.length; i++) {
            table += `<tr>
                        <td>${cars[i].Title}</td>
                        <td>${cars[i].class}</td>
                        <td>${cars[i].transmission}</td>
                    </tr>`;
        }
    
        table += "</tbody>";
    }
    
    table += "</table>"
    console.log(carsRoot);
    carsRoot.innerHTML = table;
}

//show orders
async function showOrders() {
    const query = 'items?$select=Title,Additional_x0020_info0,Car_x0020_damaged,Drive_x0020_rate0,Tenant0Id';
    
    const orders = await getAll('Orders', query);
    // console.log(orders)
    renderOrders(orders)
}
function renderOrders(orders) {
    const ordersRoot = document.getElementById("ordersRoot");
    let table = "<table class='orders'>";

    if (orders.length) {
    
        const keys = Object.keys(orders[0]);
    
        if (keys.length) {
            table += "<thead><tr>";
            for (let i = 1; i < keys.length; i++) {
                table += `<th>${keys[i]}</th>`;
            }
            table += "</tr></thead>";
        }
    
        table += "<tbody>";
    
        for (let i = 0; i < orders.length; i++) {
            table += `<tr>
                        <td>${orders[i].Title}</td>
                        <td>${orders[i].Additional_x0020_info0}</td>
                        <td>${orders[i].Car_x0020_damaged}</td>
                        <td>${orders[i].Drive_x0020_rate0}</td>
                        <td>${orders[i].Tenant0Id || '-'}</td>
                    </tr>`;
        }
    
        table += "</tbody>";
    }
    
    table += "</table>"
    
    ordersRoot.innerHTML = table;
}

function render() {
    // console.log(1)
    showCars();
    showOrders();
}
render();
