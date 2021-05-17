import React from 'react'
import {
  Link
} from 'react-router-dom'
import { Anchor } from 'grommet'
import {AnchorLink} from './AnchorLink'

// @ts-ignore

export const BlockNumber = ({ number }) => {
  const link = `/block/${number}`
  return <AnchorLink to={link} label={number} />
}