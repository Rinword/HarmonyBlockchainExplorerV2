import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { BlockPage } from 'src/pages/BlockPage'
import { MainPage } from 'src/pages/MainPage'
import { TransactionPage } from 'src/pages/TransactionPage'
import { StakingTransactionPage } from 'src/pages/StackingTransactionPage'
import { AllBlocksPage } from 'src/pages/AllBlocksPage'
import { AllTransactionsPage } from 'src/pages/AllTransactionsPage'
import { AddressPage } from 'src/pages/AddressPage'
import { ERC20List } from 'src/pages/ERC20List'
import { ERC721List } from 'src/pages/ERC721List'

export function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>

        <Route exact path="/blocks">
          <AllBlocksPage />
        </Route>

        <Route path="/block/:id">
          <BlockPage />
        </Route>

        <Route path="/transactions">
          <AllTransactionsPage />
        </Route>

        <Route path="/tx/:id">
          <TransactionPage />
        </Route>

        <Route path="/staking-tx/:id">
          <StakingTransactionPage />
        </Route>

        <Route path="/address/:id">
          <AddressPage />
        </Route>

        <Route path="/hrc20">
          <ERC20List />
        </Route>

        <Route path="/hrc721">
          <ERC721List />
        </Route>
      </Switch>
      </>
  )
}