import React, { useMemo, useState } from "react";
import BarChart from "./BarChart";
import "./App.css";
import WorldMap from "./components/worldmap/WorldMap";
import { Slider, InputNumber, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import { Typography } from "antd";
import { data, DataEntry } from "./data";
import usePromise from "react-use-promise";
import { SidePanel } from "./components/side_panel/side_panel";
import { ParaCoord } from "./components/paracoord/paracoord";

const { Title, Text } = Typography;

const { Header, Footer, Sider, Content } = Layout;

const minDate = new Date(1970, 0, 1);
const maxDate = new Date(2018, 0, 1);
const daySpan = Math.round(
  (maxDate.getTime() - minDate.getTime()) / (24 * 3600 * 1000)
);
const monthSpan = (2018 - 1970) * 12;

const dateConverter = (pos?: number) => new Date(1970, pos ?? 0, 1);
const tipFormatter = (pos?: number) =>
  dateConverter(pos).toLocaleDateString("en-US");

const App: React.FC = () => {
  const [span, setSpan] = useState(1);
  const [end, setEnd] = useState(monthSpan);
  const [country, setCountry] = useState<string | undefined>(undefined);

  const [selectedEvents, setSelectedEvents] = useState<{
    [id: number]: boolean;
  }>({});

  const [dataByGeoCountry] = usePromise(
    () =>
      data.then((entries) => {
        let processedData: { [key: string]: DataEntry[] } = {};
        for (const entry of entries) {
          if (!processedData[entry.geoCountry]) {
            processedData[entry.geoCountry] = [];
          }
          processedData[entry.geoCountry].push(entry);
        }
        return processedData;
      }),
    []
  );

  const dataByGeoCountryInPeriod = useMemo(() => {
    let processedData: { [key: string]: DataEntry[] } = {};
    if (!dataByGeoCountry) {
      return processedData;
    }
    let startDate = dateConverter(end - span);
    let endDate = dateConverter(end);
    for (const country in dataByGeoCountry) {
      processedData[country] = dataByGeoCountry[country].filter(
        (entry) => entry.date >= startDate && entry.date <= endDate
      );
    }
    return processedData;
  }, [span, end, dataByGeoCountry]);

  const worldMap = useMemo(
    () => (
      <WorldMap
        data={dataByGeoCountryInPeriod}
        limit={100 * span}
        onSelectCountry={setCountry}
        onSelectEvent={() => {}}
        type="country"
      />
    ),
    []
  );
  return (
    <div className="App">
      {/* <h2>ECS 272 Assignment 3 D3 Template</h2>
      <div id="container">
        <div id="tooltip"></div>
      </div> */}

      <Layout>
        <Header style={{ height: "70px", lineHeight: 1 }}>
          <Title level={5}>Global Terrorism Visualization</Title>
          <div
            style={{ display: "block", whiteSpace: "nowrap" }}
            className="period-selector"
          >
            <Text>Period:&nbsp;</Text>
            <Slider
              style={{
                width: "580px",
                display: "inline-block",
                marginBottom: "-4px",
              }}
              range={{ draggableTrack: true }}
              min={0}
              max={monthSpan}
              value={[Math.max(0, end - span), Math.min(monthSpan, end)]}
              tipFormatter={tipFormatter}
              onChange={(value: number[]) => {
                setEnd(value[1]);
                setSpan(value[1] - value[0]);
              }}
            />
            <Text>
              &nbsp;{tipFormatter(end - span)} - {tipFormatter(end)} For &nbsp;
            </Text>
            <InputNumber
              value={span}
              min={1}
              max={monthSpan}
              size="small"
              style={{ width: "40px", display: "inline-block" }}
              onChange={(value) => {
                if (typeof value == "number" && Number.isInteger(value)) {
                  setSpan(Math.max(1, Math.min(end, value)));
                }
              }}
            />
            <Text>&nbsp; Months</Text>
          </div>
        </Header>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <div style={{ width: "55%", paddingTop: "10px" }}>
            <Title style={{ textAlign: "center" }} level={5}>
              Global Terrorism Map
            </Title>
            <div style={{ margin: "auto 0" }}>
              <WorldMap
                data={dataByGeoCountryInPeriod}
                limit={100 * span}
                onSelectCountry={(country) => {
                  setCountry(country);
                  setSelectedEvents({});
                }}
                onSelectEvent={(id, select) => {
                  if (select) {
                    setSelectedEvents((selectedEvents) => ({
                      ...selectedEvents,
                      [id]: true,
                    }));
                  } else {
                    setSelectedEvents((selectedEvents) => ({
                      ...selectedEvents,
                      [id]: false,
                    }));
                  }
                }}
                type="country"
              />
            </div>
          </div>
          <div style={{ width: "45%", padding: "10px" }}>
            {!country ? (
              "Please select a country to view details"
            ) : (
              <>
                {/* <div style={{ margin: "0 auto" }}> */}
                <Title style={{ textAlign: "center" }} level={5}>
                  Statistics for {country}
                </Title>
                {/* </div> */}
                {dataByGeoCountryInPeriod[country as string] &&
                dataByGeoCountryInPeriod[country as string].length ? (
                  <SidePanel
                    data={dataByGeoCountryInPeriod[country as string]}
                    selectedEvents={selectedEvents}
                  />
                ) : (
                  "No terrorism record in this period for this country"
                )}
              </>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default App;
