const getSps = async (client) => {
  const sps = await client.sp.getStorageProviders();
  const finalSps = (sps ?? []).filter((v) => v.endpoint.includes("bnbchain"));

  return finalSps;
};

const getAllSps = async (client) => {
  const sps = await getSps(client);
  return sps.map((sp) => {
    return {
      address: sp.operatorAddress,
      endpoint: sp.endpoint,
      sealAddress: sp.sealAddress,
      name: sp.description?.moniker,
    };
  });
};

module.exports = {
  getAllSps,
};
