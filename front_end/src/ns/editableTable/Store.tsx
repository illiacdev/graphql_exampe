import {makeAutoObservable} from "mobx";
import Optional from "optional-js";
import _ from "lodash";
import {Util} from "../common/Util";
import {List} from "immutable";
import {RepositoryGQL} from "./RepositoryGQL";
import {Item} from "./Item";

export class Store {

    dummyDataSource: Item[] = [
        {index: 0, name: "illiac", extra: "extra1", id: 0},
        {index: 1, name: "illiac2", extra: "extra41", id: 1},
        {index: 2, name: "illiac3", extra: "extra15", id: 2}
    ];

    repository = new RepositoryGQL();

    dataSource: Item[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    load() {
        new Promise<Item[]>((resolve, reject) => {
            resolve(this.dummyDataSource);
            // resolve(this.dataSource);
        }).then(value => {
            this.dataSource = value.map((value1, index) => ({...value1,index}));
        });
    }

    async update(item: Item, payload: any) {
        let {index} = item;
        Optional.ofNullable(this.dataSource[index]).ifPresent(item => {
            let item1 = _.cloneDeep(item);
            Object.entries(payload).forEach((value1, index1, array) => {
                let [key, value] = value1;
                Util.updateProp2(item1, key, value);
                console.log(value1, index1);
            });

            let list = List(this.dataSource);
            let list2 = list.set(index, item1);
            this.dummyDataSource = list2.toArray();


            this.load();
            this.repository.update();
        });
    }

    async delete_item(item: Item) {
        let {index} = item;
        Optional.ofNullable(this.dataSource[index]).ifPresent(value => {

            let list = List(this.dataSource);
            let list1 = list.delete(index);
            let items1 = list1.toArray();


            this.dummyDataSource  = items1;
            let s = JSON.stringify(this.dataSource);
            console.log(s)

            this.load();
            this.repository.delete()
        });
    }
}

