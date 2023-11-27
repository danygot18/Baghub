import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardBody } from 'react-bootstrap';
import { getToken } from "../../utils/helpers";
import axios from "axios";
import Loader from '../layout/Loader';

const MonthlySalesChart = () => {
    const [sales, setSales] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const monthlySales = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            };

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/sales-per-month`, config);
            setSales(data.salesPerMonth);
            setLoading(false);

        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        monthlySales();
    }, []);

    return (
        <Card>
            <Card.Body>
                <h5 className="card-title mb-4">Monthly Sales Chart</h5>
                {loading ? (
                    <Loader />
                ) : (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            width={400}
                            height={400}
                            data={sales}
                            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                        >
                            <Line type="monotone" dataKey="total" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </Card.Body>
        </Card>
    );
};

export default MonthlySalesChart;