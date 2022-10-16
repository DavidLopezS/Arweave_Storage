import Bundlr from "@bundlr-network/client";
import fs from "fs";

async function run(){

    let jwk = JSON.parse(fs.readFileSync(`${process.cwd()}/wallet/id.json`).toString()); 
    
    //Bundlr devnet endpoint
    /*const bundlr = new Bundlr.default(
        "https://devnet.bundlr.network",
        "solana",
        jwk,
        {
            providerUrl: "https://api.devnet.solana.com"
        }
    );*/

    //Bundlr prodnet endpoint
    const bundlr = new Bundlr.default(
        "http://node1.bundlr.network",
        "solana",
        jwk
    );
    
    console.log("My bndlr address:", bundlr.address);

    //await bundlr.fund(10000);
    
    const price = await bundlr.getPrice(1000);
    console.log("Price:", price.toString());

    const amount = bundlr.utils.unitConverter(price);
    console.log("Converted price:", amount.toString());

    const balance = await bundlr.getLoadedBalance()
    console.log("Balance: ", balance.toString());

    const converted = bundlr.utils.unitConverter(balance);
    console.log("Converted balance:", converted.toString());


    const data = fs.readFileSync(`${process.cwd()}/5.json`);

    const tags = [{name: "MyTrial-Metadata", value: "metadata/json"}];

    const transaction = bundlr.createTransaction(data, {tags});

    await transaction.sign();
    console.log("My transaction id:", transaction.id);

    await transaction.upload();
    const id = (await transaction.upload()).data.id; 
    console.log(`My id after transaction: https://arweave.net/${id}`);

    const balance2 = await bundlr.getLoadedBalance()
    console.log("Balance after tx: ", balance2.toString());

    const converted2 = bundlr.utils.unitConverter(balance2);
    console.log("Converted balance after tx:", converted2.toString());

}

run();