import 'regenerator-runtime/runtime';
import React from 'react';

import { SignInPrompt, SignOutButton } from './ui-components';


export default function App({ isSignedIn, contract, wallet }) {
  const [valueFromBlockchain, setValueFromBlockchain] = React.useState([]);

  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  // Get blockchian state once on component load
  React.useEffect(() => {
    contract.getAssetBundles()
      .then(setValueFromBlockchain)
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }, []);

  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return <SignInPrompt greeting={valueFromBlockchain} onClick={() => wallet.signIn()} />;
  }

  function addAssetBundle(e) {
    e.preventDefault();
    setUiPleaseWait(true);
    const { greetingInput } = e.target.elements;
    contract.addAssetBundle(greetingInput.value)
      .then(async () => { return contract.getAssetBundles(); })
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  function deleteAssetBundle(asset_bundle_index) {
    setUiPleaseWait(true);
    contract.deleteAssetBundle(asset_bundle_index)
      .then(async () => { return contract.getAssetBundles(); })
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  function parseUrl(url) {
    return url.split('/').slice(3)
  }

  return (
    <div className="p-8">
      <div className="w-full flex justify-end">
        <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()} />
      </div>
      <div className="h-8"></div>
      <main className={uiPleaseWait ? 'please-wait' : ''}>
        {/* <h1>
          The contract says: <span className="greeting">{valueFromBlockchain}</span>
        </h1> */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>User</th>
                <th>Repo</th>
                <th>Commit</th>
                <th>File</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {valueFromBlockchain.map((url, index) => (
                <tr>
                  <th>{index + 1}</th>
                  {parseUrl(url).map((x) => (<td>{x}</td>))}
                  <th className="flex justify-end">
                    <button className="btn btn-square btn-sm" onClick={() => deleteAssetBundle(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-8"></div>
      </main>
      <form onSubmit={addAssetBundle} className="form-control">
        <div className="flex space-x-4 mb-4">
          <label className="input-group" >
            <span>Git URL</span>
            <input
              className="input input-bordered flex-1"
              autoComplete="off"
              defaultValue={valueFromBlockchain}
              id="greetingInput"
            />
          </label >
          <button className="btn btn-primary px-8"
            disabled={uiPleaseWait}>
            <span>Submit</span>
          </button>
        </div>
        {uiPleaseWait &&
          <progress className="progress w-full"></progress>}
      </form >
    </div >
  );
}
