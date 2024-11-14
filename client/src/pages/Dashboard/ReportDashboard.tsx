import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { reportConfigGetByQuery } from "../../services/api/reportConfigApi";
import { Button, Card, Col, Flex, message, Row, Typography } from "antd";
import { parseResError } from "../../services/errorHandler";
import Title from "antd/es/typography/Title";
import _ from "lodash"
import { flattenFields, generateColDefs, getRandomColor } from "../../services/helper";
import { Bar, BarChart, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line, CartesianAxis, CartesianGrid } from "recharts";
import { ReloadOutlined } from "@ant-design/icons"
import { AgGridReact } from "ag-grid-react";

const HorizontalBarChart = ({config, chart, data} : {config : any, chart : any, data : any[]}) => {

    const [chartData, setChartData] = useState<any[]>([]);
    const [fields, setFields] = useState<any[]>([]);
    const stackId = 1;

    useEffect(() => {
        if(data.length > 0 && fields.length > 0){
            chart.chart_config.x_axis.forEach((item : any) => {
                console.log(fields.filter(f => f.identifier == item)[0].name)
            });
            setChartData(
                 _.uniqBy(data, chart.chart_config.y_axis)
                 .map((d:any) => {
                     const _data =  {
                        [fields.filter(f => f.identifier == chart.chart_config.y_axis)[0].name] : d[chart.chart_config.y_axis],
                     }
                     chart.chart_config.x_axis.forEach((item : any) => {
                         _data[fields.filter(f => f.identifier == item)[0].name] = _.sum(data.map(d => parseInt(d[item])));
                     });
                     return _data;
                 })
             );
        }
    }, [data, fields]);

    useEffect(() => {
        console.log(chartData)
    }, [chartData])

    useEffect(() => {
        if(config.fields.length > 0)
            setFields(flattenFields(config.fields));
    }, [config]);

    return (
        <Card className="w-full">
            <Typography.Paragraph className="text-center">{chart.title}</Typography.Paragraph>
            {
                (fields.length > 0 && data.length > 0) && (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={chartData}
                                layout="vertical"
                            >
                                <YAxis type="category" dataKey={fields.filter(f => f.identifier == chart.chart_config.y_axis)[0].name} />
                                <XAxis type="number"  />
                                <Tooltip />
                                {
                                    chart.chart_config.x_axis.map((item : any, index : number) => {
                                        if(chart.chart_config.stacked)
                                            return (
                                                <Bar fill={getRandomColor(index)} stackId="a"  key={item} dataKey={fields.filter(f => f.identifier == item)[0].name}  />
                                            )
                                        else 
                                            return (
                                                <Bar fill={getRandomColor(index)}  key={item} dataKey={fields.filter(f => f.identifier == item)[0].name}  />
                                            )
                                    })
                                }
                                <Legend />
                            </BarChart>
                        </ResponsiveContainer>
                )
            }
        </Card>
    )
}

const VerticalBarChart = ({config, chart, data} : {config : any, chart : any, data : any[]}) => {

    const [chartData, setChartData] = useState<any[]>([]);
    const [fields, setFields] = useState<any[]>([]);

    useEffect(() => {
        if(data.length > 0 && fields.length > 0){
            setChartData(
                 _.uniqBy(data, chart.chart_config.x_axis)
                 .map((d:any) => {
                     const _data =  {
                        [fields.filter(f => f.identifier == chart.chart_config.x_axis)[0].name] : d[chart.chart_config.x_axis],
                     }
                     chart.chart_config.y_axis.forEach((item : any) => {
                         _data[fields.filter(f => f.identifier == item)[0].name] = _.sum(data.map(d => parseInt(d[item])));
                     });
                     return _data;
                 })
             );
        }
    }, [data, fields]);

    useEffect(() => {
        console.log(chartData)
    }, [chartData])

    useEffect(() => {
        if(config.fields.length > 0)
            setFields(flattenFields(config.fields));
    }, [config]);

    return (
        <Card className="w-full">
            <Typography.Paragraph className="text-center">{chart.title}</Typography.Paragraph>
            {
                (fields.length > 0 && data.length > 0) && (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={chartData}
                        >
                            <YAxis type="number"  />
                            <XAxis type="category" dataKey={fields.filter(f => f.identifier == chart.chart_config.x_axis)[0].name} />
                            <Tooltip />
                            {
                                chart.chart_config.y_axis.map((item : any, index : number) => {
                                    if(chart.chart_config.stacked)
                                        return (
                                            <Bar fill={getRandomColor(index)} stackId="a"  key={item} dataKey={fields.filter(f => f.identifier == item)[0].name}  />
                                        )
                                    else 
                                        return (
                                            <Bar fill={getRandomColor(index)}  key={item} dataKey={fields.filter(f => f.identifier == item)[0].name}  />
                                        )
                                })
                            }
                            <Legend />
                        </BarChart>
                    </ResponsiveContainer>
                )
            }
        </Card>
    )
}

