use anchor_lang::prelude::*;
declare_id!("2XdJLmGEcJUhF61tYNj9xL9frsao675akcXfGCBQoa9H");

#[program]
pub mod bird_vs_drone {
    use super::*;
    
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.bird = 0;
        vote_account.drone = 0;
        Ok(())
        
    }

    pub fn vote_bird(ctx: Context<Vote>) -> ProgramResult {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.bird += 1;
        Ok(())
    }

    pub fn vote_drone(ctx: Context<Vote>) -> ProgramResult {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.drone += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {

    #[account(init, payer = user, space = 16 + 16)]
    pub vote_account: Account<'info, VoteAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info>{
    #[account(mut)]
    pub vote_account: Account<'info, VoteAccount>,
}

#[account]
pub struct VoteAccount {
    pub bird: u64,
    pub drone: u64,
}