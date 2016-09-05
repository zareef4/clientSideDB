function ClientDatabase(name) {
    this.name = name;
    this.init = function (data) {
        console.log("Initialising database");
        localStorage.setItem(this.name, JSON.stringify(data));
    };

    this.find = function (query) {
        var inventoryArray = JSON.parse(localStorage.getItem(this.name));
        var results = [];
        if (inventoryArray) {
            for (var i = 0; i < inventoryArray.length; i += 1) {
                var pushToRes = true;
                for (var queryParam in query) {
                    if (query.hasOwnProperty(queryParam)) {
                        switch (typeof(query[queryParam])) {
                            case "string":
                                if (query[queryParam] !== inventoryArray[i][queryParam]) {
                                    pushToRes = false;
                                }
                                break;
                            case "number":
                                if (query[queryParam] !== parseInt(inventoryArray[i][queryParam], 10)) {
                                    pushToRes = false;
                                }
                                break;
                            case "object":
                                if (query[queryParam].$min){
                                    pushToRes = parseInt(inventoryArray[i][queryParam], 10) >= query[queryParam].$min
                                }

                                if (query[queryParam].$max){
                                    pushToRes = parseInt(inventoryArray[i][queryParam], 10) <= query[queryParam].$max
                                }
                                break;
                            default:
                                console.log("Erroneous Query");
                        }
                        if (!pushToRes) {
                            break;
                        }
                    }
                }

                if (pushToRes) {
                    results.push(inventoryArray[i]);
                }
            }
            return results;
        } else {
            console.log("Database not initialised, trying now");
        }
    }
}

