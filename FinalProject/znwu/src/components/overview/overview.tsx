import React, { useMemo, useState } from "react";

import { Typography } from "antd";
import WorldMap from "../worldmap/WorldMap";
import { data } from "../../data";
import usePromise from "react-use-promise";
import { SidePanel } from "../side_panel/side_panel";

const { Title, Text } = Typography;

export const Overview = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const [focuedFactor, setFocusedFactor] = useState<string | undefined>(
    undefined
  );

  const [data_ready] = usePromise(() => data, []);

  const detailData = useMemo(() => {
    return (
      data_ready?.filter(
        (datum) => selectedCountries.indexOf(datum.Country) != -1
      ) || []
    );
  }, [selectedCountries, data_ready]);

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <div style={{ width: "70%", paddingTop: "10px" }}>
        <Title style={{ textAlign: "center" }} level={5}>
          Global Pandemic Overview
        </Title>
        <div style={{ margin: "auto 0" }}>
          <WorldMap
            data={data_ready || []}
            onSelectionChanged={setSelectedCountries}
            type={focuedFactor || "map"}
          />
        </div>
      </div>
      <div style={{ width: "30%", padding: "10px" }}>
        {!detailData || detailData.length == 0 ? (
          "Please select a country to view details"
        ) : (
          <SidePanel data={detailData} onFactorChanged={setFocusedFactor} factor={focuedFactor}/>
        )}
      </div>
    </div>
  );
};
