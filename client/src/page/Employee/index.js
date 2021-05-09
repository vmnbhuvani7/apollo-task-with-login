import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Button, Table, Modal } from 'antd';
import { toast } from 'react-toastify';

import { PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from "@apollo/react-hooks";

import { CREATE_EMPLOYEE, DELETE_EMPLOYEE } from './Mutation';
import { ALL_EMPLOYEE, SELECTED_COMPANY } from './Queries';
import { SUBSCRIPTION_EMPLOYEE } from './Subscription';
import Logout from '../../component/commen/Logout';

const Employee = () => {
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const [employee, setEmployee] = useState([]);
    const [createNewEmployee] = useMutation(CREATE_EMPLOYEE)
    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE)
    const { data, subscribeToMore } = useQuery(ALL_EMPLOYEE, {
        variables: {
            id: location.id || localStorage.getItem('companyId')
        }
    })
    const companyData = useQuery(SELECTED_COMPANY, {
        variables: {
            id: location.id || localStorage.getItem('companyId')
        }
    })
    const company_name = companyData?.data?.getSelectedCompany?.companyName
    const [signUP, setSignUP] = useState({
        name: '',
        age: '',
        post: '',
        salary: '',
        department: '',
        company: location.id || localStorage.getItem('companyId')
        // company: "607965b2039cda1bf4765378"
    })

    useEffect(() => {
        try {
            if (subscribeToMore) {
                const unsubscribe = subscribeToMore({
                    document: SUBSCRIPTION_EMPLOYEE,
                    updateQuery: (previousResult, { subscriptionData }) => {
                        if (!subscriptionData.data) {
                            return previousResult;
                        }
                        const { employeeChange } = subscriptionData.data;
                        if (employeeChange && employeeChange.keyType === "EMPLOYEE_CREATED") {
                            let newData = [
                                employeeChange.data,
                                ...previousResult.getEmployee,
                            ];
                            return {
                                ...previousResult,
                                getEmployee: {
                                    ...previousResult.getEmployee,
                                    data: newData
                                },
                            };
                        }
                        if (employeeChange && employeeChange.keyType === "EMPLOYEE_DELETED") {
                            let newData = previousResult.getEmployee.filter((res) => res.id !== employeeChange.data.id)
                            return {
                                getEmployee: {
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

    useEffect(() => {
        setEmployee(data?.getEmployee)
    }, [data])

    const deleteRecord = (value) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure delete this record?")) {
            deleteEmployee({
                variables: { id: value }
            })
                .then(() => {
                    toast.success("delete employee successful");
                })
                .catch(err => {
                    toast.error(err);
                })
        }
    }

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Department', dataIndex: 'department', key: 'department' },
        { title: 'Post', dataIndex: 'post', key: 'post' },
        { title: 'Salary', dataIndex: 'salary', key: 'salary' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (res) => <Button type="primary" danger onClick={() => deleteRecord(res.id)}>
                Delete
          </Button>,
        },
    ];



    const changeHandler = (event) => {
        setSignUP({
            ...signUP,
            [event.target.name]: event.target.value,
        })
    }

    const onCreate = () => {
        createNewEmployee({
            variables: signUP
        })
            .then(() => {
                toast.success("create employee successful");
                setSignUP({
                    name: '',
                    age: '',
                    post: '',
                    salary: '',
                    department: '',
                    company: location.id || localStorage.getItem('companyId')
                })
            })
            .catch(err => {
                toast.error(err);
            })
        setVisible(false);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center align-content-center vh-100 ">
            <div className="container form-emp">
                <div className="d-flex justify-content-center">
                    <h3>{company_name}</h3>
                </div>
                <Logout />
                <div className="d-flex justify-content-end  mb-5">
                    <Button type="primary" className=" d-flex align-items-center " icon={<PlusOutlined />} onClick={() => setVisible(true)}  >
                        Add Employee
                    </Button>
                </div>
                <Modal
                    visible={visible}
                    title="Create a new Employee"
                    okText="Create"
                    cancelText="Cancel"
                    onCancel={() => setVisible(false)}
                    onOk={() => onCreate()}
                >
                    <div className="form-group input-box">
                        <label>Name : </label>
                        <div>
                            <i className="fa fa-user-circle" aria-hidden="true"></i>
                            <input
                                type="text"
                                className=" "
                                placeholder="Enter name"
                                onChange={changeHandler}
                                value={signUP.name}
                                name="name"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group input-box">
                        <label>Age : </label>
                        <div>
                            <i class="fa fa-child" aria-hidden="true"></i>
                            <input
                                type="number"
                                className=" "
                                placeholder="Enter age"
                                name="age"
                                value={signUP.age}
                                onChange={changeHandler}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group  input-box">
                        <label>Department : </label>
                        <div>
                            <i class="fa fa-building" aria-hidden="true"></i>
                            <input
                                type="text"
                                placeholder="Enter department"
                                name="department"
                                value={signUP.department}
                                onChange={changeHandler}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group input-box">
                        <label>Post : </label>
                        <div>
                            <i class="fa fa-portrait" aria-hidden="true"></i>
                            <input
                                type="text"
                                className=" "
                                placeholder="Enter post"
                                value={signUP.post}
                                onChange={changeHandler}
                                name="post"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group input-box">
                        <label>Salary : </label>
                        <div>
                            <i class="fa fa-money-check-alt" aria-hidden="true"></i>
                            <input
                                type="number"
                                placeholder="Enter salary"
                                name="salary"
                                value={signUP.salary}
                                onChange={changeHandler}
                                required
                            />
                        </div>
                    </div>

                </Modal>
                <Table
                    columns={columns}
                    dataSource={employee}
                />
            </div>
        </div>
    )
}

export default Employee
