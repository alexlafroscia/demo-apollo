import test from "ava";
import DB from "./db";

test("it can query for a single property", t => {
  let alex = { id: 1, name: "Alex" };
  let emily = { id: 2, name: "Emily" };
  let db = new DB(alex, emily);

  t.is(db.where({ id: 1 }), alex);
});

test("it can query for an item based on multiple properties", t => {
  let alex = { id: 1, name: "Alex" };
  let emily = { id: 1, name: "Emily" };
  let emily2 = { id: 2, name: "Emily" };
  let db = new DB(alex, emily, emily2);

  t.is(db.where({ id: 1, name: "Emily" }), emily);
});

test("it is iterable", t => {
  let alex = { id: 1, name: "Alex" };
  let emily = { id: 1, name: "Emily" };
  let db = new DB(alex, emily);

  let items = [...db];
  t.deepEqual(items, [alex, emily]);
});
