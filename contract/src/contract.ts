import { Vector, UnorderedMap, NearBindgen, near, call, view, initialize } from 'near-sdk-js';


@NearBindgen({ requireInit: true })
class AssetBundleCollection {
  asset_bundles: Vector;

  constructor() {
    this.asset_bundles = new Vector('a')
  }

  @view({})
  get_asset_bundles(): unknown[] {
    return this.asset_bundles.toArray();
  }

  @call({})
  add_asset_bundle({ message }: { message: string }): void {
    near.log(`Adding AssetBundle with URL = ${message}`);
    this.asset_bundles.push(message);
  }

  @call({})
  delete_asset_bundle({ message }: { message: string }): void {
    near.log(`Deleting AssetBundle with URL = ${message}`);
    this.asset_bundles.swapRemove(parseInt(message));
  }
}

// @NearBindgen({})
// class HelloNear {
//   greeting: string = "Hello";

//   @view({}) // This method is read-only and can be called for free
//   get_greeting(): string {
//     return this.greeting;
//   }

//   @call({}) // This method changes the state, for which it cost gas
//   set_greeting({ message }: { message: string }): void {
//     // Record a log permanently to the blockchain!
//     near.log(`Saving greeting ${message}`);
//     this.greeting = message;
//   }
// }