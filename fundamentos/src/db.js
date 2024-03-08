import fs from "node:fs/promises";

const path = new URL("../db.json", import.meta.url);

export class DataBase {
  #db = {};

  constructor() {
    fs.readFile(path, "utf-8")
      .then((d) => {
        this.#db = JSON.parse(d);
      })
      .catch(() => {
        this.#persit();
      });
  }

  #persit() {
    fs.writeFile(path, JSON.stringify(this.#db));
  }

  select(table, search) {
    let data = this.#db[table] ?? [];

    if (search){
        data = data.filter(r => {
            return Object.entries(search).some(([k, v]) => {
                return r[k] == v
            })
        })
    }
    
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#db[table])) {
      this.#db[table].push(data);
    } else {
      this.#db[table] = [data];
    }

    this.#persit();

    return data;
  }

  delete(table, id) {
    const r = this.#db[table].findIndex((i) => i.id == id);

    if (r > -1) {
      this.#db[table].splice(r, 1);
      this.#persit();
    }
  }

  update(table, id, data) {
    const r = this.#db[table].findIndex((i) => i.id == id);

    if (r > -1) {
      this.#db[table][r] = {id, ...data}
      this.#persit();
    }
  }

}
