const assert = require('assert');
const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

describe('bird-vs-drone', () => {
  // Configure the client
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.BirdVsDrone;

  const voteAccount = anchor.web3Keypair.generate();
  it('Initialiezes with 0 votes for bird and drone', async () => {
    console.log('Testing Initialize...');
    await program.rpc.initialize({
      accounts: {
        voteAccount: voteAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [voteAccount],
    });
    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );
    console.log('Bird: ', account.bird.toString());
    console.log('Drone: ', account.drone.toString());
    assert.ok(account.bird.toString() == 0 && account.drone.toString() == 0);
  });
  it('Votes correctly for bird', async () => {
    console.log('Testing voteBird...');
    await program.rpc.voteBird({
      accounts: {
        voteAccount: voteAccount.publicKey,
      },
    });
    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );
    console.log('Bird: ', account.bird.toString());
    console.log('Drone: ', account.drone.toString());
    assert.ok(account.bird.toString() == 1 && account.drone.toString() == 0);
  });
  it('Votes correctly for drone', async () => {
    console.log('Testing voteDrone...');
    await program.rpc.voteDrone({
      accounts: {
        voteAccount: voteAccount.publicKey,
      },
    });
    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );
    console.log('Bird: ', account.bird.toString());
    console.log('Drone: ', account.drone.toString());
    assert.ok(account.bird.toString() == 1 && account.drone.toString() == 1);
  });
});
