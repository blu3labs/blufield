async function pushImage(file, bucketName, client, signer, address) {
  const maxWidth = 800;
  const maxHeight = 600;

  try {
    // save file use fs
    const timeStamps = new Date().getTime();
    let buf = file.buffer;
    if (
      file.mimetype.split("/")[1] == "jpeg" ||
      file.mimetype.split("/")[1] == "png" ||
      file.mimetype.split("/")[1] == "jpg" ||
      file.mimetype.split("/")[1] == "webp" ||
      file.mimetype.split("/")[1] == "gif" ||
      file.mimetype.split("/")[1] == "svg" ||
      file.mimetype.split("/")[1] == "apng" ||
      file.mimetype.split("/")[1] == "avif" ||
      file.mimetype.split("/")[1] == "bmp" ||
      file.mimetype.split("/")[1] == "ico" ||
      file.mimetype.split("/")[1] == "tiff"
    ) {
      buf = await sharp(file.buffer)
        .resize(maxWidth, maxHeight, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 80, progressive: true }) // Progressive JPEGs
        .webp({ quality: 80 }) // Convert to WebP format
        .toBuffer();
    }

    const filedata = buf;
    const metadataResponse = await api.post("/checksums", filedata, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let name =
      "images/" +
      timeStamps +
      generateString(10) +
      "." +
      file.mimetype.split("/")[1];
    const imageTx = await client.object.createObject(
      {
        bucketName: bucketName,
        contentLength: contentLength,
        creator: address,
        expectCheckSums: JSON.parse(expectCheckSums),
        fileType: file.mimetype.split("/")[1],
        objectName: name,
        redundancyType: "REDUNDANCY_EC_TYPE",
        visibility: "VISIBILITY_TYPE_PUBLIC_READ",
      },
      signer
    );
    const txHash = await imageTx.broadcast({
      ...broadcast,
    });
    const uploadRes = await client.object.uploadObject(
      {
        bucketName: bucketName,
        objectName: name,
        body: filedata,
        txnHash: txHash.transactionHash,
      },
      signer
    );
    const allSps = await getAllSps(client);
    // fs.unlinkSync(file.path);
    return {
      url: allSps[0].endpoint + "/view/" + bucketName + "/" + name,
    };
  } catch (error) {
    console.log(error);
    return {
      error: error,
    };
  }
}
