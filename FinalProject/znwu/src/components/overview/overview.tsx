import React, { useMemo, useState } from "react";

import { Typography } from "antd";
import WorldMap from "../worldmap/WorldMap";
import { data } from "../../data";
import usePromise from "react-use-promise";
import { SidePanel } from "../side_panel/side_panel";

const { Title, Text } = Typography;

export const Overview = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const [focuedFactors, setFocusedFactors] = useState<string | null>(null);

  const [data_ready] = usePromise(() => data, []);

  const detailData = useMemo(() => {
    return (
      data_ready?.filter(
        (datum) => selectedCountries.indexOf(datum.Country) != -1
      ) || []
    );
  }, [selectedCountries, data_ready]);

  console.log(data_ready);

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <div style={{ width: "55%", paddingTop: "10px" }}>
        <Title style={{ textAlign: "center" }} level={5}>
          Global Terrorism Map
        </Title>
        <div style={{ margin: "auto 0" }}>
          <WorldMap
            data={data_ready || []}
            onSelectionChanged={setSelectedCountries}
            type="map"
          />
        </div>
      </div>
      <div style={{ width: "45%", padding: "10px" }}>
        {selectedCountries.length === 0 ? (
          "Please select a country to view details"
        ) : (
          <SidePanel data={detailData} />
        )}
      </div>
    </div>
  );
};
