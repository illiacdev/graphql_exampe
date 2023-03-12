import React, {Component} from 'react';
import EditableTable from "./common/EditableTable";
import CompoImpl from "./generic/CompoImpl";
import EditableTableImpl from "./editableTable/EditableTableImpl";


class Dev extends Component {
    render() {
        return (
            <div>
                <EditableTableImpl/>
                {/*<CompoImpl/>*/}
                {/*<CommentList/>*/}
            </div>
        );
    }
}

export default Dev;
