const { Breed, conn } = require("../../src/db.js");
const { expect } = require("chai");

const dog = {
  name: "Pug",
  min__height: 4,
  max__height: 10,
  min__weight: 10,
  max__weight: 30,
  life__span: "5-8 years",
};

describe("Model Testing", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Breed Model", () => {
    beforeEach(() => Breed.sync({ force: true }));
    describe("Validations", () => {
      describe("Breed Instance:", () => {
        it("should throw an error if breed is null", (done) => {
          Breed.create({})
            .then(() => done(new Error("Breed can't be null")))
            .catch(() => done());
        });
      });
      describe("name:", () => {
        it("should throw an error if name is null", (done) => {
          Breed.create({ name: null })
            .then(() => done(new Error("It requiered a valid name")))
            .catch(() => done());
        });
        it("should work when its a valid name", () => {
          Breed.create(dog.name);
        });
      });
      describe("min height:", () => {
        it("should throw an error if min height is null", (done) => {
          Breed.create({ min__height: null })
            .then(() => done(new Error("It requiered a valid min height")))
            .catch(() => done());
        });
        it("should work when its a valid min height", () => {
          Breed.create(dog.min__height);
        });
      });
      describe("max height:", () => {
        it("should throw an error if max height is null", (done) => {
          Breed.create({ max__height: null })
            .then(() => done(new Error("It requiered a valid max height")))
            .catch(() => done());
        });
        it("should work when its a valid max height", () => {
          Breed.create(dog.max__height);
        });
      });
      describe("min weight:", () => {
        it("should throw an error if min weight is null", (done) => {
          Breed.create({ min__weight: null })
            .then(() => done(new Error("It requiered a valid min weight")))
            .catch(() => done());
        });
        it("should work when its a valid min weight", () => {
          Breed.create(dog.min__weight);
        });
      });
      describe("max weight:", () => {
        it("should throw an error if max weight is null", (done) => {
          Breed.create({ max__weight: null })
            .then(() => done(new Error("It requiered a valid max weight")))
            .catch(() => done());
        });
        it("should work when its a valid max weight", () => {
          Breed.create(dog.max__weight);
        });
      });
    });
  });
});
