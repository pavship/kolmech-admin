import React from 'react'
import cuid from 'cuid'

import Batch from'./Batch'

export default function Batches ({
  deal,
  upsertDeal
}) {
  return [
    ...deal.batches,
    { id: cuid(), isNew: true }
  ].map(batch =>
    <Batch
      key={batch.id}
      deal={deal}
      batch={batch}
      upsertDeal={upsertDeal}
    />
  )
}