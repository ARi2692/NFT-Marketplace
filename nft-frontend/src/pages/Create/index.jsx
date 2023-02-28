import React,  { useState } from 'react'
import InfoSection from '../../components/InfoSection'
import './create.css'
// import { ethers } from "ethers"
import Button from "../../common/button";
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../pinata";
import { useLocation } from "react-router";

const Create = ({ marketplace, nft }) => {

  // const [file, setFile] = useState(null)
  // const [image, setImage] = useState('')
  // const [price, setPrice] = useState(null)
  // const [name, setName] = useState('')
  // const [description, setDescription] = useState('')

  const [formParams, updateFormParams] = useState({ name: '', description: '', price: ''});
    const [fileURL, setFileURL] = useState(null);
    const ethers = require("ethers");
    const [message, updateMessage] = useState('');
    const location = useLocation();

    //This function uploads the NFT image to IPFS
    async function OnChangeFile(e) {
        var file = e.target.files[0];
        //check for file extension
        try {
            //upload the file to IPFS
            const response = await uploadFileToIPFS(file);
            console.log("response coming", response);
            if(response.success === true) {
                console.log("Uploaded image to Pinata: ", response.pinataURL)
                setFileURL(response.pinataURL);
            }
        }
        catch(e) {
            console.log("Error during file upload", e);
        }
    }

    //This function uploads the metadata to IPFS
    async function uploadMetadataToIPFS() {
        const {name, description, price} = formParams;
        //Make sure that none of the fields are empty
        if( !name || !description || !price || !fileURL)
            return;

        const nftJSON = {
            name, description, price, image: fileURL
        }

        try {
            //upload the metadata JSON to IPFS
            const response = await uploadJSONToIPFS(nftJSON);
            if(response.success === true){
                console.log("Uploaded JSON to Pinata: ", response)
                return response.pinataURL;
            }
        }
        catch(e) {
            console.log("error uploading JSON metadata:", e)
        }
    }

    async function listNFT(e) {
        e.preventDefault();

        //Upload data to IPFS
        try {
            const metadataURL = await uploadMetadataToIPFS();
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();
            updateMessage("Please wait.. uploading (upto 5 mins)")

            //Pull the deployed contract instance
            // let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

            //massage the params to be sent to the create NFT request
            // const price = ethers.utils.parseUnits(price, 'ether')
            // let listingPrice = await contract.getListPrice()
            // listingPrice = listingPrice.toString()

            // const uri = `https://ipfs.infura.io/ipfs/${result.path}`
            // mint nft 
            await(await nft.mint(metadataURL)).wait()
            // get tokenId of new nft 
            const id = await nft.tokenCount()
            // approve marketplace to spend nft
            await(await nft.setApprovalForAll(marketplace.address, true)).wait()
            // add nft to marketplace
            const listingPrice = ethers.utils.parseEther(formParams.price.toString())
            await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()

            //actually create the NFT
            // let transaction = await contract.createToken(metadataURL, price, { value: listingPrice })
            // await transaction.wait()

            alert("Successfully listed your NFT!");
            updateMessage("");
            // setName('');
            // setDescription('');
            // setPrice('');
            updateFormParams({ name: '', description: '', price: ''});
            window.location.replace("/")
        }
        catch(e) {
            alert( "Upload error"+e )
        }
    }

  // const uploadToIPFS = async (event) => {
  //   event.preventDefault()
  //   const file = event.target.files[0]
  //   console.log("coming",file)
  //   if (typeof file !== 'undefined') {
  //     try {
  //       const result = await client.add(file)
  //       console.log(result)
  //       setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
  //       // setFile(file)
  //     } catch (error){
  //       console.log("ipfs image upload error: ", error)
  //     }
  //   }
  // }
  // const createNFT = async () => {
  //   console.log(image, price, name, description)
  //   if (!image || !price || !name || !description) return
  //   try{
  //     const result = await client.add(JSON.stringify({image, price, name, description}))
  //     mintThenList(result)
  //   } catch(error) {
  //     console.log("ipfs uri upload error: ", error)
  //   }
  // }
  // const mintThenList = async (result) => {
  //   const uri = `https://ipfs.infura.io/ipfs/${result.path}`
  //   // mint nft 
  //   await(await nft.mint(uri)).wait()
  //   // get tokenId of new nft 
  //   const id = await nft.tokenCount()
  //   // approve marketplace to spend nft
  //   await(await nft.setApprovalForAll(marketplace.address, true)).wait()
  //   // add nft to marketplace
  //   const listingPrice = ethers.utils.parseEther(price.toString())
  //   await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
  // }

  return (
    <>
    <div>
      <InfoSection />
    </div>

    <div className="flex flex-col place-items-center mt-10" id="nftForm">
            <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
            <h3 className="text-center font-bold text-purple-500 mb-8">Upload your NFT to the marketplace</h3>
                <div className="mb-4">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">NFT Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Axie#4563" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                </div>
                <div className="mb-6">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="description">NFT Description</label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" cols="40" rows="5" id="description" type="text" placeholder="Axie Infinity Collection" value={formParams.description} onChange={e => updateFormParams({...formParams, description: e.target.value})}></textarea>
                </div>
                <div className="mb-6">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Price (in ETH)</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}></input>
                </div>
                <div>
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="image">Upload Image</label>
                    <input type={"file"} onChange={OnChangeFile}></input>
                </div>
                <br></br>
                <div className="text-green text-center">{message}</div>
                <button onClick={listNFT} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
                    List NFT
                </button>
            </form>
        </div>

    {/* <div className="file-card">

    <div className="file-inputs">
        
        <input className='input-container' type="file" onChange={OnChangeFile} />
        <button className='button-sec'>
            <AiOutlinePlusCircle/>
            Upload
        </button> 
    </div>

    <p className="main">Supported files</p>
    <p className="info">PDF, JPG, PNG</p>

    </div>
    <div>
      <input className="main" value={name} onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
      <input className="main" value={description} onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
      <input className="main" value={price} onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
    </div>

    <div >
    <Button onClick={listNFT} btnType="PRIMARY" btnText="Create & List NFT!" />
    </div> */}

    {/* <div>
      {/* <div className="form-container"> */}
      {/* <div className="row"> */}
      {/* <div class="drag-area">
        <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
        <header>Drag & Drop to Upload File</header>
        <span>OR</span>
        <button>Browse File</button>
        <input type="file" hidden/>
      </div>
      <input onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
      <input onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
      <input onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
        <div>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
              <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
              <div >
                <Button onClick={createNFT}>
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </div> */}
      {/* </div> */}
    {/* </div> */}
    {/* </div>  */}
    </>
  )
}

export default Create
