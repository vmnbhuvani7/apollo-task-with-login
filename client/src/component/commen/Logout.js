import React from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Button } from 'antd';


const Logout = () => {
    const history = useHistory();
    const LogoutHandler = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("companyId")
        localStorage.removeItem("user")
        history.push("/")
        toast.success("Logout successfully");
    }

    return (
        <div className="d-flex justify-content-end mb-3">
            <Button type="primary" className=" d-flex align-items-center" danger onClick={LogoutHandler}  >
                Logout
            </Button>
        </div>
    )
}

export default Logout
