import React, { useEffect, useState } from 'react'
import { Button, Form, Select, Modal, Input } from 'antd';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import { useQuery } from "@apollo/react-hooks";
import { PlusOutlined } from '@ant-design/icons';
import { useMutation } from "@apollo/react-hooks";

import { CREATE_COMPANY } from './Mutation';
import { ALL_COMPANY } from './Queries';
import { SUBSCRIPTION_USERS } from './Subscription';
import Logout from '../../component/commen/Logout';

const { Option } = Select;
const layout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 16,
    },
};

const Dashboard = () => {
    const { data, refetch, subscribeToMore } = useQuery(ALL_COMPANY)
    const [company, setCompany] = useState([])
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState("")
    const [createNewCompany] = useMutation(CREATE_COMPANY)
    const history = useHistory();
    const user = localStorage.getItem('user')
    useEffect(() => {
        refetch()
    }, [])

    useEffect(() => {
        setCompany(data?.getCompanyById)
    }, [data])


    useEffect(() => {
        try {
            if (subscribeToMore) {
                const unsubscribe = subscribeToMore({
                    document: SUBSCRIPTION_USERS,
                    updateQuery: (previousResult, { subscriptionData }) => {
                        if (!subscriptionData.data) {
                            return previousResult;
                        }
                        const { companyChange } = subscriptionData.data;
                        if (companyChange && companyChange.keyType === "COMPANY_CREATED") {
                            let newData = [
                                companyChange.data,
                                ...previousResult.getCompanyById,
                            ];
                            return {
                                ...previousResult,
                                getCompanyById: {
                                    ...previousResult.getCompanyById,
                                    data: newData
                                },
                            };
                        }
                    },
                });
                return () => unsubscribe();
            }
        } catch (error) {
            console.log(error);
        }
    }, [subscribeToMore]);



    const onCreate = (values) => {
        createNewCompany({
            variables: values
        })
            .then(data => {
                toast.success("create company successfully");
            })
            .catch(err => {
                toast.error(err);
            })

        setVisible(false);
    };
    const [form] = Form.useForm();

    const onChange = (values) => {
        setId(values)
        localStorage.setItem('companyId', values)
    }

    const submitHandler = () => {
        history.push({
            pathname: "/employee",
            id
        })
    }

    return (
        <div className="container d-flex justify-content-center align-items-center align-content-center vh-100 ">
            <div className="container form-signin">
                <div className="d-flex justify-content-center">
                    <h3>{user}</h3>
                </div>
                <Logout />
                <div className="d-flex justify-content-end  mb-5">

                    <Button type="primary" className=" d-flex align-items-center " icon={<PlusOutlined />} onClick={() => setVisible(true)}  >
                        Add Company
                    </Button>
                </div>

                <Modal
                    visible={visible}
                    title="Create a new Company"
                    okText="Create"
                    cancelText="Cancel"
                    onCancel={() => {
                        setVisible(false)
                        form.resetFields();
                    }}
                    onOk={() => {
                        form
                            .validateFields()
                            .then((values) => {
                                form.resetFields();
                                onCreate(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                >
                    <Form
                        {...layout}
                        form={form}
                        name="form_in_modal"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Form.Item
                            label="Company Name"
                            name="companyName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your companyName!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="location"
                            name="location"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your location!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                <div className="d-flex justify-content-center">
                    <Form.Item label="Select Company">
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                            onChange={onChange}
                        >
                            {company?.map((res) => (
                                <Option key={res.id} value={res.id}>{res.companyName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
                <div className="d-flex justify-content-end  ">
                    <Button type="primary" className=" d-flex align-items-center " disabled={!id} onClick={() => submitHandler()}  >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
