import React, {Component} from 'react';
import EditableTable, {ID, Payload, TStore} from "../common/EditableTable";
import {makeAutoObservable} from "mobx";
import Optional from "optional-js";
import _ from "lodash";
import {Util} from "../common/Util";
import {List} from "immutable";

interface Item {

    // 필수
    id: string | number
    // key?: number | string;

    //사용자 정의
    name: string;

    extra: string

}



class RepositoryGQL {

    update() {

    }

    delete() {

    }
}

export class Store implements TStore {

    dummyDataSource: Item[] = [
        {name: "illiac", extra: "extra1", id: 0},
        {name: "illiac2", extra: "extra41", id: 1},
        {name: "illiac3", extra: "extra15", id: 2}
    ];

    repository = new RepositoryGQL();

    dataSource: Item[] = [];

    constructor() {
        makeAutoObservable(this);
    }


    update(payload: Payload): void {
        let index = this.dataSource.findIndex(value => {
            return value.id == payload.id;
        });

        Optional.ofNullable(this.dataSource[index]).ifPresent(item => {
            let item1 = _.cloneDeep(item);
            Object.entries(payload).forEach((value1, index1, array) => {
                let [key, value] = value1;
                // type a = typeof payload;
                // type b = keyof a;
                type Tvalue = typeof payload[keyof typeof payload];

                Util.updateProp2(item1, key, value as Tvalue);
                console.log(value1, index1);
            });

            let list = List(this.dataSource);
            let list2 = list.set(index, item1);
            this.dummyDataSource = list2.toArray();


            this.load();
            this.repository.update();
        });

    }

    delete(id: ID): void {
        let index = this.dataSource.findIndex(value => {
            return value.id == id;
        });

        Optional.ofNullable(this.dataSource[index]).ifPresent(value => {

            let list = List(this.dataSource);
            let list1 = list.delete(index);
            let items1 = list1.toArray();


            this.dummyDataSource = items1;
            let s = JSON.stringify(this.dataSource);
            console.log(s)

            this.load();
            this.repository.delete()
        });

    }

    load() {
        new Promise<Item[]>((resolve, reject) => {
            resolve(this.dummyDataSource);
            // resolve(this.dataSource);
        }).then(value => {
            this.dataSource = value.map((value1, index) => ({...value1, index}));
        });
    }
}

class EditableTableImpl extends Component {
    store = new Store()


    columns_user = [{
        title: '성명',
        dataIndex: 'name',
        // render: (item: any) => item,
        editable: true,
    }, {
        title: "extra",
        dataIndex: 'extra',
        editable: true
    }
    ];

    render() {
        return (
            <div>
                <EditableTable
                    store={this.store}
                    columns_user={this.columns_user}/>
            </div>
        );
    }
}

export default EditableTableImpl;