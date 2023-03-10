import React, {Component} from 'react';
import {Button, Form, Input, InputNumber, Table, Typography} from "antd";
import {observer} from "mobx-react";
import {Store} from "./Store";
import {columns_user, Item} from "./Item";


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
}
/*
interface EditableCellPropsSub<T> extends  EditableCellProps{
    record2 : T
}*/
const EditableCell: React.FC<EditableCellProps> = ({
                                                       editing,
                                                       dataIndex,
                                                       title,
                                                       inputType,
                                                       record,
                                                       index,
                                                       children,
                                                       ...restProps
                                                   }) => {
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


//수정 handler


class EditableTable extends Component {
    store = new Store();

    state = {editingKey: undefined}

    form: any;


    columns_base = [

        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
                const editable = this.isEditing(record);
                let that = this;

                function edit(record: Item) {
                    console.log("onClick!");
                    that.setState({editingKey: record.id})
                    that.form.setFieldsValue({...record});
                }

                function cancel() {
                    that.setState({editingKey: undefined})
                }


                return editable ? (
                    <span>
                        <Typography.Link onClick={() => {
                            // let fieldsValue: { qty: number } = that.form.getFieldsValue('qty');
                            let fieldsValue: any = that.form.getFieldsValue();
                            this.store.update(record, fieldsValue);
                            cancel();

                            // record.qty = fieldsValue;

                        }} style={{marginRight: 8}}>
              Save
            </Typography.Link>
                        <Button onClick={cancel}>취소</Button>
                        {/*<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>*/}
          </span>
                ) : (
                    /*<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>*/

                    <Button disabled={this.state.editingKey !== undefined} onClick={() => {
                        edit(record);
                    }}>
                        Edit
                    </Button>

                );
            }
        }, {
            render: (_: any, record: Item) => <Button
                onClick={async () => {
                    this.store.delete_item(record)


                }}>삭제</Button>
        }

    ];

    columns = [...columns_user, ...this.columns_base];

    isEditing = (record: Item) => {
        console.log("TAG isEditing", "??");
        return record.id === this.state.editingKey;
    };

    mergedColumns = this.columns.map((col) => {
        let {isEditing} = this;
        // console.log("TAG1", JSON.stringify(col));
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'qty' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                // editing: true,
            }),
        };
    });


    componentDidMount() {
        this.store.load();
    }

    render() {
        return (
            <div>
                Hello!
                <Form ref={ref => this.form = ref}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        columns={this.mergedColumns} dataSource={this.store.dataSource}/>
                </Form>
            </div>
        );
    }


    private load = () => {
        this.store.load();
    }
}

// observe()
// observer()
export default observer(EditableTable);
