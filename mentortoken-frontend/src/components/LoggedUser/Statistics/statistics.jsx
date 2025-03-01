import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { jwtDecode } from "jwt-decode";
import "./statistics.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const getMonthName = (monthNumber) => {
    switch (monthNumber) {
        case 0: return "Jan";
        case 1: return "Feb";
        case 2: return "Mar";
        case 3: return "Apr";
        case 4: return "May";
        case 5: return "Jun";
        case 6: return "Jul";
        case 7: return "Aug";
        case 8: return "Sep";
        case 9: return "Oct";
        case 10: return "Nov";
        case 11: return "Dec";
        default: return "Invalid month number";
    }
};

const Statistics = ({ mentorId = null, filter = "all" }) => {
    const [token, setToken] = useState("");
    const [decodedToken, setDecodedToken] = useState("");
    const [jobAplications, setJobAplications] = useState([]);
    const [monthsNames, setMonthsNames] = useState([]);
    const [monthsNumbers, setMothsNumbers] = useState([]);
    const [dataMonths, setDataMonths] = useState(new Array(12).fill(0));

    const fetchMentorAssignedJobs = async (mentorId, lastYearDate) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/mentor/dateApplications/${mentorId}/${lastYearDate.toISOString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setJobAplications(data);
        } catch (error) {
            console.log("Error fetching mentor jobs:", error);
        }
    };

    const fetchCompanyAssignedJobs = async (lastYearDate) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/company/dateApplications/${lastYearDate.toISOString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setJobAplications(data);
        } catch (error) {
            console.log("Error fetching company jobs:", error);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("jwt_token");
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                setToken(storedToken);
                setDecodedToken(decoded);
            } catch (error) {
                console.error("Token decoding failed:", error);
            }
        }
    }, []);

    useEffect(() => {
        if (token !== "") {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const monthListName = [];
            const monthListNumbers = [];

            for (let i = 0; i < 12; i++) {
                monthListName.push(getMonthName((currentMonth + i) % 12));
                monthListNumbers.push((currentMonth + i) % 12);
            }

            const lastYear = currentDate.getFullYear() - 1;
            const lastYearDate = new Date(lastYear, currentMonth);

            if (decodedToken.type === "mentor") {
                fetchMentorAssignedJobs(mentorId, lastYearDate);
            } else {
                fetchCompanyAssignedJobs(lastYearDate);
            }

            setMonthsNames(monthListName);
            setMothsNumbers(monthListNumbers);
        }
    }, [mentorId, token, decodedToken]);

    useEffect(() => {
        if (jobAplications.length > 0) {
            const monthlyData = new Array(12).fill(0);
            jobAplications.forEach(app => {
                const month = new Date(app.updatedAt).getMonth();
                monthsNumbers.forEach((monthNum, i) => {
                    if (monthNum === month) {
                        const condition = decodedToken.type === "mentor" 
                            ? filter === "all" && app.acceptedStatus !== "rejected"
                            : filter === "all" && app.acceptedStatus !== "pending";
                        if (condition) {
                            monthlyData[i]++;
                        }
                    }
                });
            });
            setDataMonths(monthlyData);
        }
    }, [filter, jobAplications, monthsNumbers, decodedToken]);

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: Math.max(...dataMonths) + 0.3,
                ticks: {
                    stepSize: 1,
                    color: "rgba(203, 198, 215, 1)",
                    font: {
                        size: 12,
                        family: "Inter, sans-serif",
                        weight: 500,
                    },
                    callback: (value) => (value % 5 === 0 ? value : null),
                },
                grid: {
                    display: true,
                    drawTicks: false,
                    color: (context) => (context.tick.value % 5 === 0 ? "rgba(203, 198, 215, 1)" : "rgba(0, 0, 0, 0)"),
                    borderColor: "rgba(0, 0, 0, 0)",
                },
                border: { display: false },
            },
            x: {
                grid: { display: false, borderColor: "rgba(0, 0, 0, 0)" },
                border: { display: false },
                ticks: {
                    display: true,
                    color: "rgba(203, 198, 215, 1)",
                    font: {
                        size: 12,
                        family: "Inter, sans-serif",
                        weight: 500,
                    },
                },
            },
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    title: () => "",
                    label: (tooltipItem) => tooltipItem.raw,
                },
            },
        },
    };

    const userData = {
        labels: monthsNames,
        datasets: [
            {
                data: dataMonths,
                borderColor: "rgba(105, 108, 255, 1)",
                backgroundColor: "rgba(105, 108, 255, 1)",
                borderWidth: 3,
                fill: false,
                pointRadius: 0,
                tension: 0.3,
            },
        ],
    };

    return (
        <div className="performance-time">
            <h2>Overall Statistic</h2>
            <div className="statistics-chart">
                <h3>STATISTICS</h3>
                <p>Overall target accomplishment over the year</p>
                <Line data={userData} options={options} />
            </div>
        </div>
    );
};

export default Statistics;
