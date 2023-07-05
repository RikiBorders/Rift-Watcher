import React from "react";

export default function TacticianInfo(tacticianData: any) {
  {
    console.log(tacticianData);
  }

  const renderIcon = () => {
    if (tacticianData.profileIcon) {
      return (
        <img
          src={
            "http://ddragon.leagueoflegends.com/cdn/13.11.1/img/profileicon/" +
            tacticianData.profileIcon +
            ".png"
          }
        />
      );
    }
  };

  const renderRank = () => {
    if (tacticianData.rankedData) {
      return (
        <img
          src={`/ranked_icons/emblem-${tacticianData.rankedData.rank[0]}.png`}
        />
      );
    }
  };
  return (
    <div>
      <h1>{tacticianData.summonerName}</h1>
      {renderIcon()}
      {renderRank()}
    </div>
  );
}
