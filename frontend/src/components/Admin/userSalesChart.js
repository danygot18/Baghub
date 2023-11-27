import React, { useState, useEffect } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { getToken } from "../../utils/helpers";
import axios from "axios";
import Loader from '../layout/Loader';
import { Container } from 'react-bootstrap'

const UserSalesChart = ({ data }) => {
    const [sales, setSales] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const userSales = async () => {


        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/customer-sales`, config)
            console.log(data)
            setSales(data.customerSales)
            setLoading(false)
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]
    useEffect(() => {
        userSales()
        // allUsers()
    }, [])

    return (
        // <ResponsiveContainer width="90%" height={600}>
        //     {loading ? <Loader /> : (<BarChart
        //         data={sales}
        //     >
        //         <CartesianGrid strokeDasharray="2 2" />
        //         <XAxis dataKey="name" />
        //         <YAxis />
        //         <Tooltip formatter={(value, _id) => [value, _id]}/>
        //         <Legend />

        //         <Bar dataKey="total" stroke="#000000" 
        //             strokeWidth={5} >
        //             {
        //                 sales.map((item, index) => (
        //                     <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
        //                 ))
        //             }

        //         </Bar>
        //     </BarChart>)}
        // </ResponsiveContainer>
        // <Container width={700} height={500}>
        <ResponsiveContainer width="90%" height={600}>
            <BarChart
                width={500}
                height={300}
                data={sales}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                barSize={100}
            >
                <XAxis dataKey="_id" scale="point" padding={{ left: 10, right: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="total" fill="#8884d8" background={{ fill: '#eee' }} >
                    {
                        sales && sales.map((item, index) => (
                            <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
                        ))
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
        // </Container>
    );
}
export default UserSalesChart