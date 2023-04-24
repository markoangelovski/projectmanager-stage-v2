import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useStoreState } from "easy-peasy";

import { DayStatsContainer } from "./DayStats.styles";

const DayStats = () => {
  const [markedSeries, setMarkedSeries] = useState([0]);
  const [bookedSeries, setBookedSeries] = useState([0]);

  const { singleDay, getComputedDay } = useStoreState(state => state);

  const [totalEvents, totalBooked, timeMarked, timeRemaining] = getComputedDay;

  const options = {
    chart: {
      offsetX: -7
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2
          }
        },
        dataLabels: {
          showOn: "always",
          name: {
            show: true,
            offsetY: 20
          },
          value: {
            show: true,
            offsetY: -20,
            fontSize: "0px"
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91]
      }
    },
    colors: ["rgba(104,104,104,0.8"]
  };

  const markedOptions = {
    ...options,
    labels: [`Total marked: ${timeMarked}`]
  };

  useEffect(() => {
    return setMarkedSeries([
      Math.floor((timeMarked / (timeMarked + timeRemaining)) * 100)
    ]);
    // eslint-disable-next-line
  }, [singleDay]);

  const bookedOptions = {
    ...options,
    labels: [`Total booked: ${totalBooked}`]
  };

  useEffect(() => {
    return setBookedSeries([
      Math.floor((totalBooked / totalEvents) * 100) || 0
    ]);
    // eslint-disable-next-line
  }, [singleDay]);

  return (
    <DayStatsContainer>
      <Chart
        options={markedOptions}
        series={markedSeries}
        type="radialBar"
        height="150px"
        width="150px"
      />

      <Chart
        options={bookedOptions}
        series={bookedSeries}
        type="radialBar"
        height="150px"
        width="150px"
      />
    </DayStatsContainer>
  );
};

export default DayStats;
