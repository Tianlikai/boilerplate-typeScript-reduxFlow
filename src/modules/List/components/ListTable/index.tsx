import React from "react";
import { Table, Button, Pagination } from "antd";
import { ColumnProps } from "antd/lib/table";
import _ from "lodash";
import { Article, Attachment } from "../../interface";

const PREFIX = "ListTable";

interface Props {
  className?: string;
  dataSource: Article[];
  loading: boolean;
  pageNumber: number;
  pageSize: number;
  total: number;
}

const ListTable: React.FC<Props> = ({
  dataSource,
  loading,
  pageNumber,
  pageSize,
  total,
}) => {
  const columns: Array<ColumnProps<Article>> = [
    {
      dataIndex: "name",
      title: "文章名称",
    },
    {
      dataIndex: "coverUrl",
      title: "文章封面",
    },
    {
      dataIndex: "status",
      title: "文章状态",
    },
    {
      dataIndex: "createTime",
      title: "创建时间",
    },
    {
      dataIndex: "publishTime",
      title: "发布时间",
    },
    {
      dataIndex: "attachments",
      title: "附件",
      render: (attachments: Attachment[]) =>
        _.map(attachments, attachment => attachment.name),
    },
    {
      key: "operation",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (item: any, record: Article) => {
        return (
          <div>
            <Button>编辑</Button>
            <Button>发布</Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className={PREFIX}>
      <Table
        className={`${PREFIX}-antTable`}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
        rowKey="id"
      />
      <div>
        <Pagination
          className={`${PREFIX}-pagination`}
          pageSize={pageSize}
          total={total}
          current={pageNumber}
        />
      </div>
    </div>
  );
};

export default ListTable;
