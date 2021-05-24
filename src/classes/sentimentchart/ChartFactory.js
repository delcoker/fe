import {ChartTypes} from "./enums/ChartTypes";
import BarChart from "./conceretecharts/BarChart";
import ColumnChart from "./conceretecharts/ColumnChart";
import LineChart from "./conceretecharts/LineChart";
import PieChart from "./conceretecharts/PieChart";

export default class ChartFactory {

    chartOption = null;
    chartMap = new Map();

    constructor(state) {
        // console.log(this.chartOption);
        this.chartMap.set(ChartTypes.BAR.string, <BarChart/>);
        this.chartMap.set(ChartTypes.COLUMN.string, <ColumnChart/>);
        this.chartMap.set(ChartTypes.LINE.string, <LineChart/>);
        this.chartMap.set(ChartTypes.PIE.string, <PieChart/>);
        // this.chartMap.set(ChartTypes.Table, new Table());
    }

    getChart = (chartType, chartOptions, handleChartChange) => {
        // console.log(chartType, chartOptions)
        this.chartOption = chartOptions;

        if (!this.chartMap.has(chartType)) {
            throw new Error(`Chart ${chartType} type not supported`)
        }
        if (chartType === ChartTypes.LINE.string) {
            return <LineChart chartOptions={chartOptions} handleChartChange={handleChartChange}/>
        }
        if (chartType === ChartTypes.BAR.string) {
            return <BarChart chartOptions={chartOptions} handleChartChange={handleChartChange}/>
        }
        if (chartType === ChartTypes.COLUMN.string) {
            return <ColumnChart chartOptions={chartOptions} handleChartChange={handleChartChange}/>
        }
        if (chartType === ChartTypes.PIE.string) {
            return <PieChart chartOptions={chartOptions} handleChartChange={handleChartChange}/>
        }
        return this.chartMap.get(chartType);
    }
}