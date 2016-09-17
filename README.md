# clientSideDB

Easy to use "client side database" turn any JSON Array into a searchable database with sytax similar to MongoDB

##Guide

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

##Examples

Use the following code to create a new database, *Employees*, with some test data.

```javascript
Employees = new ClientDatabase('employees')
Employees.init([
  {
    firstName: "John",
    lastName: "Doe",
    age: 20
  },
  {
    firstName: "John",
    lastName: "Smith",
    age: 25
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    age: 20
  }
])
```

Now you can do a basic search for all employees with first name **John*:

```javascript
Employees.find({
  firstName: "John"
})
```

Or search for all employees aged 20:

```javascript
Employees.find({
  age: 20
})
```

Insert new data on the fly:

```javascript
Employees.insert({
  firstName: "Harry"
  lastName: "Potter"
  age: 23
})
```

A more complex search for employees 21 and over:

```javascript
Employees.find({
  age: {$min: 21}
})
```

Similarly a search for employees 24 and under:

```javascript
Employees.find({
  age: {$max: 24}
})
```

