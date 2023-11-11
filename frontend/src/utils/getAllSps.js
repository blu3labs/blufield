const getSps = async (client2) => {
  const sps = await client2?.sp.getStorageProviders();
  const finalSps = (sps ?? []).filter((v) => v.endpoint.includes("bnbchain"));

  return finalSps;
};

export const getAllSps = async (client2) => {
  const sps = await getSps(client2);
  console.log("sps", sps);
  return sps.map((sp) => {
    return {
      address: sp.operatorAddress,
      endpoint: sp.endpoint,
      sealAddress: sp.sealAddress,
      name: sp.description?.moniker,
    };
  });
};
