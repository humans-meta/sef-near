import 'regenerator-runtime/runtime';
import React from 'react';



import { EducationalText, SignInPrompt, SignOutButton } from './ui-components';


export default function App({ isSignedIn, contract, wallet }) {
  const [valueFromBlockchain, setValueFromBlockchain] = React.useState();

  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  // Get blockchian state once on component load
  React.useEffect(() => {
    contract.getGreeting()
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

  function changeGreeting(e) {
    e.preventDefault();
    setUiPleaseWait(true);
    const { greetingInput } = e.target.elements;
    contract.setGreeting(greetingInput.value)
      .then(async () => { return contract.getGreeting(); })
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
      });
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
                <th>URL</th>
                {/* <th>User</th>
                <th>Repo</th>
                <th>Commit</th>
                <th>File</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>{valueFromBlockchain}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="h-8"></div>
        <form onSubmit={changeGreeting} className="change">
          <div className="space-x-4 flex">
            <input
              className="input input-bordered flex-1"
              autoComplete="off"
              defaultValue={valueFromBlockchain}
              id="greetingInput"
            />
            <button className="btn btn-primary px-8"
              disabled={uiPleaseWait}>
              <span>Submit</span>
            </button>
          </div>
          {uiPleaseWait &&
            <progress className="progress w-full"></progress>}
        </form>
      </main>
    </div>
  );
}
