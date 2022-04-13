/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Breed, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  id: "123456",
  name: "Pug",
  min__height: 4,
  max__height: 10,
  min__weight: 10,
  max__weight: 30,
  life__span: "5-8 years",
};

describe("Routes Testing", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Breed.sync({ force: true }).then(() => Breed.create(dog)));
  describe("Breed route", () => {
    describe("GET /breeds:", () => {
      it("should get 200", () => agent.get("/breeds").expect(200));
      it("should be html", () =>
        agent
          .get("/breeds")
          .expect("Content-Type", "application/json; charset=utf-8"));
    });
    describe("GET /breeds/:id:", () => {
      it("should response 404 if id dosen't exists", () =>
        agent.get("/breeds/assad").expect(404));
      it("should response 200 if id exists", () =>
        agent.get("/breeds/123456").expect(200));
    });
    describe("POST /breeds", function () {
      it("response with 200", function () {
        return agent
          .post("/breeds/create")
          .send({
            id: "4567",
            name: "Puggy",
            min__height: 4,
            max__height: 10,
            min__weight: 10,
            max__weight: 30,
            life__span: "5-8 years",
          })
          .expect(200);
      });
      it("create a breed on DB", function () {
        return agent
          .post("/breeds/create")
          .send({
            id: "12879",
            name: "Pugggy",
            min__height: 4,
            max__height: 10,
            min__weight: 10,
            max__weight: 30,
            life__span: "5-8 years",
          })
          .then(() => {
            return Breed.findOne({
              where: {
                name: "Pugggy",
              },
            });
          })
          .then((breed) => {
            expect(breed).to.exist;
          });
      });
    });
  });
});
