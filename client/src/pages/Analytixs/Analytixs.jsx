import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/navbar/Naavbar";
import "./Analytixs.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer, // ✅ Add this
} from "recharts";

import axios from "axios";

const COLORS = ["#66cdaa", "#2ecc71", "#27ae60", "#16a085"];

const requiredSources = [
  "Instagram",
  "YouTube",
  "Facebook",
  "Twitter",
  "Shopify",
  "WooCommerce",
  "BigCommerce",
  "Magento",
];

const Analytixs = () => {
  const [metrics, setMetrics] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("Clicks on Links");
  const [dataLine, setDataLine] = useState([]);
  const [dataBarDevices, setDataBarDevices] = useState([]);
  const [dataBarLinks, setDataBarLinks] = useState([]);
  const [dataPie, setDataPie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/track/analytics`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setDatas(response.data.data);
        const analyticsData = response.data.data;

        // Line Chart: 6-month data or from Jan to today
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        const lineData = [];
        for (let i = 5; i >= 0; i--) {
          const month = new Date(currentYear, currentMonth - i, 1);
          lineData.push({
            name: month.toLocaleString("default", { month: "short" }),
            value: 0,
          });
        }

        analyticsData.forEach((curr) => {
          const createdAt = new Date(curr.createdAt);
          if (createdAt.getFullYear() === currentYear) {
            const month = createdAt.toLocaleString("default", {
              month: "short",
            });
            const existing = lineData.find((item) => item.name === month);
            if (existing) existing.value += 1;
          }
        });

        // Filter out months with zero values if they are before the current month
        const filteredLineData = lineData.filter((data, index) => {
          const monthIndex = currentMonth - 5 + index;
          return monthIndex >= 0 || data.value > 0;
        });

        setDataLine(filteredLineData);

        // Bar Chart: Traffic by Device
        const deviceData = {};
        analyticsData.forEach((curr) => {
          deviceData[curr.os] = (deviceData[curr.os] || 0) + 1;
        });

        setDataBarDevices(
          Object.keys(deviceData).map((device) => ({
            name: device,
            value: deviceData[device],
          }))
        );

        // Bar Chart: Clicks by Links (Shop & Socials)
        const linkData = {};
        analyticsData.forEach((curr) => {
          if (requiredSources.includes(curr.application)) {
            linkData[curr.application] = (linkData[curr.application] || 0) + 1;
          }
        });

        setDataBarLinks(
          Object.keys(linkData).map((app) => ({
            name: app,
            value: linkData[app],
          }))
        );

        // Pie Chart: Clicks by Sources (Only required applications)
        const pieData = [];
        requiredSources.forEach((app) => {
          const count = analyticsData.filter(
            (entry) => entry.application === app
          ).length;
          if (count > 0) {
            pieData.push({ name: app, value: count });
          }
        });

        setDataPie(pieData);

        // Calculate metrics for Overview Cards
        const clicksOnLinks = analyticsData.filter(
          (entry) => entry.type === "link"
        ).length;
        const clicksOnShop = analyticsData.filter(
          (entry) => entry.type === "shop"
        ).length;
        const ctaClicks = analyticsData.filter(
          (entry) => entry.application === "Get Connected"
        ).length;

        setMetrics([
          {
            title: "Clicks on Links",
            value: clicksOnLinks,
            color: "#66cdaa",
          },
          {
            title: "Clicks on Shop",
            value: clicksOnShop,
            color: "#2ecc71",
          },
          {
            title: "CTA Clicks",
            value: ctaClicks,
            color: "#27ae60",
          },
        ]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [selectedMetric]);

  return (
    <div className="container1">
      <Sidebar />
      <div className="main-contents">
        <Navbar />
        <div className="contentsss">
          {loading ? (
            <p>Loading...</p>
          ) : datas.length === 0 ? (
            <p>No data available</p>
          ) : (
            <>
              {/* Overview Section */}
              <div className="overview">
                {metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="card"
                    style={{
                      borderColor: metric.color,
                      backgroundColor:
                        selectedMetric === metric.title ? "#22D679" : "#DCFFEB",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedMetric(metric.title)}
                  >
                    <p
                      style={{
                        color:
                          selectedMetric === metric.title ? "#fff" : "#000",
                      }}
                    >
                      {metric.title}
                    </p>
                    <h2
                      style={{
                        color:
                          selectedMetric === metric.title ? "#fff" : "#000",
                      }}
                    >
                      {metric.value}
                    </h2>
                  </div>
                ))}
              </div>

              {/* Line Chart */}
              <div className="chart-container">
                <LineChart width={600} height={250} data={dataLine}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#000"
                    strokeWidth={2}
                  />
                </LineChart>
              </div>

              {/* Bottom Section */}
              <div className="bottom-section">
                {/* Bar Chart - Traffic by Device */}
                <div className="chart-box">
                  <h3>Traffic by Device</h3>
                  <BarChart width={300} height={200} data={dataBarDevices}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2ecc71" />
                  </BarChart>
                </div>

                {/* Pie Chart - Sources */}
                <div className="chart-box">
                  <h3>Sources</h3>
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={dataPie}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          outerRadius="100%" // Make the circle fill more space
                          label
                        >
                          {dataPie.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bar Chart - Traffic by Links */}
                <div className="chart-box">
                  <h3>Traffic by Links</h3>
                  <BarChart width={300} height={200} data={dataBarLinks}>
                    <XAxis
                      dataKey="name"
                      tickFormatter={(name) =>
                        name.length > 8 ? name.substring(0, 6) + "..." : name
                      }
                    />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value} clicks`} />
                    <Bar dataKey="value" fill="#27ae60" />
                  </BarChart>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytixs;
