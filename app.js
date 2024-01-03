//Note: the variable/search key personId cannot be used more than once in this file. Callback functions are now outdated, promises are used instead.

//import required libraries
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Person = require("./models/person");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create and Save a Record of the person Model
const personData = {
  name: "John Doe",
  age: 25,
  favoriteFoods: ["Pizza", "Burger"],
};

const person = new Person(personData);
person
  .save()
  .then((data) => {
    console.log("Record saved successfully:", data);
  })
  .catch((err) => {
    console.error("Error saving record:", err);
  });

// Create Many Records with model.create()
const arrayOfPeople = [
  { name: "Alice", age: 30, favoriteFoods: ["Sushi", "Pasta"] },
  { name: "Bob", age: 22, favoriteFoods: ["Tacos", "Ice Cream"] },
  { name: "Mary", age: 22, favoriteFoods: ["Tacos", "Ice Cream"] },
  { name: "Helen", age: 22, favoriteFoods: ["Tacos", "Ice Cream"] },
  { name: "Rice", age: 22, favoriteFoods: ["Tacos", "Ice Cream"] },
  { name: "Wale", age: 22, favoriteFoods: ["Tacos", "Ice Cream"] },
  { name: "Yusuf", age: 22, favoriteFoods: ["Tacos", "Ice Cream", "Burritos"] },
  { name: "Momoh", age: 22, favoriteFoods: ["Tacos", "Ice Cream", "Burritos"] },
  { name: "Saka", age: 22, favoriteFoods: ["Tacos", "Ice Cream", "Burritos"] },
  { name: "Raya", age: 22, favoriteFoods: ["Tacos", "Ice Cream", "Burritos"] },
];

Person.create(arrayOfPeople)
  .then((data) => {
    console.log("User created successfully:", data);
  })
  .catch((err) => {
    console.error("Error creating user:", err);
  });

// Use model.find() to Search Your Database
Person.find({ name: "John Doe" })
  .then((people) => {
    console.log("People with name John Doe:", people);
  })
  .catch((err) => {
    console.error("Error creating user:", err);
  });

// Use model.findOne() to Return a Single Matching Document from Your Database
const food = "Pizza";

Person.findOne({ favoriteFoods: food })
  .then((person) => {
    console.log(`Person with favorite food ${food}:`, person);
  })
  .catch((err) => {
    console.error("Error creating user:", err);
  });

// Use model.findById() to Search Your Database By _id
const personIdToSearch = "65957d1f714d9f0c1e1335a2";
Person.findById(personIdToSearch)
  .then((person) => {
    console.log("Person found by _id:", person);
  })
  .catch((err) => {
    console.error("Error creating user:", err);
  });

// Perform Classic Updates by Running Find, Edit, then Save
const personIdToUpdate = "65957d1f714d9f0c1e13359d";

Person.findById(personIdToUpdate)
  .then((person) => {
    if (!person) {
      throw new Error("Person not found");
    }

    person.favoriteFoods.push("Hamburger");
    return person.save();
  })
  .then((updatedPerson) => {
    console.log("Person updated:", updatedPerson);
  })
  .catch((err) => {
    console.error("Error updating person:", err);
  });

// Perform New Updates on a Document Using model.findOneAndUpdate()
const personName = "Alice";

Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true })
  .then((updatedPerson) => {
    console.log("Person updated using findOneAndUpdate:", updatedPerson);
  })
  .catch((err) => {
    console.error("Error updating person:", err);
  });

// Note: findByIdAndRemove() and findOneAndRemove() are functions no longer supported. Hence: Delete One Document Using model.findByIdAndDelete.
const personId = "65957d1f714d9f0c1e1335a5";
Person.findByIdAndDelete(personId)
  .then((deletedPerson) => {
    if (!deletedPerson) {
      throw new Error("Person not found");
    }
    console.log("Person deleted:", deletedPerson);
  })
  .catch((err) => {
    console.error("Error deleting person:", err);
  });

const personNameToDeleteMany = "Mary";

Person.deleteMany({ name: personNameToDeleteMany })
  .then((result) => {
    console.log(`${result.deletedCount} records deleted`);
  })
  .catch((err) => {
    console.error("Error deleting records:", err);
  });

// Chain Search Query Helpers to Narrow Search Results
Person.find({ favoriteFoods: "Burritos" })
  .sort("name")
  .limit(2)
  .select("-age")
  .exec()
  .then((data) => {
    console.log("People who like burritos:", data);
  })
  .catch((err) => {
    console.error("Error finding people:", err);
  });
