import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './qrTablList.css'; // Import CSS file for styling

export default function QrTablList() {
    const [data, setData] = useState([]);

    const getData = () => {
        axios.get("http://localhost:5000/generate").then((resp) => {
            console.log("Response:", resp.data);
            setData(resp.data);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    function delData(id) {
        console.log("Delete data :", id);
        axios.delete("http://localhost:5000/generate/" + id).then(() => {
            getData();
        });
    }

    return (
        <div className="container">
            <table>
                <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>Name</th>
                        <th>Father name</th>
                        <th>Blood Group</th>
                        <th>Emergency number</th>
                        <th>Address</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((ele, i) => (
                        <tr key={ele._id}>
                            <td>{i + 1}</td>
                            <td>{ele.name}</td>
                            <td>{ele.fatherName}</td>
                            <td>{ele.bloodGroup}</td>
                            <td>{ele.emergency}</td>
                            <td>{ele.address}</td>
                            <td>
                                <button onClick={() => delData(ele._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
