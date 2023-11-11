import { Greenfield } from './greenfieldInfo';
import { client } from './client';
import { getAllSps } from './getAllSps';
import toast from 'react-hot-toast';
export const getOffchainAuthKeys = async (address, signer) => {
    const storageResStr = localStorage.getItem(address);
    const sps = await getAllSps(client);
    if (storageResStr) {
      const storageRes = JSON.parse(storageResStr) 
      if (storageRes.expirationTime < Date.now()) {
        toast.error('Your auth key has expired, please generate a new one');
        localStorage.removeItem(address);
        return;
      }
  
      return storageRes;
    }
  
    const offchainAuthRes = await client.offchainauth.genOffChainAuthKeyPairAndUpload(
      {
        sps : sps,
        chainId: Greenfield.GREEN_CHAIN_ID,
        expirationMs: 5 * 24 * 60 * 60 * 1000,
        domain: window.location.origin,
        address,
      },
      signer,
    );
  
    console.log("off chain result ", offchainAuthRes)
    const { code, body: offChainData } = offchainAuthRes;
    if (code !== 0 || !offChainData) {
      throw offchainAuthRes;
    }
  
    localStorage.setItem(address, JSON.stringify(offChainData));
    return offChainData;
  };