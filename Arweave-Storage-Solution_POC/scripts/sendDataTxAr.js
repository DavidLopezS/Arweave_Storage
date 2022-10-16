import Arweave from "arweave";
import dotenv from "dotenv"
import fs from "fs";
import gQL from "ar-gql";
import fetch from "node-fetch";

dotenv.config();

const arweave = Arweave.init({
    host: '127.0.0.1',
    port: 1984,
    protocol: 'http',
    timeout: 20000,
    logging: false,
});

async function run(){
    //mint transaction
    const key = await arweave.wallets.generate();

    //Mint some coins
    const address1 = await arweave.wallets.jwkToAddress(key);
    await arweave.api.get(`mint/${address1}/99990001408383`); //99990001408383 == Amount in Winston

    const dataBuffer = fs.readFileSync(`${process.cwd()}/0.json`);

    const transaction = await arweave.createTransaction(
        {
            data: dataBuffer,
        },
        key
    );
    transaction.addTag("MetadataMyNFT", "data/json");

    await arweave.transactions.sign(transaction, key);
    
    let uploader = await arweave.transactions.getUploader(transaction);

    while(!uploader.isComplete){
        await uploader.uploadChunk();
        console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
    }

    console.log("My transaction ID: https://arweave.net/", transaction.id);

    const transactionData = await arweave.transactions.getData(transaction.id);
    console.log(
        "Transaction Data: ",
        Buffer.from(transactionData, "base64").toString()
    );

    const query = `
    query {
        transactions(
            tags: {
                name: "MetadataMyNFT",
                values: ["data/json"]
            }
        ) {
            edges {
                node {
                    id
                }
            }
        }
    }`;

    /*fetch("http://localhost:1984/graphql",{
        method: "POST",
        headers: {
            'Content-Type': 'metadata/json',
        },
        body: JSON.stringify({
            query
        })
    }).then((res) => res.json())
      .then((result) => console.log(result));*/

    const myGQL = await gQL.run(query);

    console.log("GQL result:", myGQL);

}

run();