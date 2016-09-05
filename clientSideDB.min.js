function ClientDatabase(name) {
    this.name = name;
    this.init = function (data) {
        console.log("Initialising database");
        localStorage.setItem(this.name, JSON.stringify(data));
    };
    this.insert = function (document) {
        var collection = JSON.parse(localStorage.getItem(this.name));

        if (collection) {
            collection.push(document);
        } else {
            collection = [document];
        }

        localStorage.setItem(this.name, JSON.stringify(collection));
    };
    this.find = function (query, options) {
        var collection = JSON.parse(localStorage.getItem(this.name));
        var results = [];
        if (collection) {
            for (var i = 0; i < collection.length; i += 1) {
                var pushToRes = true;
                for (var queryParam in query) {
                    if (query.hasOwnProperty(queryParam)) {
                        switch (typeof(query[queryParam])) {
                            case "string":
                                if (query[queryParam] !== collection[i][queryParam]) {
                                    pushToRes = false;
                                }
                                break;
                            case "number":
                                if (query[queryParam] !== parseInt(collection[i][queryParam], 10)) {
                                    pushToRes = false;
                                }
                                break;
                            case "object":
                                if (query[queryParam].$min){
                                    pushToRes = parseInt(collection[i][queryParam], 10) >= query[queryParam].$min
                                }

                                if (query[queryParam].$max){
                                    pushToRes = parseInt(collection[i][queryParam], 10) <= query[queryParam].$max
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
                    results.push(collection[i]);
                }
            }

            if (options) {
                if (options.orderBy) {
                    var sortBy = function(field, direction){

                        var getValueFromKey = function(x) {return x[field]};

                        if (direction === -1) {
                            return function (a, b) {
                                return a = getValueFromKey(a), b = getValueFromKey(b), ((b > a) - (a > b));
                            }
                        } else {
                            return function (a, b) {
                                return a = getValueFromKey(a), b = getValueFromKey(b), ((a > b) - (b > a));
                            }
                        }

                    };

                    results.sort(sortBy(options.orderBy.field, options.orderBy.direction));
                }

                if (options.skip || options.limit) {
                    var skip = options.skip ? options.skip : 0;
                    var limit = options.limit ? options.limit : undefined;

                    results = results.slice(skip, (limit + skip))
                }
            }

            return results;

        } else {
            console.log("Database not initialised, trying now");
        }
    }
}
