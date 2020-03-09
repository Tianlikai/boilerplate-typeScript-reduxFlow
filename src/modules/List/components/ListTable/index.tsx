import React from "react";
import dayjs from "dayjs";
import { Table, Button, Pagination, Divider } from "antd";
import { ColumnProps } from "antd/lib/table";
import _ from "lodash";
import { Article, Attachment } from "../../interface";
import { ArticleStatus, ArticleStatusName } from "../../constant";
import "./index.scss";

const PREFIX = "ListTable";
const FORMAT = "YYYY-MM-DD HH:mm:ss";

interface Props {
  className?: string;
  dataSource: Article[];
  loading: boolean;
  pageNumber: number;
  pageSize: number;
  total: number;
  onPageSizeChange: (page: number, pageSize: number) => void;
}

const ListTable: React.FC<Props> = ({
  dataSource,
  loading,
  pageNumber,
  pageSize,
  total,
  onPageSizeChange,
}) => {
  const itemRender = (
    page: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
    originalElement: React.ReactElement<HTMLElement>,
  ) => {
    if (type === "prev") {
      return <a>上一页</a>;
    }
    if (type === "next") {
      return <a>下一页</a>;
    }
    return originalElement;
  };

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
      render: (status: ArticleStatus) => ArticleStatusName[status],
    },
    {
      dataIndex: "createTime",
      title: "创建时间",
      render: (timeStamp: number) => dayjs(timeStamp).format(FORMAT),
    },
    {
      dataIndex: "publishTime",
      title: "发布时间",
      render: (timeStamp: number) => dayjs(timeStamp).format(FORMAT),
    },
    {
      dataIndex: "attachments",
      title: "附件",
      render: (attachments: Attachment[]) =>
        _.map(attachments, attachment => attachment.name),
    },
    {
      align: "right",
      key: "operation",
      title: "操作",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (item: any, record: Article) => {
        return (
          <>
            <Button size="small">编辑</Button>
            {record.status === ArticleStatus.DRAFT && (
              <>
                <Divider type="vertical" />
                <Button size="small">发布</Button>
              </>
            )}
          </>
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
      <Pagination
        className={`${PREFIX}-pagination`}
        current={pageNumber}
        pageSize={pageSize}
        total={total}
        itemRender={itemRender}
        onChange={onPageSizeChange}
      />
    </div>
  );
};

export default ListTable;
