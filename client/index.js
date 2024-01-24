const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  const name = "Subham Block";

  // create merkle tree for whole nice list
  const merkleTree = new MerkleTree(niceList);
  // get the merkle root
  const root = merkleTree.getRoot();
  // get index of the name in the nice list
  const index = niceList.findIndex(n => n === name);
  // get the proof of the name from the index
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof: proof,
    name: name,
    root: root,
  });

  console.log({ gift });
}

main();