export class Contract {
  wallet;

  constructor({ wallet }) {
    this.wallet = wallet;
  }

  async getAssetBundles() {
    return await this.wallet.viewMethod({ method: 'get_asset_bundles' });
  }

  async addAssetBundle(asset_bundle) {
    return await this.wallet.callMethod({ method: 'add_asset_bundle', args: { message: asset_bundle } });
  }

  async deleteAssetBundle(asset_bundle_index) {
    return await this.wallet.callMethod({ method: 'delete_asset_bundle', args: { message: asset_bundle_index } });
  }
}