const C_PieChart = ({config, chart, data} : {config : any, chart : any, data : any[]}) => {

    const [chartData, setChartData] = useState<any[]>([]);
    const [fields, setFields] = useState<any[]>([]);

    useEffect(() => {
        if(data.length > 0 && fields.length > 0){
            setChartData(
                 _.uniqBy(data, chart.chart_config.category)
                 .map((d:any) => {
                     const _data =  {
                        [fields.filter(f => f.identifier == chart.chart_config.category)[0].name] : d[chart.chart_config.category],
                        [fields.filter(f => f.identifier == chart.chart_config.value)[0].name] : _.sum(data.filter(a => a[chart.chart_config.category] == d[chart.chart_config.category]).map(a => parseInt(a[chart.chart_config.value])))
                     }
                     
                     return _data;
                 })
             );
        }
    }, [data, fields]);

    useEffect(() => {
        console.log(chartData)
    }, [chartData])

    useEffect(() => {
        if(config.fields.length > 0)
            setFields(flattenFields(config.fields));
    }, [config]);

    return (
        <Card className="w-full">
            <Typography.Paragraph className="text-center">{chart.title}</Typography.Paragraph>
            {
                (fields.length > 0 && data.length > 0) && (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart
                        >
                            <Pie 
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            dataKey={fields.filter(f => f.identifier == chart.chart_config.value)[0].name}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell name={entry[fields.filter(f => f.identifier == chart.chart_config.category)[0].name]} key={entry} fill={getRandomColor(index)} ></Cell>
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                )
            }
        </Card>
    )
}

const C_LineChart = ({config, chart, data} : {config : any, chart : any, data : any[]}) => {

    const [chartData, setChartData] = useState<any[]>([]);
    const [fields, setFields] = useState<any[]>([]);

    useEffect(() => {
        if(data.length > 0 && fields.length > 0){
            setChartData(
                 _.uniqBy(data, chart.chart_config.category)
                 .map((d:any) => {
                    const _data =  {
                        [fields.filter(f => f.identifier == chart.chart_config.category)[0].name] : d[chart.chart_config.category],
                    }
                    chart.chart_config.lines.forEach((item : any) => {
                        _data[fields.filter(f => f.identifier == item)[0].name] = _.sum(data.filter(a => a[chart.chart_config.category] == d[chart.chart_config.category]).map(d => parseInt(d[item])));
                    });
                    return _data;
                 })
             );
        }
    }, [data, fields]);

    useEffect(() => {
        console.log("line data", chartData)
    }, [chartData])

    useEffect(() => {
        if(config.fields.length > 0)
            setFields(flattenFields(config.fields));
    }, [config]);

    return (
        <Card className="w-full">
            <Typography.Paragraph className="text-center">{chart.title}</Typography.Paragraph>
            {
                (fields.length > 0 && data.length > 0) && (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={chartData}
                        >
                            <CartesianGrid />
                            <XAxis dataKey={fields.filter(f => f.identifier == chart.chart_config.category)[0].name} />
                            <YAxis type="number"  />
                            <Tooltip />
                            {
                                chart.chart_config.lines.map((item : any, index) => {
                                    return (<Line key={item} stroke={getRandomColor(index)}  dataKey={fields.filter(f => f.identifier == item)[0].name} />)
                                })
                            }
                            <Legend />
                        </LineChart>
                    </ResponsiveContainer>
                )
            }
        </Card>
    )
}

const TabularPresentation = ({config, chart, data} : {config : any, chart : any, data : any[]}) => {

    const [chartData, setChartData] = useState<any[]>([]);
    const [fields, setFields] = useState<any[]>([]);


    useEffect(() => {
        console.log("line data", chartData)
    }, [chartData])

    useEffect(() => {
        if(config.fields.length > 0)
            setFields(flattenFields(config.fields));
    }, [config]);

    return (
        <Card className="w-full">
            <Typography.Paragraph className="text-center">{chart.title}</Typography.Paragraph>
            {
                (fields.length > 0 && data.length > 0) && (
                    <div className={`${data.length == 0 && "hidden"} mx-auto`}>
                        <div className="ag-theme-alpine mt-5" style={{ width: '100%', height: '500px' }}>
                            <AgGridReact 
                            rowData={data} 
                            columnDefs={
                                _.filter(generateColDefs(config.fields), a => {
                                    return [...Object.keys(chart.chart_config.fields).filter(f => chart.chart_config.fields[f])].includes(a.field)
                                })
                            } 
                            onGridReady={(ev) => ev.api.sizeColumnsToFit()}/>
                        </div>
                    </div>
                )
            }
        </Card>
    )
}

const RenderChart = ({config, chart, data} : {config : any, chart : any, data : any[]}) => {
    if(chart.type == "Horizontal Bar Chart") return <HorizontalBarChart chart={chart} data={data} config={config} />
    if(chart.type == "Vertical Bar Chart") return <VerticalBarChart chart={chart} data={data} config={config} />
    if(chart.type == "Pie Chart") return <C_PieChart chart={chart} data={data} config={config} />
    if(chart.type == "Line Chart") return <C_LineChart chart={chart} data={data} config={config} />
    if(chart.type == "Tabular Presentation") return <TabularPresentation chart={chart} data={data} config={config} />
    return (<></>);
}

const ReportDashboard = () => {

    const { _id } = useParams();
    const [charts, setCharts] = useState([]);
    const [config, setConfig] = useState<any>({});
    const [data, setData] = useState<any[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);

    const init = async () => {
        try {
            const config = (await reportConfigGetByQuery({_id : _id}, ["sector", "charts", ["data"]])).data[0];
            setConfig(config);
            setCharts(config.charts);
            setData(config.data.map(d => d.data));   
        } catch (error) {
            message.error(parseResError(error).msg);
        }
    }

    useEffect(() => {
        init();
    }, [_id, refresh]);

    const setSpans = (chart) => {
        if(chart.type == "Tabular Presentation")
            return 24;
        return 12
    }

    return (
        <div>
            <Title level={4}>{config.name}</Title>
            <Button onClick={() => setRefresh(!refresh)} icon={<ReloadOutlined />}>Reload</Button>
            <Row >
                {charts.map((chart, index) => {
                    return (
                        <Col className="p-3" key={index} span={setSpans(chart)}>
                            <RenderChart  chart={chart} data={data} config={config} />
                        </Col>
                    )
                })}
            </Row>
        </div>
    );
}

export default ReportDashboard;