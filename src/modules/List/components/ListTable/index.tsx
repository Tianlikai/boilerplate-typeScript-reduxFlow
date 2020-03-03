import React from "react";
import { Table } from "antd";

const PREFIX = "ListTable";

interface Props {
  className?: string;
  loading: boolean;
}

const ListTable: React.FC<Props> = ({ loading }) => {
  return (
    <div className={PREFIX}>
      <Table
        className={`${PREFIX}-antTable`}
        columns={[]}
        dataSource={[]}
        loading={loading}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
};

export default ListTable;
