import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync("littleLemonDB");

export function createTable() {
    return new Promise((resolve, reject) => {
        db.withTransactionSync(() => {
            try {
                db.execSync('create table if not exists menuitems (id integer primary key not null, name text, description text, price text, category text, image text);');
                resolve(true);
            } catch(err) {
                reject(err);
            }
        });
    });
}

export function fetchData(url: string) {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then((response) => {
            if(response.ok) {
                return response.json();
            }
        })
        .then(({menu: data}) => {
            db.runSync('delete from menuitems;');
            db.runSync(`insert into menuitems (name, description, price, category, image) values ${data.map((elem: any) => { return `("${elem.name}", "${elem.description}", "${elem.price}", "${elem.category}", "${elem.image}")`;}).join(", ")};`);
            resolve(true);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

export function getData(filter: string | null, filterCategories: string[] | null) {
    return new Promise((resolve, reject) => {
        try {
            let data = null;
            if(filter !== null) {
                data = db.getAllSync(`select * from menuitems where name like '%${filter}%'${(filterCategories !== null ? (` and (${filterCategories.map(elem => `category = '${elem}'`).join(" or ")});`) : (`;`))}`);
            } else {
                data = db.getAllAsync("select * from menuitems");
            }
            resolve(data);
        } catch(err) {
            reject(err);
        }
    });
}