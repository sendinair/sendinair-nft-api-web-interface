<template>
  <div class="h-full m-auto p-10">
    <section class="flex flex-col items-center">
      <h1 class="text-white text-4xl font-bold tracking-wider">BAYC NFT List</h1>
      <h6 class="text-white text-xl my-2">Powered by Sendinair Inc.</h6>
    </section>

    <section class="flex flex-col items-start text-white text-xl mt-6 w-45% m-auto">
      <h5><span class="font-semibold">Name:</span> {{nftName}}</h5>
      <h5><span class="font-semibold">Symbol:</span> {{nftSymbol}}</h5>
      <h5><span class="font-semibold">Contract Address:</span> {{nftContractAddress}}</h5>
    </section>

    <div class="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 auto-cols-max gap-3 place-content-center p-6">
      <div class="w-full rounded" v-for="item in nfts" :key="item.token_id">
        <img :src="toImageUrl(item.image)" alt="image">
        <div class="flex flex-col items-center mt-2">
          <p class="text-white text-xl font-semibold">{{`${item.symbol} #${item.token_id}`}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config.js'
import axios from 'axios';
export default {
  mounted() {
    this.isLoading = true;
    this.getNfts();
  },
  data() {
    return {
      isLoading: false,
      nfts: [],
    }
  },
  computed: {
    nftName() {
      if (!this.nfts.length) return '';
      return this.nfts[0].name
    },
    nftSymbol() {
      if (!this.nfts.length) return '';
      return this.nfts[0].symbol
    },
    nftContractAddress() {
      if (!this.nfts.length) return '';
      return this.nfts[0].token_address
    },
  },
  methods: {
    async getNfts() {
      const nfts = await axios.get(`${config.api}/api/blockchain/ethereum/nft/get-nfts-by-collection?offset=20`).then(res => res.data);
      const metadatas = await Promise.all(nfts.map(async (e) => {
        const res = await this.getMetadataFromTokenUri(e.token_uri);
        return {
          ...e,
          ...res,
        };
      }));

      this.nfts = metadatas;
      console.log(this.nfts)
      this.isLoading = false;
    },
    async getMetadataFromTokenUri(tokenUri) {
      const splitArr = tokenUri.split('://');
      try {
        const res = await axios.get(`https://ipfs.io/ipfs/${splitArr[1]}`);
        return res.data;
      } catch (err) {
        console.warn("Error: " + err);
      }
    },
    toImageUrl(ipfsUrl) {
      const splitArr = ipfsUrl.split('://')
      return `https://ipfs.io/ipfs/${splitArr[1]}`
    }
  },
}
</script>