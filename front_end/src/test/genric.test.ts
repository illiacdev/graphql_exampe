type T1={
    id: number;
}

type T2={
    name: string;
}

interface Item<T> {
    index?: number;
    item?:T
}
class A {

}

class Sub<T> extends A{
    item?: Item<T>;
}

it('should ', function () {
    let sub = new Sub<T1>();
    sub.item?.item?.id
});
