import React from "react";
import dayjs from "dayjs";
import { defineMessages, FormattedMessage } from "react-intl";
import { Table, Button, Pagination, Divider } from "antd";
import { ColumnProps } from "antd/lib/table";
import { map } from "lodash";
import { Article, Attachment } from "../../interface";
import { ArticleStatus, ArticleStatusName } from "../../constant";
import "./index.scss";

const PREFIX = "ListTable";
const FORMAT = "YYYY-MM-DD HH:mm:ss";
const MESSAGES = defineMessages({
  name: {
    id: "ListTable.name",
    defaultMessage: "文章名称",
  },
  coverUrl: {
    id: "ListTable.coverUrl",
    defaultMessage: "文章封面",
  },
});

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
      title: <FormattedMessage {...MESSAGES.name} />,
    },
    {
      dataIndex: "coverUrl",
      title: <FormattedMessage {...MESSAGES.coverUrl} />,
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
        map(attachments, attachment => attachment.name),
    },
    {
      align: "right",
      key: "operation",
      title: "操作",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (item: any, record: Article) => {
        return (
          <div className={`${PREFIX}-operation`}>
            <Button className={`${PREFIX}-operationBtn`} size="small">
              编辑
            </Button>
            {record.status === ArticleStatus.DRAFT && (
              <>
                <Divider
                  className={`${PREFIX}-operationDivider`}
                  type="vertical"
                />
                <Button className={`${PREFIX}-operationBtn`} size="small">
                  发布
                </Button>
              </>
            )}
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
