import React from "react";
import { TryInfo } from "../interface/types";

const Try: React.FunctionComponent<{ tryInfo: TryInfo }> = ({ tryInfo }) => {
  return (
    <>
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    </>
  );
};

export default Try;
