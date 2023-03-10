export interface Item {

    // 필수
    index: number
    id: string | number
    // key?: number | string;

    //사용자 정의
    name: string;

    extra: string

}

export const columns_user = [{
    title: '성명',
    dataIndex: 'name',
    // render: (item: any) => item,
    editable: true,
},{
    title: "extra",
    dataIndex: 'extra',
    editable: true
}
];
