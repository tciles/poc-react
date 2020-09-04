import React from "react";
import {Tag, Space, Button, Modal, Table} from 'antd';
import {Link} from "react-router-dom";

const info = (name) => {
    Modal.info({
        title: 'This is a notification message',
        content: (
            <div>
                <p>{name}</p>
            </div>
        ),
        onOk() {},
    });
}

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={`/stagiaires/${record.key}`}>{text}</Link>,
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name < b.name,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Button type="primary" onClick={() => { info(record.name) }}>Invite {record.name}</Button>
                <Button danger onClick={() => { info(record.name) }}>Delete</Button>
            </Space>
        ),
    },
];

const StagiairesTable = ({stagiaires}) => <Table dataSource={stagiaires} columns={columns} pagination={{pageSize: 10}}/>

export default StagiairesTable;
