# clientSideDB

Easy to use "client side database" turn any JSON Array into a searchable database with sytax similar to MongoDB

###1. Create a new database:

```javascript
Test = new ClidentDatabase('test')
```

###2. Add data to Database:
There are 2 ways to add data to your database the first way is to initialise it using an array of objects:
```javascript
Test.init(data)
```
Alternately, you can insert 'records' to the database as below:
```javascript
Test.insert(object)
```

####Parameters

data - JSON Array of objects
object - JSON object

###3. Search

```javascript
Test.find(query, options)
```

query - *Optional.* Selection filter
options - *Optional.* Options such as limit and ordering
