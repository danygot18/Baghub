import React, { useState, useEffect } from 'react';
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
import { Card } from 'react-bootstrap';

const UserSalesChart = () => {
    const [sales, setSales] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const userSales = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            };

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/customer-sales`, config);
            setSales(data.customerSales);
            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"];

    useEffect(() => {
        userSales();
    }, []);

    return (
        <Card>
            <Card.Body>
                <h5 className="card-title mb-4">User Sales Chart</h5>
                {loading ? (
                    <Loader />
                ) : (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={sales}>
                            <CartesianGrid strokeDasharray="2 2" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="total"
                                stroke="#000000"
                                strokeWidth={5}
                            >
                                {sales.map((item, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={barColors[index % 20]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </Card.Body>
        </Card>
    );
};

export default UserSalesChart;
