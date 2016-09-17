# clientSideDB

Easy to use "client side database" turn any JSON Array into a searchable database with sytax similar to MongoDB

###1. Create a new database:

```javascript
Test = new ClidentDatabase('test')
```

###2. Add data to Database:

```javascript
Test.init(data)
```

####Parameters

data - JSON Array of objects

###3. Search

```javascript
Test.find(query, options)
```
